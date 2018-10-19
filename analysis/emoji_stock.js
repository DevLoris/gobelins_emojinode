const emojis_const = require('./emojis_const');
const EmojiClass = require('./emoji');

class Emojis {
    constructor() {
        this.emojis = {};
    }
    init() {
        for(let emoji of emojis_const) {
            let newemoji = new EmojiClass(emoji);
            this.emojis[emoji] = newemoji;
        }
    }
    getEmoji(emoji) {
        return this.emojis[emoji];
    }
}

let emojis_instance = new Emojis();

module.exports = emojis_instance;