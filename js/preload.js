var f = {}

// defined in external file
f.input = {} // keyboard listener, touch listener, click listener
f.data = {} // game save, load, save
f.layer = {}

// ------------------------------------------------------------------------------------------------ dimension
f.virtual = {}
f.virtual.width = 480
f.virtual.height = 270
f.virtual.consoleWidth = 77.5

// ------------------------------------------------------------------------------------------------ fonts
f.fonts = {}
f.fonts.manaspace = (cc.sys.isNative ? 'res/fonts/manaspc.ttf' : 'Manaspace')

// ------------------------------------------------------------------------------------------------ f.tag
f.tag = {}
// play layer: BgLayer, SidebarLayer, InputLayer, RiverLayer, EnemyLayer, CharLayer
f.tag.playLayer = 100
f.tag.gameOverLayer = 101
// rocket
f.tag.rocketLeft = 500
f.tag.rocketRight = 501

// ------------------------------------------------------------------------------------------------ priority
f.zOrder = {}
f.zOrder.zero = 0
f.zOrder.low = 1
f.zOrder.medium = 5
f.zOrder.high = 10

// ------------------------------------------------------------------------------------------------ config
f.config = {}
f.config.showAd = false
f.config.maxLife = 5
