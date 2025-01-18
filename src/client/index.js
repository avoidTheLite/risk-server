
window.addEventListener("DOMContentLoaded", (event) => {

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", getGameState);

function getGameState()
{
    const state = "5"
    console.log('function = getGameState')
    
    // Retrieve Game ID and define API URL
    const currentGameId = localStorage.getItem('currentGameId');
    let apiUrl = '';
    if (currentGameId) {
      apiUrl = `http://localhost:3001/game/${currentGameId}`;
    } else {
      console.log('No game ID, please start a new game first');
    }

// Make a GET request
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    document.getElementById('active-player').textContent = `Active Player = ${data.activePlayerId}`;
    document.getElementById('turn-number').textContent = `Turn = ${data.turn}`;
    document.getElementById('reinforcement-count').textContent = `Your Reinforcement Count = ${data.players[0].armies}`;
    
    let countriesDiv = document.getElementById('countries');
    countriesDiv.textContent = ``;

    data.country.forEach(country => {
        let countryInfo = `${country.name}: Armies = ${country.armies}`;
        let countryElement = document.createElement('div'); // Create a new div for each country
        countryElement.textContent = countryInfo;
        countryElement.classList.add('country-box')
        countryElement.classList.add('text')
        let owner = data.players.find(player => player.id === country.ownerID);
        if (owner) {
          countryElement.style.backgroundColor = owner.color; // Use the owner's color
        }
        countriesDiv.appendChild(countryElement); // Append the country div to the countries div
    })
})
  .catch(error => {
    console.error('Error:', error);
  });
    return state
}

let deployButton = document.getElementById("deploy-button");
deployButton.addEventListener("click", deployTroopFlow);

function deployTroopFlow()
{
    const state = "5"
    console.log('function = deployTroopFlow')
    return state
}

let attackButton = document.getElementById("attack-button");
attackButton.addEventListener("click", attackFlow);

function attackFlow()
{
    const state = "5"
    console.log('function = attackFlow')
    return state
}

let moveButton = document.getElementById("move-button");
moveButton.addEventListener("click", moveFlow);

function moveFlow()
{
    const state = "5"
    console.log('function = moveFlow')
    return state
}

let turnButton = document.getElementById("turn-button");
turnButton.addEventListener("click", endTurnFlow);

function endTurnFlow()
{
    const state = "5"
    console.log('function = endTurnFlow')
    return state
}

let newGameButton = document.getElementById("newGameButton");
const modal = document.getElementById("playerModal");
const startGameButton = document.getElementById("startGameButton");
const cancelButton = document.getElementById("cancelButton");
let twoPlayers = document.getElementById("twoPlayers");
let threePlayers = document.getElementById("threePlayers");
const player3Section = document.querySelector('label[for="player3Name"]').parentElement;
let fourPlayers = document.getElementById("fourPlayers");
const player4Section = document.querySelector('label[for="player4Name"]').parentElement;
let playerCount = 0

newGameButton.addEventListener("click", () => {
  console.log("New Game button clicked!"); // Debugging step
  modal.style.display = "flex";
})

twoPlayers.addEventListener("click", () => {
  console.log("2 players button clicked!"); // Debugging step
  player3Section.classList.add("hidden");
  player4Section.classList.add("hidden");
  playerCount = 2

})

threePlayers.addEventListener("click", () => {
  console.log("3 players button clicked!"); // Debugging step
  player3Section.classList.remove("hidden");
  player4Section.classList.add("hidden");
  playerCount = 3
})

fourPlayers.addEventListener("click", () => {
  console.log("4 players button clicked!"); // Debugging step
  player3Section.classList.remove("hidden");
  player4Section.classList.remove("hidden");
  playerCount = 4
})

startGameButton.addEventListener("click", async () => {
  console.log("Start Game button clicked!");
  let players = [];
  for (let i = 1; i <= playerCount; i++) {
    console.log(`player${i}Name and playerCount = ${playerCount}`);
    players.push({
      id: i,
      name: document.getElementById(`player${i}Name`).value,
      color: document.getElementById(`player${i}Color`).value
    });
    console.log(`players = ${players}`);
    if (i === playerCount) {
      await startGameFlow(players)
      modal.style.display = "none"
  }
  }
})


cancelButton.addEventListener("click", () => {
  modal.style.display = "none";
})

async function startGameFlow(players)
{

    
    console.log(`function = startGameFlow with players = ${players}`)
    const apiUrl = 'http://localhost:3001/game/new';

    const gameID = fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({players}),
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Game ID', data.id);
        document.getElementById('game-id-display').textContent = `${data.id}`;
        localStorage.setItem('currentGameId', data.id);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    return
}

});
// export default getGameState