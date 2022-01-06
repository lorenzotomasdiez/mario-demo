import levels from "./levels.js"

const gameScene = () => {

    /*---------------------SETTINGS-------------------------*/
    const MOVE_SPEED = 120
    const JUMP_FORCE = 310
    const BIG_JUMP_FORCE = 500
    const ENEMY_SPEED = 20
    const FALL_DEATH = 400
    let IS_JUMPING = true
    let CURRENT_JUMP_FORCE = JUMP_FORCE
    let MARIOSPRITE = "mario"

    /*-------------------GAME SCENE-----------------------*/
    scene("game", ({ level, score}) => {

        layers(['bg', 'obj', 'ui'], 'obj')
        const levelCfg = {
            width:20,
            height:20,
            '=':[sprite('block'), solid()],
            '$':[sprite('coin'), 'coin'],
            '%':[sprite('surprise'),solid(), 'coin-surprise'],
            '*':[sprite('surprise'), solid(), 'mushroom-surprise'],
            '}':[sprite('unboxed'), solid()],
            '(':[sprite('pipe-bottom-left'), solid(), scale(0.5)],
            ')':[sprite('pipe-bottom-right'), solid(), scale(0.5)],
            '-':[sprite('pipe-top-left'), solid(), scale(0.5), 'pipe'],
            '+':[sprite('pipe-top-right'), solid(), scale(0.5), 'pipe'],
            '^':[sprite('evil-shroom'), solid(), body(),'dangerous'],
            '#':[sprite('mushroom'),solid(), 'mushroom', body()],
            '.':[sprite('block2'), solid(), scale(0.5)],
            'p':[sprite('block2'), solid(), scale(0.5), 'mushroom-surprise'],
        }
        const gameLevel = addLevel(levels[level], levelCfg)

        /*-------------------SCORE LBL-----------------------*/
        const scoreLabel = add([text(score),pos(100, 6),layer('ui'),{value:score}])

        /*-------------------LEVEL LBL-----------------------*/
        add([text('level ' + parseInt(level + 1)), pos(10, 6)])


        /*-------------------PLAYER-----------------------*/
        function big(){
            let timer = 0
            let isBig = false
            return {
                update(){
                    if(isBig){
                        timer-=dt()
                        if(timer<=0){
                            this.smallify()
                        }
                    }
                },
                isBig(){
                    return isBig
                },
                smallify(){
                    CURRENT_JUMP_FORCE = JUMP_FORCE
                    this.scale=vec2(1)
                    timer=0
                    isBig=false
                },
                biggify(time){
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                    this.scale=vec2(1.5)
                    timer=time
                    isBig=true
                }
            }
        }

        const player = add([
            sprite(MARIOSPRITE),
            solid(), 
            pos(30,0), 
            body(),
            big(),
            origin('bot')
        ])
        
        player.on('headbump', (obj)=>{
            if(obj.is('coin-surprise')){
                gameLevel.spawn('$', obj.gridPos.sub(0,1))
                destroy(obj)
                gameLevel.spawn('}', obj.gridPos.sub(0,0))
            }
            if(obj.is('mushroom-surprise')){
                gameLevel.spawn('#', obj.gridPos.sub(0,1))
                destroy(obj)
                gameLevel.spawn('}', obj.gridPos.sub(0,0))
            }
        })
        
        player.collides('mushroom', m => {
            destroy(m)
            player.biggify(6)
        })
        
        player.collides('coin', c => {
            destroy(c)
            scoreLabel.value++
            scoreLabel.text=scoreLabel.value
        })

        player.collides('dangerous', d=>{
            if(IS_JUMPING){
                destroy(d)
            }else{
                go('lose', {score:scoreLabel.value})
            }
        })
        player.action(()=>{
            camPos(player.pos)
            if(player.pos.y >= FALL_DEATH){
                go('lose', { score : scoreLabel.value})
            }
        })

        player.collides('pipe', () => {
            keyPress('down', () => {
                player.smallify()
                if(level!==1){
                    go('game', {
                        level: (level + 1) % map.length,
                        score: scoreLabel.value
                    })
                }else{
                    go('finish', {score: scoreLabel.value})
                }
            })
        })

        player.action(()=>{
            if(player.grounded()){
                IS_JUMPING = false        
            }
        })
        /*-------------------OTHER-----------------------*/
        
        action('mushroom', (m) => {
            m.move(30,0)
        })

        action('dangerous', d => {
            d.move(-ENEMY_SPEED,0)
        })


        /*-------------------CONTROLS-----------------------*/
        keyDown('up', () => {
            if(player.grounded()) {
                IS_JUMPING=true
                player.jump(CURRENT_JUMP_FORCE)
            }
        })
        keyDown('left', () => {
            MARIOSPRITE='mario2'
            player.move(-MOVE_SPEED, 0)
            player.changeSprite(MARIOSPRITE)
        })
        
        keyDown('right', () => {
            MARIOSPRITE='mario'
            player.changeSprite(MARIOSPRITE)
            player.move(MOVE_SPEED, 0)
        })
    })
}

const loseScene = () => {
    scene('lose', ({score})=>{
        add([text('score: ' + score, 32), origin('center'), pos(width()/2, height()/3)])
        setTimeout(()=>{
            show(restartButton)
        }, 3000)
    })
}

const finishScene = () => {
    scene('finish', ({score})=>{
        add([text('score: ' + score, 32), origin('center'), pos(width()/2, height()/4)])
        add([text('thanks for playing'),origin('center'), pos(width()/2, height()/3)])
        setTimeout(()=>{
            show(restartButton)
        }, 3000)
    })
}
export {gameScene, loseScene, finishScene}