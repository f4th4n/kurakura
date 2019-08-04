// ------------------------------------------------------------------------------------------------ Expose
var EnemyLayer,
    enemy = {}

enemy.animateCloseTrap = (col, row) => {}
enemy.createClosedTrap = (col, row) => {}
enemy.cleanTrap = () => {} // called when turtle died

// ------------------------------------------------------------------------------------------------ Module
(function() {

    var currentLayer

// ------------------------------------------------------------------------------------------------ Enemy Trap
    var trapSprites = []
    var rotatedTrapSpritesIndex = []
    var trapClosed = null

    var TrapSprite = cc.Sprite.extend({
        col: null, // 1|2|3|4
        row: null, // 1|2|3|4
        leftOrRight: null,
        allowShake: true,
        margin: 15,
        ctor: function(config, leftOrRight) { 
            this._super()

            var resName
            if(leftOrRight === 'left') {
                resName = res.img.trap_open_left
            } else {
                resName = res.img.trap_open_right
            }
            this.initWithFile(resName)

            this.col = config.col
            this.row = config.row
            this.leftOrRight = leftOrRight
        },
        onEnter: function() {
            this.scale = 0.5
            if(this.leftOrRight === 'left') {
                this.setAnchorPoint(1, 0.5)
            } else {
                this.setAnchorPoint(0, 0.5)
            }

            this.placeLocation()
        },
        placeLocation:function() {
            const pos = world.getLocation(this.col, this.row)
            pos.x += this.margin
            pos.x = (this.col === 1 ? pos.x + 2 : pos.x)
            pos.x = (this.col === 5 ? pos.x - 2 : pos.x)
            pos.x = (this.col === 6 ? pos.x + 2 : pos.x)
            this.setPosition(pos)
        },
        shake: function() {
            var move = cc.moveBy(0.08, cc.p(2, 0))
            var moveBack = move.reverse()
            var moveSeq = cc.sequence(move, moveBack)
            var moveRep = moveSeq.repeat(5)
            this.runAction(moveRep)
            this.resume()
        }
    })

    enemy.animateCloseTrap = (col, row) => {
        for(let [index, firstSprite] of trapSprites.entries()) {
            if(col !== firstSprite.col || row !== firstSprite.row) continue
            if(index % 2 === 1) continue

            var secondSprite = trapSprites[index + 1]

            firstSprite.allowShake = false
            secondSprite.allowShake = false

            var counter = 6
            var rotate = () => {
                counter = counter + 6
                if(counter >= 60) {
                    rotatedTrapSpritesIndex = [index, index + 1]
                    firstSprite.visible = false
                    secondSprite.visible = false
                    enemy.createClosedTrap(col, row)
                    currentLayer.unschedule(rotate)
                }
                firstSprite.rotation = counter
                secondSprite.rotation = counter * -1
            }
            currentLayer.schedule(rotate, 10 / 1000)


            return true
        }
        return false
    }

    enemy.createClosedTrap = (col, row) => {
        var margin

        trapClosed = new DuaSprite(res.img.trap_closed)
        const pos = world.getLocation(col, row)
        margin = trapClosed.width / 2 / 2
        pos.x += margin
        trapClosed.setPosition(pos)
        currentLayer.addChild(trapClosed)
    }

    enemy.cleanTrap = () => {
        if(rotatedTrapSpritesIndex.length === 0) return
        if(empty(trapClosed)) return

        currentLayer.removeChild(trapClosed)

        for(let index of rotatedTrapSpritesIndex) {
            trapSprites[index].visible = true
            trapSprites[index].rotation = 0
        }
        rotatedTrapSpritesIndex = []
    }

// ------------------------------------------------------------------------------------------------ Enemy Rocket

    var rocketLeft = {},
        rocketRight = {}

    class RocketTimer {
        /*
            private variable:
            this.delay
            this.direction
            this.col
            this.leftOrRight
            this.sprite
        */
        constructor(config, currentTag) {
            this.setData(config)
            this.createSprite(currentTag)
            this.resetRocketTimer()
            this.placeLocation()
            this.sprite.schedule(this.countdownTimer.bind({that: this}), 0.5)
            this.sprite.resume()
        }
        setData(config) {
            this.timeToUpdateTimer = true
            this.sprite = null
            this.delay = config.delay
            this.direction = config.direction
            this.col = config.col
            this.leftOrRight = config.leftOrRight
        }
        resetRocketTimer() {
            this.counter = this.delay // reset counter
            if(this.sprite) {
                this.sprite.visible = false
                this.sprite.resume()
            }
        }
        createSprite(currentTag) {
            const rectHeight = 3
            this.sprite = cc.DrawNode.create()
            this.sprite.drawRect(cc.p(0, 0), cc.p(this._getWidth(), rectHeight), cc.color(255, 0, 0, 255), -1)
            this.sprite.setTag(currentTag)
            currentLayer.addChild(this.sprite)
        }
        placeLocation() {
            var pos = {}
            pos.x = this._getPositionX()
            pos.y = (this.direction === 'up' ? 4 : 263)
            this.sprite.setPosition(pos)
        }
        countdownTimer() {
            var that = this.that
            // sprite is not created yet
            if(!that.sprite) return

            that.counter -= 0.5
            if(that.counter > 4) return

            that.timeToUpdateTimer = !that.timeToUpdateTimer

            if(that.counter < 1) {
                that.sprite.visible = false
                that.sprite.pause()
                return
            }

            if(that.timeToUpdateTimer) {
                that.sprite.visible = true
            } else {
                that.sprite.visible = false
            }
        }
        _getWidth() {
            const startCol = [1, 10]
            const broadCol = [3, 5, 6, 8]

            if(startCol.includes(this.col)) {
                return 22
            } else if(broadCol.includes(this.col)) {
                return 25
            } else {
                // narrow column (river)
                return 19
            }
        }
        _getPositionX() {
            var col = this.col
            var x

            if(col === 1) {
                x = 84
            } else if(col === 2) {
                x = 115
            } else if(col === 3) {
                x = 145
            } else if(col === 4) {
                x = 180
            } else if(col === 7) {
                x = 278
            } else if(col === 8) {
                x = 308
            } else if(col === 9) {
                x = 342
            } else if(col === 10) {
                x = 373
            }

            return x
        }
    }

    var RocketSprite = cc.Sprite.extend({
        delay: null,
        duration: 1.5,
        direction: null,
        leftOrRight: null,
        isAnimate: false,
        moveSeq: null,
        ctor: function(config) { 
            this._super()
            this.delay = config.delay
            this.direction = config.direction
            this.col = config.col
            this.leftOrRight = config.leftOrRight

            this.initWithFile(res.img.rocket)
            this.schedule(this.detectCollisionWithCharSprite, 1/60)
        },
        onEnter: function() {
            this.scale = 0.5
            this.setRocketRotation()
            this.placeLocation()
            this.animateRocket()
        },
        setRocketRotation: function() {
            if(this.direction === 'up') {
                this.rotation = 180
            }
        },
        placeLocation:function() {
            var pos = {}
            var location = world.getLocation(this.col, 1)
            pos.x = location.x + 16
            pos.y = (this.direction === 'up' ? -30 : f.virtual.height + 30)
            this.setPosition(pos)
        },
        animateRocket: function() {
            var that = this
            var heightPlus = f.virtual.height + 60
            var finalY = (this.direction === 'up' ? heightPlus : heightPlus * -1)
            var move = cc.moveBy(this.duration, cc.p(0, finalY))
            var delay = cc.delayTime(this.delay)
            var setIsAnimate = cc.callFunc(() => that.isAnimate = true, this)
            this.moveSeq = cc.sequence(delay, setIsAnimate, move)
            this.runAction(this.moveSeq)
            this.resume()
        },
        detectCollisionWithCharSprite: function() {
            if(!this.isAnimate) return
            if(f.data.char_stop) return

            const centerY = 20
            const rect1 = f.data['turtle_' + this.leftOrRight].sprite.getBoundingBox()
            var rect2 = this.getBoundingBox()
            if(cc.rectIntersectsRect(rect1, rect2)) {
                enemy.rocketExplode(this.leftOrRight, true)
                this.isAnimate = false
                this.visible = false
                this.pause()
                char.die(this.leftOrRight)
            }
        }
    })

    // rocket cannot explode more than once every second
    enemy.lastRocketExplode = (+ new Date())
    enemy.rocketExplode = (leftOrRight, isExplodedOnTurtle) => {
        if(enemy.lastRocketExplode + 1000 > (+ new Date())) return

        enemy.lastRocketExplode = (+ new Date())

        var pos
        if(isExplodedOnTurtle) {
            pos = f.data['turtle_' + leftOrRight].sprite.getPosition()
        } else {
            pos = (leftOrRight === 'left' ? rocketLeft.sprite : rocketRight.sprite).getPosition()
        }

        // no explode if rocket is not launched yet
        if(pos.y === 300 || pos.y === -30) return

        var emitter = cc.ParticleSystem.create(res.particles.rocket_explosion_plist)
        currentLayer.addChild(emitter)
        emitter.setPosition(pos.x, pos.y)
        emitter.setAutoRemoveOnFinish(true)
        emitter.scale = 0.08

        cc.audioEngine.playEffect(res.sound.rocket_explode)
    }

    enemy.startRocket = (col) => {
        if(f.data.is_game_over) return
        if(col === 5 || col === 6) return

        var removeUnusedRockets = () => {
            if(currentLayer === undefined) return

            var leftOrRight = (col <= 5 ? 'left' : 'right')
            var currentTag = (leftOrRight === 'left' ? f.tag.rocketLeft : f.tag.rocketRight)

            if(currentLayer.getChildByTag(currentTag) === null) return

            if(leftOrRight === 'left') {
                if(!empty(rocketLeft.sprite)) {
                    enemy.rocketExplode(leftOrRight, false)
                    currentLayer.removeChild(rocketLeft.sprite)
                }
                if(!empty(rocketLeft.timer.sprite)) {
                    currentLayer.removeChild(rocketLeft.timer.sprite)
                }
            } else if(leftOrRight === 'right') {
                if(!empty(rocketRight.sprite)) {
                    enemy.rocketExplode(leftOrRight, false)
                    currentLayer.removeChild(rocketRight.sprite)
                }
                if(!empty(rocketRight.timer.sprite)) {
                    currentLayer.removeChild(rocketRight.timer.sprite)
                }
            }
        }

        var createRocketsSprite = () => {
            var rocketConfigs = f.data.level[f.data.charLevel.load()].rocket_config
            var leftOrRight,
                rocketObj,
                currentTag
            for(let currentConfig of rocketConfigs) {
                if(currentConfig.col != col) continue

                leftOrRight = (col <= 5 ? 'left' : 'right')
                rocketObj = (leftOrRight === 'left' ? rocketLeft : rocketRight)
                currentTag = (leftOrRight === 'left' ? f.tag.rocketLeft : f.tag.rocketRight)
                currentConfig.leftOrRight = leftOrRight

                rocketObj.sprite = new RocketSprite(currentConfig)
                rocketObj.timer = new RocketTimer(currentConfig, currentTag)

                currentLayer.addChild(rocketObj.sprite, 0, currentTag)
            }
        }

        removeUnusedRockets()
        createRocketsSprite()
    }

// ------------------------------------------------------------------------------------------------ Enemy Layer

    enemy.resetData = () => {
        trapSprites = []
        rotatedTrapSpritesIndex = []
        trapClosed = null
        rocketLeft = {}
        rocketRight = {}
    }

    EnemyLayer = cc.Layer.extend({
        ctor:function () {
            this._super()
            currentLayer = this
            this.initEnemy()
        },
        initEnemy: function() {
            this.printTraps()
        },
        printTraps: function() {
            var trapConfigs = f.data.level[f.data.charLevel.load()].trap_config
            for(let trapConfig of trapConfigs) {
                this.createTrapSprite(trapConfig)

                const row = trapConfig.row
                const col = trapConfig.col
                f.data.trap_pos.push({row: row, col: col})
            }

            this.schedule(this.scheduleTrapShake, 5)
        },
        createTrapSprite: function(trapConfig) {
            var sprite

            sprite = new TrapSprite(trapConfig, 'left')
            trapSprites.push(sprite)
            this.addChild(sprite)

            sprite = new TrapSprite(trapConfig, 'right')
            trapSprites.push(sprite)
            this.addChild(sprite)
        },
        scheduleTrapShake: function() {
            var firstSpriteKey, secondSpriteKey

            function shuffle(array) {
                var currentIndex = array.length, temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }
                return array;
            }

            const count = f.data.trap_pos.length
            const keys = f.data.trap_pos.map((v, i) => i)
            const randKeys = shuffle(keys)
            const halfRandKeys = randKeys.slice(0, Math.floor(randKeys.length / 2))
            halfRandKeys.map((key) => {
                firstSpriteKey = key * 2
                secondSpriteKey = firstSpriteKey + 1

                if(trapSprites[firstSpriteKey].allowShake) {
                    trapSprites[firstSpriteKey].shake()
                }

                if(trapSprites[secondSpriteKey].allowShake) {
                    trapSprites[secondSpriteKey].shake()
                }
            })
        }
    })
})()