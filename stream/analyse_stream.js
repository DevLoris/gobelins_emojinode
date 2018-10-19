const { Writable } = require("stream");

class SocketStream extends Writable {
    constructor() {
        super();
    }

    _write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
}

module.exports = SocketStream;
