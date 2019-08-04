// ------------------------------------------------------------------------------------------------ Data

var projectContent = {
    'project_type': 'javascript',
    'debugMode' : 1,
    'showFPS' : false,
    'frameRate' : 60,
    'noCache' : true,
    'id' : 'gameCanvas',
    'renderMode' : 0,
    'engineDir':'frameworks/cocos2d-html5',
    'modules' : ['cocos2d', 'extensions'],
    'jsList' : [
        'js/preload.js',
        'js/helper.js',
        'js/class/sprite.js',
        'js/class/shader.js',
        'js/class/game_data.js',
        'js/data.js',
        'js/data_level.js',
        'js/resource.js',
        'js/mainscreen_scene/scene.js',
        'js/test_scene/scene.js',
        'js/pick_level_scene/scene.js',
        'js/play_scene/background.js',
        'js/play_scene/sidebar.js',
        'js/play_scene/world.js',
        'js/play_scene/char.js',
        'js/play_scene/enemy.js',
        'js/play_scene/level.js',
        'js/play_scene/river_and_pad.js',
        'js/play_scene/input.js',
        'js/play_scene/gameover.js',
        'js/play_scene/play.js'
    ]
}

// ------------------------------------------------------------------------------------------------ Code

const target = process.argv[2] // web|android
var fs = require('fs')

if(target === 'android') {
    var concat = require('concat-files')

    concat(projectContent.jsList, 'tmp/merged.js', function(err) {
        if(err) throw err

        projectContent.jsList = ['src/app_prod.js']
        writeFile()
    })
} else {
    writeFile()
}

function writeFile() {
    fs.writeFile('project.json', JSON.stringify(projectContent), function(err) {
        if(err) {
            return console.log(err)
        }

        console.log('finish setting up project')
    })
}

