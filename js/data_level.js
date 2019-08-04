/*

river_config
    used by river_and_pad.js
    R

pad_config
    used by river_and_pad.js
    R

char_config
    used by char.js
    R
    additional properties:
        f.data.level[current_level].char_config.turtle_left.sprite = null

trap_config
    used by enemy.js
    R

rocket_config
    used by enemy.js
    R
    duration is per update frame
    e.g duration 1 equal 60 pixel per second
*/

f.data.level = []

f.data.level[1] = {
    id: 1,
    title: "Learn to Jump",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 7 },
        turtle_right: { left_or_right: 'right', col: 10, row: 7 }
    },
    river_config: [
        { scrollSpeed: 1, direction: 'up' },
        { scrollSpeed: 1, direction: 'up' },
        { scrollSpeed: 1, direction: 'up' },
        { scrollSpeed: 1, direction: 'up' }
    ],
    pad_config: [
        { row: 2, delay: 0.7 },
        { row: 6, delay: 0.7 },
        { row: 8, delay: 0.7 },
        { row: 4, delay: 0.7 }
    ],
    trap_config: [],
    rocket_config: []
}

f.data.level[2] = {
    id: 2,
    title: "Learn to Jump #2",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 10 },
        turtle_right: { left_or_right: 'right', col: 10, row: 4 }
    },
    river_config: [
        { scrollSpeed: 1, direction: 'up' },
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'up' }
    ],
    pad_config: [
        { row: 6, delay: 0.7 },
        { row: 10, delay: 0.7 },
        { row: 2, delay: 0.7 },
        { row: 10, delay: 0.7 }
    ],
    trap_config: [
        { row: 2, col: 3 },
        { row: 4, col: 3 },
        { row: 6, col: 3 },
        { row: 8, col: 3 },
        { row: 10, col: 3 },
        { row: 12, col: 3 },
        { row: 1, col: 5 },
        { row: 3, col: 5 },
        { row: 5, col: 5 },
        { row: 7, col: 5 },
        { row: 9, col: 5 },
        { row: 11, col: 5 },
        { row: 13, col: 5 },
        { row: 2, col: 8 },
        { row: 4, col: 8 },
        { row: 6, col: 8 },
        { row: 8, col: 8 },
        { row: 10, col: 8 },
        { row: 12, col: 8 },
        { row: 1, col: 6 },
        { row: 3, col: 6 },
        { row: 5, col: 6 },
        { row: 7, col: 6 },
        { row: 9, col: 6 },
        { row: 11, col: 6 },
        { row: 13, col: 5 }
    ],
    rocket_config: []
}

f.data.level[3] = {
    id: 3,
    title: "There Are Rocket Next to You",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 2 },
        turtle_right: { left_or_right: 'right', col: 10, row: 12 }
    },
    river_config: [
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'up' },
        { scrollSpeed: 1, direction: 'up' }
    ],
    pad_config: [
        { row: 10, delay: 0.7 },
        { row: 6, delay: 0.7 },
        { row: 10, delay: 0.7 },
        { row: 2, delay: 0.7 }
    ],
    trap_config: [
        { row: 6, col: 3 },
        { row: 7, col: 3 },
        { row: 8, col: 3 },
        { row: 9, col: 3 },
        { row: 10, col: 3 },
        { row: 11, col: 3 },
        { row: 12, col: 3 },
        { row: 13, col: 3 },
        { row: 1, col: 5 },
        { row: 2, col: 5 },
        { row: 3, col: 5 },
        { row: 4, col: 5 },
        { row: 5, col: 5 },
        { row: 7, col: 5 },
        { row: 8, col: 5 },
        { row: 9, col: 5 },
        { row: 10, col: 5 },
        { row: 11, col: 5 },
        { row: 12, col: 5 },
        { row: 13, col: 5 },
        { row: 1, col: 8 },
        { row: 2, col: 8 },
        { row: 3, col: 8 },
        { row: 4, col: 8 },
        { row: 5, col: 8 },
        { row: 6, col: 8 },
        { row: 7, col: 8 },
        { row: 1, col: 6 },
        { row: 2, col: 6 },
        { row: 3, col: 6 },
        { row: 4, col: 6 },
        { row: 5, col: 6 },
        { row: 7, col: 6 },
        { row: 8, col: 6 },
        { row: 9, col: 6 },
        { row: 10, col: 6 },
        { row: 11, col: 6 },
        { row: 12, col: 6 },
        { row: 13, col: 6 },
    ],
    rocket_config: [
        {
            col: 3,
            direction: 'up',
            delay: 3
        },
        {
            col: 8,
            direction: 'down',
            delay: 5
        },
    ]
}

