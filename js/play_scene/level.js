// ------------------------------------------------------------------------------------------------ Expose
var level = {}

level.finish = () => {}

;

// ------------------------------------------------------------------------------------------------ Module
(function() {

    var levelFinishLayer

    var LevelFinishLayer = cc.Layer.extend({
        nextLevelBtnBlinkCounter: 0,
        ctor:function () {
            this._super()
            this.printBg()
            this.printYouWin()
            this.printNextLevelBtn()
        },
        printBg: function() {
            var bg = new DuaSprite(res.img.level_finish_bg)
            bg.setAnchorPoint(0, 0)
            this.addChild(bg)
        },
        printYouWin: function() {
            this.printYouWin = new DuaSprite(res.img.level_finish_you_win)
            this.printYouWin.setPosition(f.virtual.width / 2, 170)
            this.addChild(this.printYouWin)
        },
        printNextLevelBtn: function() {
            var that = this
            var playItem = cc.MenuItemImage.create(res.img.level_finish_next_level_1, res.img.level_finish_next_level_2, this.onNextLevelBtnCallback, this)
            playItem.scale = 0.5
            playItem.x = 10
            playItem.y = 10
            playItem.setAnchorPoint(0, 0)
            var menu = cc.Menu.create(playItem)
            menu.x = 0
            menu.y = 0
            this.addChild(menu)

            var nextLevelFlipFlopFn = () => {
                var url
                if(that.nextLevelBtnBlinkCounter < 4) {
                    url = res.img.level_finish_next_level_1
                } else {
                    url = res.img.level_finish_next_level_2
                    that.nextLevelBtnBlinkCounter = 0
                }
                playItem.setNormalSpriteFrame(url)
                that.nextLevelBtnBlinkCounter++
            }
            this.schedule(nextLevelFlipFlopFn, 0.3)
        },
        onNextLevelBtnCallback: function() {
            const totalLevel = Object.keys(f.data.level).length
            var currentLevel = f.data.charLevel.load()
            currentLevel++
            if(currentLevel > totalLevel) {
                currentLevel = 1
            }

            (async () => {
                await f.data.charLevel.save(currentLevel)
                currentGame.changeScene(g_resources.play, PlayScene)
            })()
        }
    })

    level.finish = () => {
        var updateLevelState = () => {
            var charLevel = f.data.charLevel.load()
            var currentDied = f.data.levelStat.search('level_id', charLevel)
            currentDied.is_finished = 1
            f.data.levelStat.update(currentDied)
        }
        updateLevelState()
        var currentScene = cc.director.getRunningScene()
        levelFinishLayer = new LevelFinishLayer()
        currentScene.addChild(levelFinishLayer, f.zOrder.high)
    }
})()