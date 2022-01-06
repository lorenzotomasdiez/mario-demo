import { finishScene, gameScene, loseScene } from "./scenes.js"
import loadAllSprites from "./sprites.js"


const kaboomStart = () => {
    kaboom({
        global:true, 
        fullscreen:true,
        scale:2,
        debug:true,
        clearColor:[0,0,0,1]
    })

    loadAllSprites()

    gameScene()

    loseScene()

    finishScene()

    start("game", {level: 0 ,score: 0})
}

const kaboomRestart = () => {
    go("game", {level: 0 ,score: 0})
}

export { kaboomStart, kaboomRestart } 
