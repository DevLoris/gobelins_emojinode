const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const TwitterStream = require('./stream/twitter_stream');
const SocketStream = require('./stream/socket_stream');
const AnalyseStream = require('./stream/analyse_stream');

const twitterClient = require('./twitter_client');
const { Transform } = require('stream');

const emojis = require('./analysis/emoji_stock');
emojis.init();

const server = http.createServer();
const wss = new WebSocket.Server({ server });

//Server
server.on("request", (request, response) => {
    console.log(request.url);
    if(request.url.endsWith(".js") || request.url.endsWith(".css")|| request.url.endsWith(".svg") ) {
        if(fs.existsSync("./public" + request.url)) {
            const fileSrc = fs.createReadStream("./public" + request.url);
            fileSrc.pipe(response);
        }
    }
    else {
        const fileSrc = fs.createReadStream("./public/index.html");
        fileSrc.pipe(response);
    }
});
server.listen(5000);

const stream  = new TwitterStream(twitterClient);


//stream.track({track: emojis_const.join(','), language: "fr"});
//stream.track({track: "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,."});
stream.track({track: "."});
const analyse =  require('./stream/transform_analyse');

let s = stream.pipe(analyse);

//Websockets
wss.on("connection", ws => {
    console.log("connection", ws);

    const socketStr = new SocketStream(ws);

    s.pipe(socketStr);
});

//s.pipe((new AnalyseStream()));