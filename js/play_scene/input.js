// ------------------------------------------------------------------------------------------------ Expose
var InputLayer

/*
    Keyboard Input Listener:
        key F to make left turtle walk
        key J to make right turtle walk
        key back button (android) to close the app
*/

// ------------------------------------------------------------------------------------------------ Module
(function() {

    var leftWalkBtn,
        rightWalkBtn,
        input = {}

    var canWalk = () => {
        if(cc.director.getRunningScene().getName() !== 'play_scene') return false
        if(f.data.char_stop) return false
        if(f.data.is_game_over) return false
        if(f.data.turtle_left.isFinish && f.data.turtle_right.isFinish) return false

        return true
    }

    var walkExec = (leftOrRight) => {
        if(!canWalk()) return

        var causeOfTheDeath = (leftOrRight === 'left' ? char.leftCharWalk() : char.rightCharWalk())
        if(causeOfTheDeath) {
            cc.audioEngine.playEffect(res.sound.drown)
        } else {
            cc.audioEngine.playEffect(res.sound.jump)
        }
    }

    var checkWalkTouch = function(target, touch) {
        if(target === undefined || !canWalk())
            return false

        var location = target.convertToNodeSpace(touch.getLocation())
        var targetSize = target.getContentSize()
        var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height)
        if(cc.rectContainsPoint(targetRectangle, location))
            return true
    }

    f.input.touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function(touch) {
            if(checkWalkTouch(leftWalkBtn, touch)) {
                walkExec('left')
                leftWalkBtn.setTexture(res.img.walk_btn_selected)
                return true
            } else if(checkWalkTouch(rightWalkBtn, touch)) {
                walkExec('right')
                rightWalkBtn.setTexture(res.img.walk_btn_selected)
                return true
            }
        },
        onTouchEnded: function(touch) {
            leftWalkBtn.setTexture(res.img.walk_btn)
            rightWalkBtn.setTexture(res.img.walk_btn)
        }
    })

    f.input.keyboardListener = cc.EventListener.create({
        event: cc.EventListener.KEYBOARD,
        onKeyPressed: function(keyCode, event) {
            var walkListener = () => {
                if(!canWalk()) return

                const keyF = 70
                const keyJ = 74

                if(keyCode === keyF) {
                    walkExec('left')
                } else if(keyCode === keyJ) {
                    walkExec('right')
                }
            }

            var exitAppListener = () => {
                // keyCode 6 is back button in Android
                if(keyCode === 6 || keyCode === 8) {
                    const currentSceneName = cc.director.getRunningScene().getName()
                    if(currentSceneName === 'mainscreen_scene') {
                        cc.game.end()
                    } else if(currentSceneName === 'pick_level_scene') {
                        currentGame.changeScene(g_resources.mainscreen, MainscreenScene)
                    } else if(currentSceneName === 'play_scene') {
                        currentGame.changeScene(g_resources.pick_level, PickLevelScene)
                    }
                }
            }

            var reloadAppListener = () => {
                if(location === undefined) return
                if(keyCode === 82) location.reload()
            }

            walkListener()
            exitAppListener()
            reloadAppListener()
        }
    })

    InputLayer = cc.Layer.extend({
        marginX: 5,
        marginY: 8,
        ctor: function () {
            this._super()
            this.printLeftWalkBtn()
            this.printRightWalkBtn()
        },
        printLeftWalkBtn: function() {
            leftWalkBtn = new DuaSprite(res.img.walk_btn)
            leftWalkBtn.scale = 0.5
            leftWalkBtn.setAnchorPoint(0, 0)
            leftWalkBtn.x = this.marginX
            leftWalkBtn.y = this.marginY
            leftWalkBtn.leftOrRight = 'left'
            this.addChild(leftWalkBtn)
        },
        printRightWalkBtn: function() {
            rightWalkBtn = new DuaSprite(res.img.walk_btn)
            rightWalkBtn.scale = 0.5
            rightWalkBtn.setAnchorPoint(0.5, 0.5)
            rightWalkBtn.x = cc.winSize.width - this.marginX - (rightWalkBtn.width / 4)
            rightWalkBtn.y = this.marginY + (rightWalkBtn.height / 4)
            rightWalkBtn.rotation = 180
            rightWalkBtn.leftOrRight = 'right'
            this.addChild(rightWalkBtn)
        }
    })
})()
