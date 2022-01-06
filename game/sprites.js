const loadAllSprites = () => {
    loadRoot('./assets/')
    loadSprite('coin', 'coin.png')
    loadSprite('evil-shroom', 'enemy.png')
    loadSprite('brick', 'brick.png')
    loadSprite('block', 'brick5.png')
    loadSprite('block2', 'brick4.png')
    loadSprite('mario', 'mario.png')
    loadSprite('mario2', 'mario2.png')
    loadSprite('mushroom', 'mushroom.png')
    loadSprite('surprise', 'power.png')
    loadSprite('unboxed', 'blankbrick.png')
    loadSprite('pipe-top-left', 'tube5.png')
    loadSprite('pipe-top-right', 'tube4.png')
    loadSprite('pipe-bottom-left', 'tube2.png')
    loadSprite('pipe-bottom-right', 'tube3.png')
}

export default loadAllSprites
