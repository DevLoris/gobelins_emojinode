class EmojiWord {
    constructor(word) {
        this.word = word;
    }

    incrementUse(amount = 1) {
        this.use += amount;
    }
};

module.exports = EmojiWord;