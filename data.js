/** Parts data. In order from back to front */
const parts = {
    background: [
        'sky',
        'cloudy',
        'dusk',
        'library',
        'themery',
        'carrot pile',
        'classic',
        'night alt',
        'space',
        'brick wall',
        'brick wall blue',
        'mushroom land',
        'classic (snow)',
        'cloudless',
        {
            id: 'custom sky',
            color_default: '#888888',
            color_pixels: [
                [0, 0, 32, 32]
            ],
            color_mode: 'before',
        },
        {
            id: 'solid color',
            color_default: '#888888',
            color_pixels: [
                [0, 0, 32, 32]
            ],
        },
        {
            id: 'textured color',
            color_default: '#888888',
            color_pixels: [
                [0, 0, 32, 32]
            ],
            color_mode: 'before',
        },
    ],
    midground: [
        'none',
        'blacksmith',
        'shop',
        'carrot pile',
        'snow',
    ],
    body: [
        {
            id: 'bill',
            color_default: '#3851bf',
            color_pixels: [
                [9, 22, 1, 10],
                [22, 22, 1, 10],
            ],
        },
        {
            id: 'belle',
            color_default: '#3851bf',
            color_pixels: [
                [9, 22, 1, 10],
                [22, 22, 1, 10],
            ],
        },
        {
            id: 'greg',
            color_default: '#3851bf',
            color_pixels: [
                [10, 22, 1, 10],
                [20, 22, 1, 10],
            ],
        },
        {
            id: 'charles',
            color_default: '#3851bf',
            color_pixels: [
                [14, 20, 1,  9],
                [15, 20, 1, 10],
                [14, 20, 1,  1, '#000000', 0.12],
                [15, 20, 1,  2, '#000000', 0.12],
                [15, 24, 1,  2, '#000000', 0.12],
                [15, 27, 1,  1, '#000000', 0.12],
            ],
            head_offset: {x:0, y:-2},
        },
        'carl',
        'jared',
        {
            id: 'suit',
            color_default: '#202224',
            color_pixels: [
                [13, 22, 2, 3],
                [15, 23, 1, 1],
                [16, 22, 2, 3],
            ],
        },
        'jokester',
        'black shirt',
        'leather jacket',
        'ugly sweater',
        'blue suit',
        'high vis',
        'chef',
        'sweater',
    ],
    head: [
        'bill',
        'belle',
        'greg',
        {
            id: 'charles',
            headwear_offset: {x:0, y:3},
            // filter: 'brightness(50%)',
        },
        {
            id: 'carl',
            headwear_offset: {x:0, y:2}
        },
        {
            id: 'jared',
            headwear_offset: {x:0, y:2}
        },
    ],
    hair: [
        'none',
        'bill',
        'bill messy',
        'belle',
        'greg',
        'charles',
        'carl',
        'jared',
        {
            id: 'hair loss',
            color_default: '#594326',
            color_pixels: [
                [7, 8, 2,  1],
                [6, 9, 2,  1],

                [11, 8, 1,  1],
                [20, 8, 2,  1],

                [23, 8, 2,  1],
                [24, 9, 2,  1],
            ],
        },
        'belle (white)',
    ],
    mouth: [
        'none',
        'bill',
        'belle',
        'greg',
        'charles',
        'carl',
        'jared',
        'mouth 1',
        'mouth 2',
        'mouth 3',
        'mouth 4',
    ],
    nose: [
        'none',
        'nose 1', // bill belle greg
        'nose 2',
        'nose 3',
        'nose 4',
        'nose 5',
        'nose 6',
        'nose 7',
        'nose 8',
        'nose 9',
        'carl',   // carl
        'jared',  // jared
    ],
    eyes: [
        'none',
        {
            id: 'bill',
            color_default: '#0db8ff',
            color_pixels: [
                [11, 10],
                [20, 10],
            ],
        },
        {
            id: 'belle',
            color_default: '#88e543',
            color_pixels: [
                [11, 10],
                [20, 10],
            ],
        },
        {
            id: 'greg',
            color_default: '#ab5309',
            color_pixels: [
                [11, 10],
                [21, 10],
            ],
        },
        {
            id: 'charles',
            color_default: '#e7a5fb',
            color_pixels: [
                [12, 14],
                [18, 14],
            ],
        },
        {
            id: 'carl',
            color_default: '#e7a5fb',
            color_pixels: [
                [10, 13],
                [19, 13],
            ],
        },
        {
            id: 'jared',
            color_default: '#b441b1',
            color_pixels: [
                [12, 12],
                [17, 12],
            ],
        },
    ],
    hat: [
        'none',
        {
            id: 'bill',
            color_default: '#ab3a47',
            color_pixels: [
                [ 8,  6, 16, 1],
                [10,  6, 2, 1, '#ffffff', 0.25],
                [14, 6, 1, 1, '#ffffff', 0.25],
            ],
        },
        'belle',
        'greg',
        'charles',
        'charles xl',
        'carl',
        'jared',
        {
            id: 'top hat',
            color_default: '#292c30',
            color_pixels: [
                [ 9,  5, 14, 1],
                [10,  5,  5, 1, '#ffffff', 0.15],
                [16,  5,  2, 1, '#ffffff', 0.15],
                [21,  5,  1, 1, '#ffffff', 0.15],
            ],
        },
        'biker helmet',
        'hat stack',
        'chef hat',
    ],
    accessory: [ // #44474c
        'none',
        'jared beard',
        {
            id: 'glasses',
            color_default: '#3851bf',
            color_pixels: [
                [ 9, 10, 1, 2],
                [10, 12, 3, 1],
                [13, 10, 1, 2],

                [ 18, 10, 1, 2],
                [19, 12, 3, 1],
                [22, 10, 1, 2],
            ],
        },
        'glasses (alt)',
        {
            id: 'sunglasses',
            color_default: '#3851bf',
            color_pixels: [
                [ 9, 10, 5, 2],
                [10, 12, 3, 1],
                [11, 10, 2, 1, '#ffffff', 0.5],
                [10, 11, 2, 1, '#ffffff', 0.5],
                [10, 12, 1, 1, '#ffffff', 0.5],

                [18, 10, 5, 2],
                [19, 12, 3, 1],
                [20, 10, 2, 1, '#ffffff', 0.5],
                [19, 11, 2, 1, '#ffffff', 0.5],
                [19, 12, 1, 1, '#ffffff', 0.5],
            ],
        },
        {
            id: 'scarf',
            // color_default: '#464646',
            // color_pixels: [
            //     [0, 2, 2, 2],
            //     [ 8, 20, 4, 3],
            //     [9, 21, 14, 3],
            //     [ 20, 20, 4, 3],
            // ],
        },
        {
            id: 'monocle',
            // color_default: '#3851bf',
            // color_pixels: [],
        },
        'dollar necklace',
        {
            id: 'bow tie',
            color_default: '#202224',
            color_pixels: [
                [13, 22, 2, 3],
                [15, 23, 1, 1],
                [16, 22, 2, 3],
            ],
        },
    ],
    foreground: [
        'none',
        'carrot pile',
        'bill buddy',
    ],
}

