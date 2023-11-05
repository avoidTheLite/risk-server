import startGame from './startup-gamestartup-game'
//clear data or start new game data save
//startup migrations

//determine game modes available
let gameOptions = {//user input
    combat: "standard",
    startingArmies: 40,
    startingCards: 0,
    countryAssignment: "random"
}
//user adds players
let playerNames = ["Steve", "joe", "nancy"]//user input in order
gameOptions.players = length(playerNames)

let player;
let i=0
for (let i = 0; i < gameOptions.players; i++) {
    player[i] = {
        name: playerNames[i],
        playerID: i+1,
        armies: gameOptions.startingArmies,
        cards: gameOptions.startingCards,
    }
}

startGame(player, gameOptions)

//prepare game to start(v1 will just call startup-game.js)