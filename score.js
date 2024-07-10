const readlineSync = require('readline-sync');
class Score {
    constructor() {
        this.frames = [];
    }

    addRoll(frame, firstRoll, secondRoll) {
        this.frames[frame - 1] = { firstRoll, secondRoll, extraRoll: 0 };

        // Handle extra rolls for the 10th frame
        if (frame === 10 && (firstRoll === 10 || firstRoll + secondRoll === 10)) {
            this.frames[frame - 1].extraRoll = parseInt(readlineSync.question('Vous avez droit a un lancer supplementaire, combien de quilles avez-vous renverse ? '), 10);
        }
    }

    calculateScore() {
        let totalScore = 0;

        for (let frameIndex = 0; frameIndex < 10; frameIndex++) {
            const frame = this.frames[frameIndex];
            const { firstRoll, secondRoll, extraRoll } = frame || { firstRoll: 0, secondRoll: 0, extraRoll: 0 };

            if (firstRoll === 10) {
                totalScore += 10 + this.getStrikeBonus(frameIndex);
            } else if (firstRoll + secondRoll === 10) {
                totalScore += 10 + this.getSpareBonus(frameIndex);
            } else {
                totalScore += firstRoll + secondRoll;
            }

            if (frameIndex === 9) {
                totalScore += extraRoll;
            }
        }

        return totalScore;
    }

    getStrikeBonus(frameIndex) {
        if (frameIndex >= 9) return 0;
        const nextFrame = this.frames[frameIndex + 1];
        if (!nextFrame) return 0;
        const { firstRoll, secondRoll } = nextFrame;
        if (firstRoll === 10 && frameIndex < 8) {
            const nextNextFrame = this.frames[frameIndex + 2] || { firstRoll: 0 };
            return 10 + nextNextFrame.firstRoll;
        }
        return firstRoll + secondRoll;
    }

    getSpareBonus(frameIndex) {
        if (frameIndex >= 9) return 0;
        const nextFrame = this.frames[frameIndex + 1];
        if (!nextFrame) return 0;
        return nextFrame.firstRoll;
    }
}

module.exports = Score;
