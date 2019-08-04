// ------------------------------------------------------------------------------------------------ Expose
var PlayScene

;

// ------------------------------------------------------------------------------------------------ Module
(function() {
    PlayScene = cc.Scene.extend({
        onEnter: function() {
            this._super()
            this.setName('play_scene')
            cc.director.setClearColor(cc.color(255, 219, 72, 0))
            this.setupAd()
            this.resetData()
            this.resetDied()
            river.resetData()
            enemy.resetData()
            cc.audioEngine.stopMusic()

            var recoverLifeThenCreateLayers = async () => {
                await this.recoverLife()
                this.createLayers()
            }
            recoverLifeThenCreateLayers()
        },
        setupAd: function() {
            if(!f.config.showAd || !cc.sys.isMobile) return

            /*
                adViewDidReceiveAd: ad successfully viewed
                adViewDidFailToReceiveAdWithError:
                    such as ERROR_CODE_NETWORK_ERROR
                adViewDidDismissScreen:
                    client click back button twice
            */
            sdkbox.PluginAdMob.init()
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd : function(name) { 
                    if(name === 'gameover') {

                    }
                },
                adViewDidFailToReceiveAdWithError: function(name, msg) {
                    if(name === 'gameover') {

                    }
                },
                adViewWillPresentScreen: function(name) {
                    if(name === 'gameover') {

                    }
                },
                adViewDidDismissScreen: function(name) {
                    if(name === 'gameover') {

                    }
                },
                adViewWillDismissScreen: function(name) {
                    if(name === 'gameover') {

                    }
                },
                adViewWillLeaveApplication: function(name) {
                    if(name === 'gameover') {

                    }
                }
            })
        },
        recoverLife: function() {
            const charLife = f.data.charLife.load()
            if(charLife === 0) {
                return f.data.charLife.save(f.config.maxLife)
            }
        },
        resetData: function() {
            f.data.turtle_left = {}
            f.data.turtle_right = {}
            f.data.is_game_over = false
            f.data.char_stop = false
            f.data.life_sprites = []
            f.data.trap_pos = []
            f.data.pad_pos = [
                {row: 0},
                {row: 0},
                {row: 0},
                {row: 0}
            ]
        },
        /*
            this method is a bit confusing.
            char who starting current level: init levelStat
            char who has finished current level: the died times will be reset
            char who doesn't finished current level: the died times will be continued
        */
        resetDied: function() {
            var levelStat = f.data.levelStat.load()
            var charLevel = f.data.charLevel.load()
            var currentDied = f.data.levelStat.search('level_id', charLevel)
            if(currentDied === undefined) {
                levelStat.push({ level_id: charLevel, died: 0 })
            } else {
                for(let levelStatObj of levelStat) {
                    if(levelStatObj.level_id == currentDied.level_id && levelStatObj.is_finished) {
                        currentDied.died = 0
                        delete currentDied.is_finished
                        levelStatObj = currentDied
                    }
                }
            }

            f.data.levelStat.save(levelStat)
        },
        createLayers: function() {
            f.layer.bg = new BgLayer()
            f.layer.sidebar = new SidebarLayer() // life, point, total died
            f.layer.input = new InputLayer()
            f.layer.river = new RiverLayer()
            f.layer.enemy = new EnemyLayer()
            f.layer.char = new CharLayer()

            this.addChild(f.layer.bg, f.zOrder.low)
            this.addChild(f.layer.sidebar, f.zOrder.low)
            this.addChild(f.layer.input, f.zOrder.low)
            this.addChild(f.layer.river, f.zOrder.low)
            this.addChild(f.layer.enemy, f.zOrder.medium)
            this.addChild(f.layer.char, f.zOrder.low)
        }
    })
})()