/** What configuration options are available and what they default to */
const part_data = {
    background: {
        color: true,
        color_default: '#888888',
    },
    midground: {},

    body: {
        color: true,
    },
    head: {},
    hair: {
        color: true,
        position: true,
    },
    eyes: {
        color: true,
        color_default: '#0db8ff',
        position: true,
    },
    mouth: {
        position: true,
    },
    nose: {
        position: true,
    },
    hat: {
        color: true,
        position: true,
    },
    accessory: {
        color: true,
        position: true,
        allow_multiple: true,
    },
    foreground: {},
}




/** Presets */
const presets = {
    'Bill': {
        background: 0,
        midground:  0,

        body:       0,
        head:       0,
        hair:       8,
        eyes:       1,
        mouth:      1,
        nose:       1,
        hat:        1,
        accessory:  0,
        foreground: 0,
    },
    'Belle': {
        background: 0,
        midground:  0,

        body:       1,
        head:       1,
        hair:       3,
        eyes:       2,
        mouth:      2,
        nose:       1,
        hat:        2,
        accessory:  0,
        foreground: 0,
    },
    'Greg': {
        background: 0,
        midground:  1,

        body:       2,
        head:       2,
        hair:       4,
        eyes:       3,
        mouth:      3,
        nose:       1,
        hat:        3,
        accessory:  0,
        foreground: 0,
    },
    'Charles': {
        background: 3,
        midground:  0,

        body:       3,
        head:       3,
        hair:       5,
        eyes:       4,
        mouth:      4,
        nose:       2,
        hat:        4,
        accessory:  0,
        foreground: 0,
    },
    'Carl': {
        background: 0,
        midground:  0,

        body:       4,
        head:       4,
        hair:       6,
        eyes:       5,
        mouth:      5,
        nose:      10,
        hat:        6,
        accessory:  0,
        foreground: 0,
    },
    'Jared': {
        background: 0,
        midground:  2,

        body:       5,
        head:       5,
        hair:       7,
        eyes:       6,
        mouth:      6,
        nose:      11,
        hat:        7,
        accessory:  1,
        foreground: 0,
    },
    'Fancy Bill': {
        "background": 0,
        "midground": 0,
        "body": 6,
        "head": 0,
        "hair": 1,
        "eyes": 1,
        "mouth": 1,
        "nose": 1,
        "hat": 8,
        "accessory": 0,
        "foreground": 0
    },
    'Biker Bill': {
        "background": 1,
        "midground": 0,
        "body": 9,
        "head": 0,
        "hair": 1,
        "eyes": 1,
        "mouth": 1,
        "nose": 1,
        "hat": 9,
        "accessory": 0,
        "foreground": 0
    },
    'Dollar Bill': {
        "background": 9,
        "midground": 0,
        "body": 9,
        "head": 0,
        "hair": 2,
        "eyes": 1,
        "mouth": 1,
        "nose": 1,
        "hat": 0,
        "accessory": 7,
        "foreground": 0
    },
    'Ugly Sweater Bill': {
        "background": 13,
        "midground": 4,
        "body": 10,
        "head": 0,
        "hair": 1,
        "eyes": 1,
        "mouth": 1,
        "nose": 1,
        "hat": 0,
        "accessory": 0,
        "foreground": 0
    },
    'Business Bill': {
        "background": 0,
        "midground": 0,
        "body": 11,
        "head": 0,
        "hair": 1,
        "eyes": 1,
        "mouth": 1,
        "nose": 1,
        "hat": 0,
        "accessory": 0,
        "foreground": 0
    },
    'Baker Bill': {
        "background": 0,
        "midground": 0,
        "body": 13,
        "head": 0,
        "hair": 8,
        "eyes": 1,
        "mouth": 1,
        "nose": 1,
        "hat": 11,
        "accessory": 0,
        "foreground": 0
    },
    'Grandma Belle': {
        "background": 0,
        "midground": 0,
        "body": 14,
        "head": 1,
        "hair": 9,
        "eyes": 2,
        "mouth": 2,
        "nose": 1,
        "hat": 0,
        "accessory": 3,
        "foreground": 0
    },
    'Safety Greg': {
        "background": 0,
        "midground": 0,
        "body": 12,
        "head": 2,
        "hair": 4,
        "eyes": 3,
        "mouth": 3,
        "nose": 1,
        "hat": 3,
        "accessory": 0,
        "foreground": 0
    },
}