f.data.level[4] = {
    id: 4,
    title: "Stairway To Hell",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 13 },
        turtle_right: { left_or_right: 'right', col: 10, row: 1 }
    },
    river_config: [
        { scrollSpeed: 1.5, direction: 'up' },
        { scrollSpeed: 1.5, direction: 'up' },
        { scrollSpeed: 1.5, direction: 'down' },
        { scrollSpeed: 1.5, direction: 'down' }
    ],
    pad_config: [
        { row: 5, delay: 0.65 },
        { row: 6, delay: 0.65 },
        { row: 8, delay: 0.65 },
        { row: 10, delay: 0.65 }
    ],
    trap_config: [
        { row: 1, col: 3 },
        { row: 2, col: 3 },
        { row: 3, col: 3 },
        { row: 4, col: 3 },
        { row: 5, col: 3 },
        { row: 6, col: 3 },
        { row: 7, col: 3 },
        { row: 8, col: 3 },
        { row: 10, col: 3 },
        { row: 11, col: 3 },
        { row: 12, col: 3 },
        { row: 13, col: 3 },
        { row: 1, col: 5 },
        { row: 2, col: 5 },
        { row: 3, col: 5 },
        { row: 4, col: 5 },
        { row: 5, col: 5 },
        { row: 7, col: 5 },
        { row: 8, col: 5 },
        { row: 9, col: 5 },
        { row: 10, col: 5 },
        { row: 11, col: 5 },
        { row: 12, col: 5 },
        { row: 13, col: 5 },
        { row: 1, col: 8 },
        { row: 2, col: 8 },
        { row: 4, col: 8 },
        { row: 5, col: 8 },
        { row: 6, col: 8 },
        { row: 7, col: 8 },
        { row: 8, col: 8 },
        { row: 9, col: 8 },
        { row: 10, col: 8 },
        { row: 11, col: 8 },
        { row: 12, col: 8 },
        { row: 13, col: 8 },
        { row: 1, col: 6 },
        { row: 2, col: 6 },
        { row: 3, col: 6 },
        { row: 4, col: 6 },
        { row: 6, col: 6 },
        { row: 7, col: 6 },
        { row: 8, col: 6 },
        { row: 9, col: 6 },
        { row: 10, col: 6 },
        { row: 11, col: 6 },
        { row: 12, col: 6 },
        { row: 13, col: 6 },
    ],
    rocket_config: [
        { col: 1, direction: 'down', delay: 3 },
        { col: 3, direction: 'down', delay: 2 },
        { col: 8, direction: 'down', delay: 2 },
        { col: 10, direction: 'up', delay: 7 },
    ]
}

f.data.level[5] = {
    id: 5,
    title: "Kick and Rush",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 6 },
        turtle_right: { left_or_right: 'right', col: 10, row: 6 }
    },
    river_config: [
        { scrollSpeed: 1.2, direction: 'down' },
        { scrollSpeed: 1.2, direction: 'down' },
        { scrollSpeed: 1.2, direction: 'down' },
        { scrollSpeed: 1.2, direction: 'down' }
    ],
    pad_config: [
        { row: 10, delay: 0.7 },
        { row: 10, delay: 0.7 },
        { row: 2, delay: 0.7 },
        { row: 2, delay: 0.7 }
    ],
    trap_config: [],
    rocket_config: [
        { col: 1, direction: 'down', delay: 6 },
        { col: 3, direction: 'down', delay: 1 },
        { col: 8, direction: 'down', delay: 1 },
        { col: 10, direction: 'down', delay: 3 },
    ]
}

