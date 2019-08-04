// ------------------------------------------------------------------------------------------------ Expose
var SidebarLayer
var sidebar = {}

/*
    method:
        sidebar.decreaseLifeSprite()
        sidebar.recoverLifeSprite()
        sidebar.changeTextTurtleDied()

    variable:
        sidebar.turtleDiedLabel
*/

// ------------------------------------------------------------------------------------------------ Module

sidebar.decreaseLifeSprite = () => {
    var lifeSprite
    const currentCharLife = f.data.charLife.load()
    const lastLifeSprite = f.data.life_sprites[currentCharLife]

    if(lastLifeSprite === undefined) return

    lastLifeSprite.setVisible(false)
}

sidebar.recoverLifeSprite = () => {
    for(let sprite of f.data.life_sprites) {
        sprite.setVisible(true)
    }
}

sidebar.changeTextTurtleDied = (turtleDied) => {
    sidebar.turtleDiedLabel.setString(`DIED\n${ turtleDied } TIMES`)
}

;

(function() {

    const lifeSpritePos = [
        { x: 5, y: 244 },
        { x: 28, y: 244 },
        { x: 50, y: 244 },
        { x: 15, y: 220 },
        { x: 39, y: 220 },
    ]

    var SidebarText = cc.LabelTTF.extend({
        ctor: function(str, leftOrRight) {
            this._super()
            this.str = str
            this.leftOrRight = leftOrRight
        },
        onEnter: function() {
            this.setString(this.str)
            this.setFontName(f.fonts.manaspace)
            this.setFontSize(30)
            this.setScale(0.32)
            this.setAnchorPoint(0, 0)
            this.setColor({r: 0, g: 0, b: 0})
            this._setBoundingHeight(100)
            this._setBoundingWidth(220)
            this.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER)
            if(this.leftOrRight === 'left') {
                this.x = 4
            } else {
                this.x = 408
            }
        }
    })

    SidebarLayer = cc.Layer.extend({
        ctor:function () {
            this._super()
            this.printSidebar()
        },
        printSidebar: function() {
            this.printLifeSprites()
            this.printTotalTurtleDied()
            this.printLevelName()
        },
        printLifeSprites: function() {
            var lifeSprite

            const currentCharLife = f.data.charLife.load()

            for(let i = 0; i < f.config.maxLife; i++) {
                lifeSprite = new DuaSprite(res.img.life)
                lifeSprite.setAnchorPoint(0, 0)
                lifeSprite.setVisible(false)
                lifeSprite.setPosition(lifeSpritePos[i])
                f.data.life_sprites.push(lifeSprite)
                this.addChild(lifeSprite)
            }

            for(let i = 0; i < currentCharLife; i++) {
                f.data.life_sprites[i].setVisible(true)
            }
        },
        printTotalTurtleDied: function() {
            var charLevel = f.data.charLevel.load()
            var currentDied = f.data.levelStat.search('level_id', charLevel)
            sidebar.turtleDiedLabel = new SidebarText(`DIED\n${ currentDied.died } TIMES`, 'left')
            sidebar.turtleDiedLabel.y = 160
            this.addChild(sidebar.turtleDiedLabel)
        },
        printLevelName: function() {
            var currentLevel = f.data.level[f.data.charLevel.load()]
            var levelName = currentLevel.title
            var levelNumber = currentLevel.id

            sidebar.levelNameLabel = new SidebarText(levelName, 'right')
            sidebar.levelNameLabel.y = 180
            this.addChild(sidebar.levelNameLabel, f.zOrder.high)

            sidebar.levelNumberLabel = new SidebarText(`Level ${ levelNumber }`, 'right')
            sidebar.levelNumberLabel.y = 220
            this.addChild(sidebar.levelNumberLabel, f.zOrder.high)
        }
    })
})()
