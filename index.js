const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");

const TwitterStream = require('./stream/twitter_stream');
const SocketStream = require('./stream/socket_stream');

const twitterClient = require('./twitter_client');
const { Transform } = require('stream');

const emojis_const = require('./analysis/emojis_const');
const emojis = require('./analysis/emoji_stock');
emojis.init();

const server = http.createServer();
const wss = new WebSocket.Server({ server });
let ws_connection = null;

//Server
server.on("request", (request, response) => {
    if(request.url == "/build_table.js") {
        const fileSrc = fs.createReadStream("./public/build_table.js");
        fileSrc.pipe(response);
    }
    else {
        const fileSrc = fs.createReadStream("./public/index.html");
        fileSrc.pipe(response);
    }
});
server.listen(5000);


const stream  = new TwitterStream(twitterClient);


const stringify = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
        const newChunk = chunk.toString() + '\n';
        this.push(newChunk);
        callback();
    }
});

stream.track({track: emojis_const.join(','), language: "fr"});
const analyse =  require('./stream/transform_analyse');

//Websockets
wss.on("connection", ws => {
    console.log("connection", ws);

    ws.on("message", message => {
        console.log("message from client: ", message);
    });

    const socketStr = new SocketStream(ws);
    //process.stdin.pipe(socketStr);
    stream.pipe(analyse).pipe(socketStr);
});



