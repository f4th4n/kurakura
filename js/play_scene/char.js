// ------------------------------------------------------------------------------------------------ Expose
var CharLayer,
    char = {}

/*
char.resetPos = () => {}
char.die = () => {}
char.leftCharWalk = () => {}
char.rightCharWalk = () => {}
char.changeLocation = () => {}
*/

var charMargin = 16.5

;

// ------------------------------------------------------------------------------------------------ Module
(function() {
    // private variable
    const footPrintStartAfter = 0.5
    const footPrintInterval = 0.1
    const reviveAfter = 500 // milliseconds

    char.resetPos = () => {
        var worldLocation

        const charLevel = f.data.charLevel.load()
        var charConfig = f.data.level[charLevel].char_config
        f.data.char_stop = false
        f.data.turtle_left.col = charConfig.turtle_left.col
        f.data.turtle_left.row = charConfig.turtle_left.row
        f.data.turtle_left.isFinish = false
        f.data.turtle_right.col = charConfig.turtle_right.col
        f.data.turtle_right.row = charConfig.turtle_right.row
        f.data.turtle_right.isFinish = false

        char.colBefore.left = null
        char.colBefore.right = null

        var turtleLeftReset = () => {
            var worldLocation = world.getLocation(f.data.turtle_left.col, f.data.turtle_left.row)
            worldLocation.x += charMargin
            f.data.turtle_left.sprite.setPosition(worldLocation)
            f.data.turtle_left.sprite.setTexture(res.img.turtle_stand)
            f.data.turtle_left.sprite.rotation = 0
        }

        var turtleRightReset = () => {
            var worldLocation = world.getLocation(f.data.turtle_right.col, f.data.turtle_right.row)
            worldLocation.x += charMargin
            f.data.turtle_right.sprite.setPosition(worldLocation)
            f.data.turtle_right.sprite.setTexture(res.img.turtle_inverted_stand)
            f.data.turtle_right.sprite.rotation = 0
        }

        var startRockets = () => {
            enemy.startRocket(1)
            enemy.startRocket(10)
        }

        turtleLeftReset()
        turtleRightReset()
        startRockets()
    }

    char.die = (leftOrRight) => {
        const objName = (leftOrRight === 'left' ? 'turtle_left' : 'turtle_right')
        const currentCharLife = f.data.charLife.load()
        const newCharLife = currentCharLife - 1

        f.data.char_stop = true

        var decreaseLife = async () => {
            await f.data.charLife.save(newCharLife)
            sidebar.decreaseLifeSprite()
        }

        var increaseDiedText = () => {
            var levelStat = f.data.levelStat.load()
            var charLevel = f.data.charLevel.load()
            var currentDied = f.data.levelStat.search('level_id', charLevel)
            currentDied.died++
            f.data.levelStat.update(currentDied)
            sidebar.changeTextTurtleDied(currentDied.died)
        }

        var handleGameOver = () => {
            if(newCharLife === 0) {
                f.data.is_game_over = true
                setTimeout(gameover.showLayer, 500)
            }
        }

        decreaseLife()
        increaseDiedText()
        handleGameOver() // called only if char life is 0

        if(newCharLife > 0) {
            setTimeout(() => {
                gameover.resetCurrentLevel()
            }, reviveAfter)
        }
    }

    CharLayer = cc.Layer.extend({
        walkAnimationInterval: 0.3,
        walkAnimationFlipFlop: false,
        ctor:function () {
            this._super()
            this.initDataTurtleObj()
            this.printLeftTurtle()
            this.printRightTurtle()
            char.resetPos()
        },
        initDataTurtleObj: function() {
            const charLevel = f.data.charLevel.load()
            var charConfig = f.data.level[charLevel].char_config
            f.data.turtle_left.col = charConfig.turtle_left.col
            f.data.turtle_left.row = charConfig.turtle_left.row
            f.data.turtle_right.col = charConfig.turtle_right.col
            f.data.turtle_right.row = charConfig.turtle_right.row
        },
        printLeftTurtle: function() {
            f.data.turtle_left.sprite = new DuaSprite(res.img.turtle_stand)
            f.data.turtle_left.sprite.schedule(this.walkAnimation.bind({ leftOrRight: 'left' }), this.walkAnimationInterval)
            f.data.turtle_left.sprite.resume()
            this.addChild(f.data.turtle_left.sprite)
        },
        printRightTurtle: function() {
            f.data.turtle_right.sprite = new DuaSprite(res.img.turtle_inverted_stand)
            f.data.turtle_right.sprite.schedule(this.walkAnimation.bind({ leftOrRight: 'right' }), this.walkAnimationInterval)
            f.data.turtle_right.sprite.resume()
            this.addChild(f.data.turtle_right.sprite)
        },
        walkAnimation: function() {
            if(f.data.char_stop === true) return

            var imgStand = (this.leftOrRight === 'left' ? res.img.turtle_stand : res.img.turtle_inverted_stand)
            var imgWalk = (this.leftOrRight === 'left' ? res.img.turtle_walk : res.img.turtle_inverted_walk)

            this.walkAnimationFlipFlop = !this.walkAnimationFlipFlop
            if(this.walkAnimationFlipFlop) {
                f.data['turtle_' + this.leftOrRight].sprite.setTexture(imgWalk)
            } else {
                f.data['turtle_' + this.leftOrRight].sprite.setTexture(imgStand)
            }
        }
    })

    function turtleFinish(turtleObj, leftOrRight) {
        f.data.char_stop = true

        var waitFootPrint = () => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, footPrintStartAfter)
            })
        }

        var animateCharWalk = () => {
            return new Promise((resolve, reject) => {
                turtleObj.sprite.setAnchorPoint(0.5, 0.5)
                var flipRotate = false

                const spriteName = (leftOrRight === 'left' ? res.img.foot_print : res.img.foot_print_inverted)
                turtleObj.sprite.setTexture(spriteName)

                turtleObj.sprite.unscheduleAllCallbacks()
                turtleObj.sprite.schedule(function() {
                    if(turtleObj.sprite.getPositionY() < -25 || !turtleObj.isFinish) {
                        turtleObj.sprite.unscheduleAllCallbacks()
                        resolve()
                        return turtleObj.sprite.pause()
                    }

                    turtleObj.sprite.rotation = (flipRotate ? 20 : -20)
                    turtleObj.sprite.setPositionY(turtleObj.sprite.getPositionY() - 20)

                    if(flipRotate) {
                        cc.audioEngine.playEffect(res.sound.footstep_finish)
                    }

                    flipRotate = !flipRotate
                }, footPrintInterval)
                turtleObj.sprite.resume()
            })
        }

        var handleLevelFinish = () => {
            if(f.data.turtle_left.isFinish && f.data.turtle_right.isFinish) {
                level.finish()
            }
        }

        (async () => {
            turtleObj.isFinish = true
            await waitFootPrint()
            f.data.char_stop = false
            await animateCharWalk()
            handleLevelFinish()
        })()
    }

    function checkTrap(turtleObj, leftOrRight) {
        var isClosingTrap = false
        var isDead

        for(let trapPos of f.data.trap_pos) {
            if(trapPos.row !== turtleObj.row || trapPos.col !== turtleObj.col) continue

            isClosingTrap = enemy.animateCloseTrap(trapPos.col, trapPos.row)
            if(isClosingTrap) {
                isDead = true
                return isDead
            }
        }

        return isDead
    }

    char.drown = (turtleObj, leftOrRight) => {
        cc.audioEngine.playEffect(res.sound.drown)
        turtleObj.sprite.setTexture(res.img.splash_water)
        char.die(leftOrRight)
    }

    var charWalk = (leftOrRight) => {
        var turtleObj = f.data['turtle_' + leftOrRight]
        var causeOfTheDeath = null

        if(turtleObj.isFinish) return

        // prepare data
        var currentPad,
            worldLocation

        var cols = {
            left: [2, 4],
            right: [7, 9]
        }

        var padsPos = {
            left: [0, 1],
            right: [2, 3]
        }

        var finishLandCol = {
            left: 5,
            right: 6
        }

        // fill data
        var currentPadPos = padsPos[leftOrRight]

        // modify data
        if(leftOrRight === 'left') {
            turtleObj.col++
        } else {
            turtleObj.col--
        }

        // 1st pad
        if(turtleObj.col === cols[leftOrRight][0]) {
            currentPad = f.data.pad_pos[currentPadPos[0]]
            if(turtleObj.row !== currentPad.row) { // dead
                char.drown(turtleObj, leftOrRight)
                causeOfTheDeath = 'drown'
            }
        // 2nd pad
        } else if(turtleObj.col === cols[leftOrRight][1]) {
            currentPad = f.data.pad_pos[currentPadPos[1]]
            if(turtleObj.row !== currentPad.row) { // dead
                char.drown(turtleObj, leftOrRight)
                causeOfTheDeath = 'drown'
            }
        }

        worldLocation = world.getLocation(turtleObj.col, turtleObj.row)
        worldLocation.x += charMargin
        turtleObj.sprite.setPosition(worldLocation)

        const isTrapped = checkTrap(turtleObj, leftOrRight)
        if(isTrapped) {
            turtleObj.sprite.visible = false
            setTimeout(() => turtleObj.sprite.visible = true, reviveAfter)
            char.die(leftOrRight)
            causeOfTheDeath = 'trapped'
        }

        char.changeLocation(turtleObj.col, turtleObj.row, leftOrRight)

        // turtle finish land
        if(!isTrapped && turtleObj.col == finishLandCol[leftOrRight]) {
            turtleFinish(turtleObj, leftOrRight)
        }

        return causeOfTheDeath
    }

    char.leftCharWalk = () => {
        return charWalk('left')
    }

    char.rightCharWalk = () => {
        return charWalk('right')
    }

    char.colBefore = {}
    char.colBefore.left = null
    char.colBefore.right = null
    char.changeLocation = (col, row, leftOrRight) => {
        var posY = world.getLocation(col, row).y
        f.data['turtle_' + leftOrRight].sprite.setPositionY(posY)
        f.data['turtle_' + leftOrRight].row = row

        // cached to prevent duplicate action
        if(char.colBefore[leftOrRight] !== col) {
            char.colBefore[leftOrRight] = col
            enemy.startRocket(col)
        }
    }
})()