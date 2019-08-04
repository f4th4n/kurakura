// ------------------------------------------------------------------------------------------------ Expose
var TestScene,
    ftest = {}

;

(() => {
    var testScene

    // ------------------------------------------------------------------------------------------------ Layer
    var MainLayer = cc.Layer.extend({
        ctor:function () {
            this._super()
            var that = this
            ftest.testLayer = this

            cc.director.setClearColor(cc.color(0, 0, 255, 0))
            var _emitter = cc.ParticleSystem.create(res.particles.rocket_explosion_plist)
            this.addChild(_emitter, 10)
            _emitter.setPosition(100, 100)
            _emitter.setAutoRemoveOnFinish(true);
        }
    })

    // ------------------------------------------------------------------------------------------------ Scene
    TestScene = cc.Scene.extend({
        onEnter:function () {
            this._super()
            this.setName('mainscreen_scene')
            testScene = this
            var mainLayer = new MainLayer()
            this.addChild(mainLayer)
        }
    })
})()
