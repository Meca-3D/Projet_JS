const fs = require('fs');
const path = './history.json';

class History {
    static save(gameData) {
        let history = [];
        if (fs.existsSync(path)) {
            history = JSON.parse(fs.readFileSync(path, 'utf8'));
        } else {
            fs.writeFileSync(path, JSON.stringify(history, null, 2));
        }
        history.push(gameData);
        fs.writeFileSync(path, JSON.stringify(history, null, 2));
    }

    static get() {
        if (fs.existsSync(path)) {
            return JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        return [];
    }
}

module.exports = History;
