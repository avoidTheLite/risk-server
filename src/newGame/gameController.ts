import GameStateController from "./../common/util/gameState";

async function game() {
    async function newGame() {
        const data = await GameStateController();
        return data
    }
    async function end() {
        const data = await GameStateController().initialize();
        return data
    }
    return {
        newGame,
        end
    }
}

export default game