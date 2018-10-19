const EmojiWord = require('./emoji_word');

class Emoji {
    constructor(emoji) {
        this.emoji = emoji;
        this.words = {};
        this.use = 0;
    }

    getEmoji() {
        return this.emoji;
    }

    incrementUse(amount = 1) {
        this.use += amount;
    }

    addWord(word) {
        if(this.words[word] !== undefined) {
            this.words[word].incrementUse();
        }
        else {
            let word_c = new EmojiWord(word);
            word_c.incrementUse();
            this.words[word] = word_c;
        }
    }

    instanceWord(tweet) {
    }
};

module.exports = Emoji;