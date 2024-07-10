const readlineSync = require('readline-sync');
const Game = require('./game');
const History = require('./history');

function startnewGame() {
    const numberOfplayers = readlineSync.questionInt('Entrez le nombre de joueurs (1-6) : ', {
        limit: [1,2,3,4,5,6],
        limitMessage: 'Entrez un nombre entre 1 et 6.'
    });
    const players = [];
    for (let i = 0; i < numberOfplayers; i++) {
        const name = readlineSync.question(`Entrez le nom du joueur ${i + 1} : `);
        players.push(name);
    }

    const game = new Game(players);
    const result = game.start();

    History.save(result);
}

function showHistory() {
    const history = History.get();
    if (history.length === 0) {
        console.log('=======================================\nAucun historique de parties trouvé.');
        return;
    }

    console.log('Historique des parties :');
    history.forEach((game, index) => {
        console.log(`Partie ${index + 1} :`);
        game.players.forEach(player => {
            console.log(`  ${player.name}: ${player.score}`);
        });
        console.log(`  Gagnant(s) : ${game.winners.join(', ')}`);
    });
}

while (true) {
    const choice = readlineSync.keyInSelect(['Demarrer une nouvelle partie', 'Afficher l\'historique des parties'], 'Que voulez-vous faire ?');

    if (choice === 0) {
        startnewGame();
    } else if (choice === 1) {
        showHistory();
    } else {
        break;
    }
}