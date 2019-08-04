// ------------------------------------------------------------------------------------------------ Expose
var RiverLayer,
    river = {}

river.resetPad = () => {}

// ------------------------------------------------------------------------------------------------ Module
(function() {
    // config
    var riverConfig = null
    var padConfig = null

    // private variable
    var riverSprites = []
    var padSprites = []

    river.resetData = () => {
        riverConfig = f.data.level[f.data.charLevel.load()].river_config
        padConfig = f.data.level[f.data.charLevel.load()].pad_config
        // default data
        riverConfig[0].col = 2
        riverConfig[1].col = 4
        riverConfig[2].col = 7
        riverConfig[3].col = 9
    }

    river.resetPad = () => {
        var posY

        for(let pad of padSprites) {
            pad.currentPadConfig = {
                row: padConfig[pad.riverIndex].row,
                delay: padConfig[pad.riverIndex].delay
            }
            pad.currentRiverConfig = {
                scrollSpeed: riverConfig[pad.riverIndex].scrollSpeed,
                direction: riverConfig[pad.riverIndex].direction
            }

            posY = world.getLocation(pad.currentRiverConfig.col, pad.currentPadConfig.row).y
            f.data.pad_pos[pad.riverIndex].row = pad.currentPadConfig.row
            pad.setPositionY(posY)
        }
    }

    var ScrollingRiver = cc.Sprite.extend({
        direction: null, // up|down
        scrollSpeed: 1,
        ctor: function(direction) { 
            var file

            this._super()
            this.direction = direction

            if(this.direction === 'down') {
                file = res.img.river_down
            } else {
                file = res.img.river_up
            }

            this.initWithFile(file)
        },
        onEnter: function() {
            this.scale = 0.5
            if(this.direction === 'down') {
                this.setAnchorPoint(0, 0)
            } else {
                this.setAnchorPoint(0, 1)
                this.initPos()
            }
        },
        scroll: function() {
            if(this.direction === 'down') {
                this.setPositionY(this.getPositionY() - this.scrollSpeed)
            } else {
                this.setPositionY(this.getPositionY() + this.scrollSpeed)
            }

            if(this.isReset()) {
                this.initPos()
            }
        },
        initPos: function() {
            if(this.direction === 'down') {
                this.setPositionY(0)
            } else {
                this.setPositionY(f.virtual.height)
            }
        },
        isReset: function() {
            if(this.direction === 'down') {
                return this.getPositionY() < (f.virtual.height * -1)
            } else {
                return this.getPositionY() > (f.virtual.height * 2)
            }
        }
    })

    var PadSprite = cc.Sprite.extend({
        riverIndex: null, // 1|2|3|4
        ctor: function() { 
            this._super()
            this.initWithFile(res.img.turtle_pad)
        },
        onEnter: function() {
            this.currentPadConfig = {
                row: padConfig[this.riverIndex].row,
                delay: padConfig[this.riverIndex].delay
            }
            this.currentRiverConfig = {
                scrollSpeed: riverConfig[this.riverIndex].scrollSpeed,
                direction: riverConfig[this.riverIndex].direction
            }
            this.scale = 0.5
            this.schedule(this.changeLocation, this.currentPadConfig.delay)
            this.resume()
        },
        changeLocation:function() {
            function changePadLocation(that)  {
                var posY

                if(that.currentRiverConfig.direction === 'up') {
                    that.currentPadConfig.row--
                    if(that.currentPadConfig.row < 1) {
                        that.currentPadConfig.row = world.colCount
                    }
                } else { // that.currentRiverConfig.direction === 'down'
                    that.currentPadConfig.row++
                    if(that.currentPadConfig.row > world.colCount) {
                        that.currentPadConfig.row = 1
                    }
                }

                posY = world.getLocation(that.currentRiverConfig.col, that.currentPadConfig.row).y
                f.data.pad_pos[that.riverIndex].row = that.currentPadConfig.row
                that.setPositionY(posY)
            }

            function changeCharLocation(that) {
                if(f.data.char_stop) return

                var posY

                const charLeftPos = {
                    col: f.data.turtle_left.col,
                    row: f.data.turtle_left.row
                }
                const charRightPos = {
                    col: f.data.turtle_right.col,
                    row: f.data.turtle_right.row
                }

                var currPad = {}
                currPad.row = f.data.pad_pos[that.riverIndex].row
                currPad.col = 0

                if(that.riverIndex === 0) {
                    currPad.col = 2
                } else if(that.riverIndex === 1) {
                    currPad.col = 4
                } else if(that.riverIndex === 2) {
                    currPad.col = 7
                } else if(that.riverIndex === 3) {
                    currPad.col = 9
                }

                if(that.riverIndex <= 1) { // left screen
                    const diffOne = (Math.abs(currPad.row - charLeftPos.row) === 1)
                    const backTo = (Math.abs(currPad.row - charLeftPos.row) === 12)
                    if(currPad.col === charLeftPos.col && (diffOne || backTo)) {
                        char.changeLocation(currPad.col, that.currentPadConfig.row, 'left')
                    }
                } else if(that.riverIndex >= 2) { // right screen
                    const diffOne = (Math.abs(currPad.row - charRightPos.row) === 1)
                    const backTo = (Math.abs(currPad.row - charRightPos.row) === 12)
                    if(currPad.col === charRightPos.col && (diffOne || backTo)) {
                        char.changeLocation(currPad.col, that.currentPadConfig.row, 'right')
                    }
                }
            }

            changePadLocation(this)
            changeCharLocation(this) // when char is on the pad
        }
    })

    RiverLayer = cc.Layer.extend({
        ctor:function () {
            this._super()

            this.printRivers()
            this.printPads()

            this.scheduleUpdate()
        },
        update:function(dt) {
            for(let i = 0; i < riverConfig.length; i++) {
                riverSprites[i].scroll()
            }
        },
        printRivers: function() {
            for(let i = 0; i < riverConfig.length; i++) {
                var currentRiverConfig = riverConfig[i]
                var posX = world.getLocation(currentRiverConfig.col, null).x
                riverSprites[i] = new ScrollingRiver(currentRiverConfig.direction)
                riverSprites[i].scrollSpeed = currentRiverConfig.scrollSpeed
                riverSprites[i].setPositionX(posX)
                this.addChild(riverSprites[i])
            }
        },
        printPads: function() {
            var pos, currentRiverConfig, currentPadConfig
            for(let i = 0; i < riverConfig.length; i++) {
                currentRiverConfig = riverConfig[i]
                currentPadConfig = padConfig[i]

                // will be read by char.js
                f.data.pad_pos[i].row = currentPadConfig.row

                pos = world.getLocation(currentRiverConfig.col, currentPadConfig.row)
                padSprites[i] = new PadSprite(res.img.turtle_pad)
                padSprites[i].riverIndex = i

                pos.x += (padSprites[i].width / 2 / 2)
                padSprites[i].setPosition(pos)

                this.addChild(padSprites[i])
            }
        }
    })
})()