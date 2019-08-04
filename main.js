var currentGame = {}
currentGame.changeScene = () => {}

cc.game.onStart = function(){
    var setup = () => {
        var sys = cc.sys
        currentGame = this
        cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false)
        if (sys.isMobile && 
            sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
            sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
            cc.view.enableAutoFullScreen(true)
        }
        cc.view.adjustViewPort(true)
        cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE)
        cc.view.setDesignResolutionSize(480, 270, cc.ResolutionPolicy.SHOW_ALL)
        cc.view.resizeWithBrowserSize(true)
        cc.audioEngine.setEffectsVolume(0.2)
        cc.audioEngine.setMusicVolume(1)
        cc.director.setClearColor(cc.color(20, 20, 20, 0))
    }

    var registerListener = () => {
        cc.eventManager.addListener(f.input.keyboardListener.clone(), 1)
        cc.eventManager.addListener(f.input.touchListener.clone(), 1)
    }

    setup()
    registerListener()

    currentGame.changeScene = (res, SceneClass) => {
        cc.LoaderScene.preload(res, function() {
            cc.director.runScene(new SceneClass())
        }, this)
    }

    currentGame.changeScene(g_resources.mainscreen, MainscreenScene)
    //currentGame.changeScene(g_resources.pick_level, PickLevelScene)
    //currentGame.changeScene(g_resources.play, PlayScene)
    //currentGame.changeScene(g_resources.test, TestScene)
}
cc.game.run()