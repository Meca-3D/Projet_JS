const readlineSync = require('readline-sync');
const Score = require('./score');

class Player {
    constructor(name) {
        this.name = name;
        this.scores = new Score();
    }

    roll(frame) {
        const firstRoll = readlineSync.questionInt(`${this.name}, combien de quilles avez-vous renverse au lancer 1? `);
        let secondRoll = 0;
        if (firstRoll < 10 || frame === 10 || (firstRoll === 10 && frame === 10)) {
            secondRoll = readlineSync.questionInt(`${this.name}, combien de quilles avez-vous renverse au lancer 2? `);
        }
        this.scores.addRoll(frame, firstRoll, secondRoll);
    }

    getScore() {
        return this.scores.calculateScore();
    }
}

module.exports = Player;
