// ------------------------------------------------------------------------------------------------ Expose
var g_resources = {},
    res = {}

// ------------------------------------------------------------------------------------------------ res
res.img = {
    pick_level_bottom_bg: 'res/turtle_crossing/pick_level_bottom_bg.png',
    pick_level_list_bg: 'res/turtle_crossing/pick_level_list_bg.png',
    pick_level_top_bg: 'res/turtle_crossing/pick_level_top_bg.png',
    pick_level_play_btn: 'res/turtle_crossing/pick_level_play_btn.png',
    play_again: 'res/turtle_crossing/play_again.png',
    play_again_selected: 'res/turtle_crossing/play_again_selected.png',
    exit: 'res/turtle_crossing/exit.png',
    exit_selected: 'res/turtle_crossing/exit_selected.png',
    pause: 'res/turtle_crossing/pause.png',
    rocket: 'res/turtle_crossing/rocket.png',
    trap_open_left: 'res/turtle_crossing/trap_open_left.png',
    trap_open_right: 'res/turtle_crossing/trap_open_right.png',
    trap_closed: 'res/turtle_crossing/trap_closed.png',
    life: 'res/turtle_crossing/life.png',
    screen_bg: 'res/turtle_crossing/screen_bg.png',
    right_screen: 'res/turtle_crossing/right_screen.png',
    river_up: 'res/turtle_crossing/river_up.png',
    river_down: 'res/turtle_crossing/river_down.png',
    foot_print: 'res/turtle_crossing/foot_print.png',
    foot_print_inverted: 'res/turtle_crossing/foot_print_inverted.png',
    turtle_head_forward: 'res/turtle_crossing/turtle_head_forward.png',
    turtle_inverted_head_forward: 'res/turtle_crossing/turtle_inverted_head_forward.png',
    turtle_inverted_pad: 'res/turtle_crossing/turtle_inverted_pad.png',
    turtle_inverted_stand: 'res/turtle_crossing/turtle_inverted_stand.png',
    turtle_inverted_walk: 'res/turtle_crossing/turtle_inverted_walk.png',
    turtle_pad: 'res/turtle_crossing/turtle_pad.png',
    turtle_stand: 'res/turtle_crossing/turtle_stand.png',
    turtle_walk: 'res/turtle_crossing/turtle_walk.png',
    splash_water: 'res/turtle_crossing/splash_water.png',
    gameover_bg: 'res/turtle_crossing/gameover_bg.png',
    walk_btn: 'res/turtle_crossing/walk_btn.png',
    walk_btn_selected: 'res/turtle_crossing/walk_btn_selected.png',
    mainscreen_bg: 'res/turtle_crossing/mainscreen_bg.png',
    mainscreen_play: 'res/turtle_crossing/mainscreen_play.png',
    mainscreen_play_selected: 'res/turtle_crossing/mainscreen_play_selected.png',
    pick_level_play_btn_selected: 'res/turtle_crossing/pick_level_play_btn_selected.png',
    level_finish_next_level_1: 'res/turtle_crossing/level_finish_next_level_1.png',
    level_finish_next_level_2: 'res/turtle_crossing/level_finish_next_level_2.png',
    level_finish_you_win: 'res/turtle_crossing/level_finish_you_win.png',
    level_finish_bg: 'res/turtle_crossing/level_finish_bg.png',
    game_txt: 'res/turtle_crossing/game_txt.png',
    over_txt: 'res/turtle_crossing/over_txt.png',
}

res.sound = {
    ok: 'res/audio/ok.wav',
    drown: 'res/audio/drown.wav',
    footstep_finish: 'res/audio/footstep_finish.wav',
    jump: 'res/audio/jump.wav',
    rocket_countdown: 'res/audio/rocket_countdown.wav',
    rocket_explode: 'res/audio/rocket_explode.wav',
    play_lawton: 'res/audio/music/play_lawton.mp3',
    play_tiktok: 'res/audio/music/play_tiktok.mp3',
}

res.particles = {
    rocket_explosion_plist: 'res/particles/rocket_explosion.plist',
    rocket_explosion_png: 'res/particles/rocket_explosion.png',
}

res.shader = {
    vertex: {
        default_native: 'res/shader/vertex/default_native.vsh',
        default_web: 'res/shader/vertex/default_web.vsh'
    },
    fragment: {
        screen_bg: 'res/shader/fragment/screen_bg.fsh'
    }
}

// ------------------------------------------------------------------------------------------------ resources

g_resources.mainscreen = [
    res.img.mainscreen_bg,
    res.img.mainscreen_play,
    res.shader.vertex.default_native,
    res.shader.vertex.default_web,
    res.shader.fragment.screen_bg,
    res.sound.play_lawton,
]

g_resources.pick_level = [
    res.img.pick_level_bottom_bg,
    res.img.pick_level_list_bg,
    res.img.pick_level_top_bg,
    res.img.pick_level_play_btn
]

g_resources.play = [
    res.img.exit,
    res.img.exit_selected,
    res.img.play_again,
    res.img.play_again_selected,
    res.img.rocket,
    res.img.pause,
    res.img.trap_open_left,
    res.img.trap_open_right,
    res.img.trap_closed,
    res.img.life,
    res.img.screen_bg,
    res.img.right_screen,
    res.img.river_up,
    res.img.river_down,
    res.img.foot_print,
    res.img.foot_print_inverted,
    res.img.turtle_head_forward,
    res.img.turtle_inverted_head_forward,
    res.img.turtle_inverted_pad,
    res.img.turtle_inverted_stand,
    res.img.turtle_inverted_walk,
    res.img.turtle_pad,
    res.img.turtle_stand,
    res.img.turtle_walk,
    res.img.splash_water,
    res.img.gameover_bg,
    res.img.walk_btn,
    res.img.walk_btn_selected,
    res.img.level_finish_next_level_1,
    res.img.level_finish_next_level_2,
    res.img.level_finish_you_win,
    res.img.level_finish_bg,
    res.img.game_txt,
    res.img.over_txt,
    res.sound.ok,
    res.sound.drown,
    res.sound.footstep_finish,
    res.sound.jump,
    res.sound.rocket_countdown,
    res.sound.rocket_explode,
    res.particles.rocket_explosion_plist,
    res.particles.rocket_explosion_png,
]

g_resources.test = [
    res.particles.rocket_explosion_plist,
    res.particles.rocket_explosion_png
]