f.data.level[6] = {
    id: 6,
    title: "The Pianist",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 4 },
        turtle_right: { left_or_right: 'right', col: 10, row: 4 }
    },
    river_config: [
        { scrollSpeed: 1.7, direction: 'down' },
        { scrollSpeed: 1.7, direction: 'up' },
        { scrollSpeed: 1.7, direction: 'up' },
        { scrollSpeed: 1.7, direction: 'down' }
    ],
    pad_config: [
        { row: 10, delay: 0.7 },
        { row: 13, delay: 0.7 },
        { row: 1, delay: 0.7 },
        { row: 9, delay: 0.7 }
    ],
    trap_config: [],
    rocket_config: [
        { col: 1, direction: 'up', delay: 5 },
        { col: 3, direction: 'up', delay: 1 },
        { col: 8, direction: 'up', delay: 1 },
        { col: 10, direction: 'up', delay: 7 },
    ]
}

f.data.level[7] = {
    id: 7,
    title: "Lady Turtle First",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 11 },
        turtle_right: { left_or_right: 'right', col: 10, row: 11 }
    },
    river_config: [
        { scrollSpeed: 1.7, direction: 'up' },
        { scrollSpeed: 1.7, direction: 'up' },
        { scrollSpeed: 1.7, direction: 'up' },
        { scrollSpeed: 1.7, direction: 'up' }
    ],
    pad_config: [
        { row: 10, delay: 0.6 },
        { row: 13, delay: 0.6 },
        { row: 4, delay: 0.6 },
        { row: 2, delay: 0.6 }
    ],
    trap_config: [
        { row: 1, col: 8 },
        { row: 2, col: 8 },
        { row: 3, col: 8 },
        { row: 4, col: 8 },
        { row: 5, col: 8 },
        { row: 6, col: 8 },
        { row: 7, col: 8 },
        { row: 8, col: 8 },
        { row: 10, col: 8 },
        { row: 11, col: 8 },
        { row: 12, col: 8 },
        { row: 13, col: 8 },
        { row: 2, col: 6 },
        { row: 3, col: 6 },
        { row: 4, col: 6 },
        { row: 5, col: 6 },
        { row: 6, col: 6 },
        { row: 7, col: 6 },
        { row: 8, col: 6 },
        { row: 9, col: 6 },
        { row: 10, col: 6 },
        { row: 11, col: 6 },
        { row: 12, col: 6 },
        { row: 13, col: 6 },
    ],
    rocket_config: [
        { col: 1, direction: 'down', delay: 7 },
        { col: 3, direction: 'down', delay: 1 },
        { col: 7, direction: 'up', delay: 4 },
        { col: 8, direction: 'down', delay: 1 },
        { col: 9, direction: 'down', delay: 2 },
        { col: 10, direction: 'down', delay: 3 },
    ]
}

f.data.level[8] = {
    id: 8,
    title: "Waiting In Vain",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 4 },
        turtle_right: { left_or_right: 'right', col: 10, row: 8 }
    },
    river_config: [
        { scrollSpeed: 0.5, direction: 'down' },
        { scrollSpeed: 0.5, direction: 'down' },
        { scrollSpeed: 0.5, direction: 'up' },
        { scrollSpeed: 0.5, direction: 'up' }
    ],
    pad_config: [
        { row: 10, delay: 0.5 },
        { row: 8, delay: 0.2 },
        { row: 4, delay: 0.2 },
        { row: 2, delay: 0.5 }
    ],
    trap_config: [
        { row: 1, col: 5 },
        { row: 3, col: 5 },
        { row: 4, col: 5 },
        { row: 5, col: 5 },
        { row: 6, col: 5 },
        { row: 7, col: 5 },
        { row: 8, col: 5 },
        { row: 9, col: 5 },
        { row: 10, col: 5 },
        { row: 11, col: 5 },
        { row: 12, col: 5 },
        { row: 13, col: 5 },
        { row: 1, col: 6 },
        { row: 2, col: 6 },
        { row: 3, col: 6 },
        { row: 4, col: 6 },
        { row: 5, col: 6 },
        { row: 6, col: 6 },
        { row: 7, col: 6 },
        { row: 8, col: 6 },
        { row: 9, col: 6 },
        { row: 10, col: 6 },
        { row: 11, col: 6 },
        { row: 13, col: 6 },
    ],
    rocket_config: [
        { col: 1, direction: 'up', delay: 3 },
        { col: 3, direction: 'down', delay: 3 },
        { col: 8, direction: 'down', delay: 3 },
        { col: 10, direction: 'down', delay: 3 },
    ]
}

