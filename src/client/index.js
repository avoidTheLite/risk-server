
window.addEventListener("DOMContentLoaded", (event) => {

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", getGameState);

function getGameState()
{
    const state = "5"
    console.log('function = getGameState')
    // Define the API URL
const apiUrl = 'http://localhost:3001/game/2P2soc4vVB';

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

});
// export default getGameState