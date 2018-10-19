const { Readable } = require('stream');

class TwitterStream  extends Readable {
    constructor(twitterClient) {
        super({objectMode: true});
        this.client = twitterClient;
    }

    _read() {}

    track(query) {
        this.stream = this.client.stream('statuses/filter', query);
        this.stream.on('data', (tweet) =>  {
            this.push(tweet);
        });
    }
}

module.exports  = TwitterStream;