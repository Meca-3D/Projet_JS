const readlineSync = require('readline-sync');
const Player = require('./player');
const Score = require('./score');

class Game {
    constructor(playerNames) {
        this.players = playerNames.map(name => new Player(name));
        this.frames = 10;
        this.currentFrame = 1;
    }

    start() {
        while (this.currentFrame <= this.frames) {
            console.log(`\nFrame ${this.currentFrame}`);
            this.players.forEach(player => {
                player.roll(this.currentFrame);
            });
            this.displayScores();
            this.currentFrame++;
        }
        this.displayFinalScores();
        return this.getResults();
    }

    displayScores() {
        console.log('Score apres le frame ' + this.currentFrame + ':');
        this.players.forEach(player => {
            console.log(`${player.name}: ${player.getScore()}`);
        });
    }

    displayFinalScores() {
        console.log('\nScore final:');
        let highestScore = 0;
        let winners = [];
        this.players.forEach(player => {
            const score = player.getScore();
            console.log(`${player.name}: ${score}`);
            if (score > highestScore) {
                highestScore = score;
                winners = [player.name];
            } else if (score === highestScore) {
                winners.push(player.name);
            }
        });

        if (winners.length === 1) {
            console.log(`${winners[0]} est le/la gagnant(e) !`);
        } else {
            console.log(`Les gagnants sont: ${winners.join(', ')}`);
        }
    }

    getResults() {
        let highestScore = 0;
        let winners = [];
        const results = this.players.map(player => {
            const score = player.getScore();
            if (score > highestScore) {
                highestScore = score;
                winners = [player.name];
            } else if (score === highestScore) {
                winners.push(player.name);
            }
            return { name: player.name, score };
        });

        return {
            players: results,
            winners
        };
    }
}

module.exports = Game;
