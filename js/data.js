// ------------------------------------------------------------------------------------------------ data initialization
f.data.turtle_left = {}
f.data.turtle_right = {}
f.data.is_game_over = false // RW, used by gameover.js, input.js
f.data.char_stop = false // RW, used by char.js input.js
f.data.life_sprites = [] // RW

f.data.trap_pos = [] // structure of f.data.trap_pos is similar to f.data.pad_pos

// ------------------------------------------------------------------------------------------------ data fill

// used by river_and_pad.js
// RW
f.data.pad_pos = [
    {row: 0},
    {row: 0},
    {row: 0},
    {row: 0}
]

// used by char.js
// RW
f.data.turtle_left = {}

// used by char.js
// RW
f.data.turtle_right = {}

// ------------------------------------------------------------------------------------------------ module

f.data.charLevel = new GameData('char_level')
f.data.charLife = new GameData('char_life')
f.data.levelStat = new GameData('level_stat')
