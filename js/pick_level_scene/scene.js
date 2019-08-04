// ------------------------------------------------------------------------------------------------ Expose
var PickLevelScene

;

(() => {
    var pickeLevelScene

    var LevelTitleText = cc.LabelTTF.extend({
        ctor: function(str) {
            this._super()
            this.str = str
        },
        onEnter: function() {
            this.setString(this.str)
            this.setFontName(f.fonts.manaspace)
            this.setFontSize(35)
            this.setScale(0.7)
            this.setAnchorPoint(0, 0)
            this.setColor({r: 255, g: 255, b: 255})
            this.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT)
            this.x = 20
            this.y = 63
        }
    })

    var LevelFinishedText = cc.LabelTTF.extend({
        ctor: function() {
            this._super()
            this.str = 'Pass'
        },
        onEnter: function() {
            this.setString(this.str)
            this.setFontName(f.fonts.manaspace)
            this.setFontSize(35)
            this.setScale(0.8)
            this.setAnchorPoint(0, 0)
            this.setColor({r: 0, g: 255, b: 0})
            this.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT)
            this.x = 20
            this.y = 20
        }
    })

    var LevelAfterDiedText = cc.LabelTTF.extend({
        ctor: function(diedTimes, isFinish) {
            this._super()
            this.isFinish = isFinish
            this.str = `${ (isFinish ? 'After' : '') } Died ${ diedTimes }x`
        },
        onEnter: function() {
            this.setString(this.str)
            this.setFontName(f.fonts.manaspace)
            this.setFontSize(35)
            this.setScale(0.8)
            this.setAnchorPoint(0, 0)
            this.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT)
            this.x = 220
            this.y = 20

            if(this.isFinish) this.x += 18
            if(this.isFinish) {
                this.setColor({r: 0, g: 255, b: 0})
            } else {
                this.setColor({r: 255, g: 0, b: 0})
            }
        }
    })

    // ------------------------------------------------------------------------------------------------ Layer
    var MainLayer = cc.Layer.extend({
        toothBgHeight: 32,
        ctor:function () {
            this._super()
            this.printScreenBg()
            this.printListLevel()
        },
        printScreenBg: function() {
            const animationDuration = 0.9
            var pause = cc.callFunc(() => this.pause(), this)
            var moveToTop = cc.moveBy(animationDuration, cc.p(0, this.toothBgHeight))
            var moveToBottom = cc.moveBy(animationDuration, cc.p(0, this.toothBgHeight * -1))
            var moveToTopEaseIn = moveToTop.clone().easing(cc.easeBounceOut())
            var moveToBottomEaseIn = moveToBottom.clone().easing(cc.easeBounceOut())

            var bottomBg = new DuaSprite(res.img.pick_level_bottom_bg)
            bottomBg.setAnchorPoint(0, 0)
            bottomBg.setPositionY(this.toothBgHeight * -1)
            bottomBg.runAction(cc.sequence(moveToTopEaseIn, pause))
            bottomBg.resume()
            this.addChild(bottomBg)

            var topBg = new DuaSprite(res.img.pick_level_top_bg)
            topBg.setAnchorPoint(0, 1)
            topBg.setPositionY(f.virtual.height + this.toothBgHeight)
            topBg.runAction(cc.sequence(moveToBottomEaseIn, pause))
            topBg.resume()
            this.addChild(topBg)
        },
        printListLevel: function() {
            const totalLevel = Object.keys(f.data.level).length
            const containerSizeMultiplier = totalLevel - 4
            var sprites = []

            for(let i = 0; i < totalLevel; i++) {
                let imageView = new ccui.ImageView()
                imageView.loadTexture(res.img.pick_level_list_bg)
                imageView.setAnchorPoint(0, 0)
                imageView.scale = 0.5
                imageView.x = 1
                sprites.push(imageView)
            }

            var scrollView = ccui.ScrollView.create()
            scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL)
            scrollView.setTouchEnabled(true)
            scrollView.setBounceEnabled(true)
            scrollView.setContentSize(cc.size(sprites[0].width, f.virtual.height - 67))
            scrollView.setInnerContainerSize(cc.size(sprites[0].width, scrollView.height + (52 * containerSizeMultiplier) + 6))
            scrollView.setPosition(0, 34)

            sprites[0].y = scrollView.getInnerContainerSize().height - 52 - 1
            for(let i = 1; i < totalLevel; i++) {
                sprites[i].y = sprites[i - 1].getBottomBoundary() - (sprites[i - 1].height / 2)
            }

            // add a node to the scroll view
            for(let sprite of sprites) {
                scrollView.addChild( sprite )
            }

            var writeLevelFinishedText = (sprite) => {
                var levelFinishedText = new LevelFinishedText()
                sprite.addChild(levelFinishedText)
            }

            var writeAfterDiedText = (sprite, diedTimes, isFinish) => {
                var levelAfterDiedText = new LevelAfterDiedText(diedTimes, isFinish)
                sprite.addChild(levelAfterDiedText)
            }

            var texts = Object.values(f.data.level).map((v) => v.title)
            var levelIds = Object.values(f.data.level).map((v) => v.id)
            for(let [key, sprite] of sprites.entries()) {
                let currentLevelStat = f.data.levelStat.search('level_id', levelIds[key])
                if(currentLevelStat !== undefined) {
                    writeAfterDiedText(sprite, currentLevelStat.died, currentLevelStat.is_finished)
                    if(currentLevelStat.is_finished) {
                        writeLevelFinishedText(sprite)
                    }
                }

                let levelTitleText = new LevelTitleText(texts[key])
                sprite.addChild(levelTitleText)
            }

            for(let [key, sprite] of sprites.entries()) {
                var changeLevel = async (currentItem, w) => {
                    await f.data.charLevel.save(currentItem.levelId)
                    currentGame.changeScene(g_resources.play, PlayScene)
                }

                var playItem = cc.MenuItemImage.create(res.img.pick_level_play_btn, res.img.pick_level_play_btn_selected, changeLevel, this)
                playItem.x = 880
                playItem.y = 52
                playItem.levelId = key + 1
                var menu = cc.Menu.create(playItem)
                menu.x = 0
                menu.y = 0
                sprite.addChild(menu)
            }

            var autoScroll = () => {
                if(!this.isRunning()) return

                scrollView.jumpToPercentVertical(25)
                scrollView.visible = true
                setTimeout(() => scrollView.scrollToPercentVertical(-35, 2, 1), 100)
                scrollView.unschedule(autoScroll)
            }
            scrollView.visible = false
            scrollView.schedule(autoScroll)
            scrollView.resume()
            this.addChild(scrollView)
        }
    })

    // ------------------------------------------------------------------------------------------------ Scene
    PickLevelScene = cc.Scene.extend({
        onEnter:function () {
            this._super()
            this.setName('pick_level_scene')
            pickeLevelScene = this
            cc.director.setClearColor(cc.color(50, 50, 50, 0))

            var mainLayer = new MainLayer()
            this.addChild(mainLayer)
        }
    })
})()
