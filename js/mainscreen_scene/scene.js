// ------------------------------------------------------------------------------------------------ Expose
var MainscreenScene

;

(() => {
    var mainscreenScene

    var TurtleFamilySprite = cc.Sprite.extend({
        ctor: function(filename, smallOrBig) { 
            this._super()
            this.initWithFile(filename)
            this.smallOrBig = smallOrBig
        },
        onEnter: function() {
            this.animate()
            this.setAnchorPoint(0, 0)
            this.y = 59
        },
        animate: function() {
            var delay = cc.delayTime(3)
            var move = cc.moveBy(10, cc.p(f.virtual.width + 150, 0))
            var moveSeq = cc.sequence(delay, move)

            this.scale = (this.smallOrBig === 'big' ? 0.6 : 0.4)
            this.schedule(this.walkAnimation.bind({ sprite: this }), 0.3)
            this.runAction(moveSeq)
            this.resume()
        },
        walkAnimation: function() {
            var imgStand = res.img.turtle_stand
            var imgWalk = res.img.turtle_walk

            this.walkAnimationFlipFlop = !this.walkAnimationFlipFlop
            if(this.walkAnimationFlipFlop) {
                this.sprite.setTexture(imgWalk)
            } else {
                this.sprite.setTexture(imgStand)
            }
        }
    })

    // ------------------------------------------------------------------------------------------------ Layer
    var MainLayer = cc.Layer.extend({
        ctor:function () {
            this._super()
            this.printScreenBg()
            this.printPlayBtn()
            this.printAnimation()
        },
        printScreenBg: function() {
            var screenBg = new DuaSprite(res.img.mainscreen_bg)
            screenBg.x = f.virtual.width / 2
            screenBg.y = f.virtual.height / 2
            //setInterval(() => {
            //    applyShader(screenBg, 'screen_bg.fsh', null, 0.5)
            //}, 1000/60)
            this.addChild(screenBg)
        },
        printPlayBtn: function() {
            var playItem = cc.MenuItemImage.create(res.img.mainscreen_play, res.img.mainscreen_play_selected, this.onPlayBtnCallback, this)
            playItem.scale = 0.5
            playItem.x = f.virtual.width / 2
            playItem.y = f.virtual.height * 4 / 10
            var menu = cc.Menu.create(playItem)
            menu.x = 0
            menu.y = 0
            this.addChild(menu)
        },
        onPlayBtnCallback: function() {
            currentGame.changeScene(g_resources.pick_level, PickLevelScene)
        },
        printAnimation: function() {
            var sprites = []
            var xArr = [-40, -68, -93, -118]

            for(let i = 0; i < 4; i++) {
                var sprite  = new TurtleFamilySprite(res.img.turtle_stand, (i === 0 ? 'big' : 'small'))
                sprite.x = xArr[i]
                this.addChild(sprite)
                sprites.push(sprite)
            }
        }
    })

    // ------------------------------------------------------------------------------------------------ Scene
    MainscreenScene = cc.Scene.extend({
        onEnter:function () {
            this._super()
            this.setName('mainscreen_scene')
            cc.audioEngine.playMusic(res.sound.play_lawton)
            mainscreenScene = this
            var mainLayer = new MainLayer()
            this.addChild(mainLayer)
        }
    })
})()
