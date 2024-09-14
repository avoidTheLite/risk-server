
window.addEventListener("DOMContentLoaded", (event) => {

let refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", getGameState);

function getGameState()
{
    const state = "5"
    console.log('function = getGameState')
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