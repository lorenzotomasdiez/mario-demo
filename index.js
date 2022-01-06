import {kaboomStart, kaboomRestart} from './game/game.js'


const startButton = document.querySelector("#startButton")
const restartButton = document.querySelector("#restartButton")

startButton.addEventListener("click", function(){
    hide(startButton)
    kaboomStart()
})

restartButton.addEventListener("click", function(){
    hide(restartButton)
    kaboomRestart()
})
