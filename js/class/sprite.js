// ------------------------------------------------------------------------------------------------ Expose
var DuaSprite

// ------------------------------------------------------------------------------------------------ Module
DuaSprite = cc.Sprite.extend({
    ctor: function(filename) { 
        this._super()
        this.initWithFile(filename)
    },
    onEnter: function() {
        this.scale = 0.5
    }
})
