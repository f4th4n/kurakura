// ------------------------------------------------------------------------------------------------ Expose
var BgLayer

// ------------------------------------------------------------------------------------------------ Module
(function() {
    BgLayer = cc.Layer.extend({
        screenBgWidth: null,
        ctor:function () {
            this._super()
            this.printScreenBg()
            this.printRightScreenBg()
        },
        printScreenBg: function() {
            var screenBg = new DuaSprite(res.img.screen_bg)
            screenBg.setAnchorPoint(0,0)
            function getScreenBgPosition() {
                const realWidth = screenBg.width / 2
                const res = (f.virtual.width - realWidth) / 2
                return res
            }
            this.screenBgWidth = screenBg.width
            screenBg.setPositionX(getScreenBgPosition())
            this.addChild(screenBg, 0)
        },
        printRightScreenBg: function() {
            const screenBgWidth = this.screenBgWidth
            function getCornerTopRightScreenPosition() {
                const realWidth = screenBgWidth / 2
                const controllerWidth = (f.virtual.width - realWidth) / 2
                return f.virtual.width - controllerWidth
            }

            var rightScreenBg = new DuaSprite(res.img.right_screen)
            rightScreenBg.setAnchorPoint(1, 0)
            rightScreenBg.setPositionX(getCornerTopRightScreenPosition())
            this.addChild(rightScreenBg)
        }
    })
})()