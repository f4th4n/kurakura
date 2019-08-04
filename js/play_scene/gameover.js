// ------------------------------------------------------------------------------------------------ Expose
var GameOverLayer,
    gameover = {}

/*
    call gameover.showLayer() when game over
*/

;

// ------------------------------------------------------------------------------------------------ Module
(function() {

    var gameOverLayer

    GameOverLayer = cc.Layer.extend({
        screenBgWidth: null,
        ctor:function () {
            this._super()
            this.printGameOverBg()
            this.printBtn()
        },
        printGameOverBg: function() {
            this.gameOverBgSprite = new DuaSprite(res.img.gameover_bg)
            this.gameOverBgSprite.setPosition(f.virtual.width / 2, f.virtual.height / 2)
            this.addChild(this.gameOverBgSprite)

            var move
            this.gameTxt = new DuaSprite(res.img.game_txt)
            this.gameTxt.x = -100
            this.gameTxt.y = 220
            move = cc.moveBy(0.4, cc.p(f.virtual.width / 2 + 100, 0))
            this.gameTxt.runAction(move)
            this.gameTxt.resume()
            this.addChild(this.gameTxt)

            this.overTxt = new DuaSprite(res.img.over_txt)
            this.overTxt.x = f.virtual.width + 100
            this.overTxt.y = 160
            move = cc.moveBy(0.4, cc.p((f.virtual.width / 2 + 100) * -1, 0))
            this.overTxt.runAction(move)
            this.overTxt.resume()
            this.addChild(this.overTxt)
        },
        printBtn: function() {
            var playAgainItem = cc.MenuItemImage.create(res.img.play_again, res.img.play_again_selected, gameover.restart, this)
            playAgainItem.scale = 0.5
            var exitToMainMenuItem = cc.MenuItemImage.create(res.img.exit, res.img.exit_selected, () => {
                currentGame.changeScene(g_resources.mainscreen, MainscreenScene)
            }, this)
            exitToMainMenuItem.scale = 0.5
            var menu = cc.Menu.create(playAgainItem, exitToMainMenuItem)
            menu.x = 0
            menu.y = 0
            playAgainItem.x = f.virtual.width / 4
            playAgainItem.y = f.virtual.height / 4
            exitToMainMenuItem.x = f.virtual.width - (f.virtual.width / 4)
            exitToMainMenuItem.y = f.virtual.height / 4
            this.addChild(menu)
        }
    })

    gameover.resetCurrentLevel = () => {
        enemy.cleanTrap()
        river.resetPad()
        char.resetPos()
    }

    gameover.restart = function() {
        f.data.is_game_over = false

        if(f.config.showAd && cc.sys.isMobile) {
            sdkbox.PluginAdMob.cache('gameover')
        }

        f.data.charLife.save(f.config.maxLife)
        sidebar.recoverLifeSprite()
        gameover.resetCurrentLevel()
        cc.audioEngine.playEffect(res.sound.ok)

        var currentScene = cc.director.getRunningScene()
        currentScene.removeChild(gameOverLayer)
    }

    gameover.showLayer = function() {
        if(f.config.showAd && cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('gameover')
        }

        var currentScene = cc.director.getRunningScene()
        gameOverLayer = new GameOverLayer()
        currentScene.addChild(gameOverLayer, f.zOrder.high)
    }
})()