f.data.level[9] = {
    id: 9,
    title: "Dash dash dash",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 7 },
        turtle_right: { left_or_right: 'right', col: 10, row: 7 }
    },
    river_config: [
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'down' },
        { scrollSpeed: 1, direction: 'down' }
    ],
    pad_config: [
        { row: 5, delay: 0.7 },
        { row: 3, delay: 0.7 },
        { row: 8, delay: 0.7 },
        { row: 2, delay: 0.7 }
    ],
    trap_config: [
        {row: 1, col: 3 },
        {row: 2, col: 3 },
        {row: 3, col: 3 },
        {row: 4, col: 3 },
        {row: 5, col: 3 },
        {row: 6, col: 3 },
        {row: 7, col: 3 },
        {row: 8, col: 3 },
        {row: 10, col: 3 },
        {row: 11, col: 3 },
        {row: 12, col: 3 },
        {row: 13, col: 3 },
        {row: 9, col: 5 },
        {row: 7, col: 6 },
        {row: 2, col: 8 },
        {row: 3, col: 8 },
        {row: 4, col: 8 },
        {row: 5, col: 8 },
        {row: 6, col: 8 },
        {row: 7, col: 8 },
        {row: 8, col: 8 }
    ],
    rocket_config: [
        { col: 1, direction: 'up', delay: 3 },
        { col: 2, direction: 'up', delay: 4 },
        { col: 3, direction: 'up', delay: 2 },
        { col: 8, direction: 'down', delay: 4 },
        { col: 10, direction: 'down', delay: 4 }
    ]
}

f.data.level[10] = {
    id: 10,
    title: "Tap Fast Enough",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 6 },
        turtle_right: { left_or_right: 'right', col: 10, row: 6 }
    },
    river_config: [
        { scrollSpeed: 3.5, direction: 'up' },
        { scrollSpeed: 3.5, direction: 'up' },
        { scrollSpeed: 3.5, direction: 'up' },
        { scrollSpeed: 3.5, direction: 'up' }
    ],
    pad_config: [
        { row: 5, delay: 0.1 },
        { row: 5, delay: 0.1 },
        { row: 5, delay: 0.1 },
        { row: 5, delay: 0.1 }
    ],
    trap_config: [],
    rocket_config: []
}

f.data.level[11] = {
    id: 11,
    title: "They Appears Suddenly",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 1 },
        turtle_right: { left_or_right: 'right', col: 10, row: 13 }
    },
    river_config: [
        { scrollSpeed: 6, direction: 'down' },
        { scrollSpeed: 6, direction: 'up' },
        { scrollSpeed: 6, direction: 'down' },
        { scrollSpeed: 6, direction: 'up' }
    ],
    pad_config: [
        { row: 5, delay: 0.09 },
        { row: 5, delay: 0.09 },
        { row: 5, delay: 0.09 },
        { row: 5, delay: 0.09 }
    ],
    trap_config: [
        {row: 1, col: 3 },
        {row: 3, col: 3 },
        {row: 5, col: 3 },
        {row: 7, col: 3 },
        {row: 9, col: 3 },
        {row: 11, col: 3 },
        {row: 13, col: 3 },
        {row: 1, col: 8 },
        {row: 3, col: 8 },
        {row: 5, col: 8 },
        {row: 7, col: 8 },
        {row: 9, col: 8 },
        {row: 11, col: 8 },
        {row: 13, col: 8 },
    ],
    rocket_config: [
        { col: 1, direction: 'up', delay: 10 },
        { col: 2, direction: 'up', delay: 10 },
        { col: 3, direction: 'up', delay: 10 },
        { col: 4, direction: 'up', delay: 10 },
        { col: 7, direction: 'down', delay: 10 },
        { col: 8, direction: 'down', delay: 10 },
        { col: 9, direction: 'down', delay: 10 },
        { col: 10, direction: 'down', delay: 10 },
    ]
}

f.data.level[12] = {
    id: 12,
    title: "Good Game Well Played",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 4 },
        turtle_right: { left_or_right: 'right', col: 10, row: 6 }
    },
    river_config: [
        { scrollSpeed: 1, direction: 'up' },
        { scrollSpeed: 6, direction: 'down' },
        { scrollSpeed: 6, direction: 'down' },
        { scrollSpeed: 1, direction: 'up' }
    ],
    pad_config: [
        { row: 5, delay: 0.2 },
        { row: 5, delay: 0.06 },
        { row: 5, delay: 0.06 },
        { row: 5, delay: 0.2 }
    ],
    trap_config: [
        {row: 1, col: 3 },
        {row: 2, col: 3 },
        {row: 3, col: 3 },
        {row: 4, col: 3 },
        {row: 5, col: 3 },
        {row: 7, col: 3 },
        {row: 8, col: 3 },
        {row: 9, col: 3 },
        {row: 10, col: 3 },
        {row: 11, col: 3 },
        {row: 12, col: 3 },
        {row: 13, col: 3 },
        {row: 1, col: 5 },
        {row: 2, col: 5 },
        {row: 3, col: 5 },
        {row: 4, col: 5 },
        {row: 5, col: 5 },
        {row: 6, col: 5 },
        {row: 7, col: 5 },
        {row: 8, col: 5 },
        {row: 9, col: 5 },
        {row: 10, col: 5 },
        {row: 12, col: 5 },
        {row: 13, col: 5 },
        {row: 1, col: 8 },
        {row: 2, col: 8 },
        {row: 3, col: 8 },
        {row: 4, col: 8 },
        {row: 5, col: 8 },
        {row: 7, col: 8 },
        {row: 8, col: 8 },
        {row: 9, col: 8 },
        {row: 10, col: 8 },
        {row: 11, col: 8 },
        {row: 12, col: 8 },
        {row: 13, col: 8 },
        {row: 1, col: 6 },
        {row: 2, col: 6 },
        {row: 3, col: 6 },
        {row: 4, col: 6 },
        {row: 5, col: 6 },
        {row: 6, col: 6 },
        {row: 7, col: 6 },
        {row: 8, col: 6 },
        {row: 9, col: 6 },
        {row: 10, col: 6 },
        {row: 12, col: 6 },
        {row: 13, col: 6 },
    ],
    rocket_config: [
        { col: 1, direction: 'up', delay: 10 },
        { col: 2, direction: 'up', delay: 10 },
        { col: 3, direction: 'up', delay: 10 },
        { col: 4, direction: 'up', delay: 10 },
        { col: 7, direction: 'down', delay: 10 },
        { col: 8, direction: 'down', delay: 10 },
        { col: 9, direction: 'down', delay: 10 },
        { col: 10, direction: 'down', delay: 10 },
    ]
}

f.data.level[13] = {
    id: 13,
    title: "Near Impossible",
    river: "default",
    trap: "default",
    rocket: "default",
    char_config: {
        turtle_left: { left_or_right: 'left', col: 1, row: 6 },
        turtle_right: { left_or_right: 'right', col: 10, row: 6 }
    },
    river_config: [
        { scrollSpeed: 0.3, direction: 'up' },
        { scrollSpeed: 0.3, direction: 'down' },
        { scrollSpeed: 0.3, direction: 'up' },
        { scrollSpeed: 0.3, direction: 'down' }
    ],
    pad_config: [
        { row: 1, delay: 0.05 },
        { row: 2, delay: 0.05 },
        { row: 3, delay: 0.05 },
        { row: 4, delay: 0.05 }
    ],
    trap_config: [],
    rocket_config: [
        { col: 1, direction: 'down', delay: 3 },
        { col: 2, direction: 'down', delay: 3 },
        { col: 3, direction: 'down', delay: 3 },
        { col: 4, direction: 'down', delay: 3 },
        { col: 7, direction: 'down', delay: 3 },
        { col: 8, direction: 'down', delay: 3 },
        { col: 9, direction: 'down', delay: 3 },
        { col: 10, direction: 'down', delay: 3 },
    ]
}
