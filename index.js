// Canvas
var c = dom('canvas');
var ctx;
var src_size = 32;
var size = c.width;
var times = size / src_size; // Canvas is 16x larger than assets

let images_loaded = false;

// Data
// In order, back to front
const parts = {
    background: [
        {
            id: 'sky',
            color_default: '#000000',
            color_pixels: [],
        },
        {
            id: 'cloudy',
            color_default: '#000000',
            color_pixels: [],
        },
        {
            id: 'dusk',
            color_default: '#000000',
            color_pixels: [],
        },
        {
            id: 'library',
            color_default: '#000000',
            color_pixels: [],
        },
        // {
        //     id: 'solid color',
        //     color_default: '#888888',
        //     color_pixels: [
        //         [0, 0, 32, 32]
        //     ],
        // },
    ],
    midground: [
        'blacksmith',
        'shop',
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
                [14, 22, 1, 7],
                [15, 22, 1, 8],
                [15, 24, 1, 2, '#000000', 0.12],
                [15, 27, 1, 1, '#000000', 0.12],
            ],
        },
        {
            id: 'carl',
            color_default: '#000000',
            color_pixels: [],
        },
    ],
    head: [
        'bill',
        'belle',
        'greg',
        'charles',
        'carl',
    ],
    eyes: [
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
                [12, 12],
                [18, 12],
            ],
        },
    ],
    mouth: [
        'bill',
        'belle',
        'greg',
        'charles',
        'carl',
    ],
    nose: [
        'nose 1', // bill belle greg
        'nose 2',
        'nose 3',
        'nose 4',
        'nose 5',
        'nose 6',
        'nose 7',
        'carl',
    ],
    headwear: [
        'none',
        'bill',
        'belle',
        'greg',
    ],
    accessory: [ // #44474c
        {
            id: 'sunglasses',
            color_default: '#3851bf',
            color_pixels: [
                [14, 22, 1, 7],
                [15, 22, 1, 8],
                [15, 24, 1, 2, '#000000', 0.12],
                [15, 27, 1, 1, '#000000', 0.12],
            ],
        },
        {
            id: 'scarf',
            color_default: '#3851bf',
            color_pixels: [],
        },
        {
            id: 'monocle',
            color_default: '#3851bf',
            color_pixels: [],
        },
    ],
}
const part_data = {
    background: {
        // color: true,
    },
    midground: {},

    body: {
        color: true,
    },
    head: {},
    eyes: {
        color: true,
        color_default: '#0db8ff',
    },
    mouth: {},
    nose: {},
    headwear: {},
    accessory: {},
}
var user = {
    part: {
        background: 0,
        midground:  undefined,

        body:       0,
        head:       0,
        eyes:       0,
        mouth:      0,
        nose:       0,
        headwear:   1,
        accessory:  undefined,
    },
    color: {}
}
let keys = Object.keys(parts);

/** Get image SRC */
function getSRC(type, name) { return `./assets/${type}/${name}.png`}
/** Get item filename */
function itemID(item) { return typeof item == 'object' ? item.id : item; }

/** Populate parts list(s) */
function populate(type) {
    console.log(`Populating: ${type}`);
    let html = '<div class="flex">';
    let list = parts[type];
    for(i = 0; i < list.length; i++) {
        let item = list[i];
        let name = itemID(item);
        html +=
        `
        <figure class="part part_${type}" id="part_${type}_${name}" onclick="equip('${type}', ${i})">
            <img src="./assets/${type}/${name}.png" alt="${name}" class="part_img">
            <figcaption>${capitalizeFL(name)}</figcaption>
        </figure>
        `;
    }

    let container = dom(`parts_${type}`);
    if(container == null) return console.warn('null element');
    html += `</div>`;
    container.innerHTML = html;

    // Color picker
    if(part_data[type].color == true) {
        container.innerHTML += `
        <div class="customize_item flex">
            <h4>${capitalizeFL(type)} Color:</h4>
            <input type="color" name="${type}_color" id="${type}_color">
        </div>`;
        dom(`${type}_color`).addEventListener('input', event => {
            user.color[type] = event.srcElement.value;
            fullDraw();
        });
    }
}

/** Equip part */
function equip(type, num) {
    console.log(type, num);
    if(user.part[type] == num) return;
    user.part[type] = num;
    document.querySelectorAll(`.part_${type}`).forEach(element => element.classList.remove('active'));
    dom(`part_${type}_${parts[type][num]}`)?.classList.add('active');
    fullDraw();
}

/** Draw all selected */
function fullDraw() {
    for(i = 0; i < keys.length; i++) {
        let type = keys[i];
        let num = user.part[type];
        let item = parts[type][num];
        let name = itemID(item); // Get ID
        draw(type, name, num);
        if(part_data[type].color) {
            drawColor(type, user.part[type]);
        }
    }
    images_loaded = true;
}

/** Draw */
function draw(type, name, num, offset) {
    // console.log(`Drawing ${type}: ${name}`);
    if(type == undefined || name == undefined) return console.warn(`Invalid part type or name. Type: ${type} Name: ${name}`);

    let [x, y] = offset || [0, 0];
    x*=times;
    y*=times;

    // Get image
    var img = new Image();
    img.src = getSRC(type, name);

    // Draw
    if(images_loaded) d();
    else img.onload = d;

    if(part_data[type].color == true) drawColor(type, num);

    function d() { ctx.drawImage(img, x, y, size, size); }
}
/** Draw rectangle */
function drawColor(type, num) {
    let pixels = parts[type][num].color_pixels;
    let color = user['color'][type];
    if(color == undefined) return;

    for(let i = 0; i < pixels.length; i++) {
        let pix = pixels[i];
        let [x, y, w, h, color_override, alpha] = pix;
        console.log(pix);
        ctx.fillStyle = color_override || color || 'gray';
        ctx.globalAlpha = alpha || 1;
        ctx.fillRect(x*times, y*times, (w||1)*times, (h||1)*times);
        ctx.globalAlpha = 1;
    }
}

// UI
var current_tab = 'background';
/** Tab */
function tab(choice, state=true) {
    if(choice == current_tab && state) return;

    store('character_creator_tab', choice);

    let button = dom(`tab_${choice}`);
    let content = dom(`parts_${choice}`);
    style(button, 'active_tab', state);
    style(content, 'active_tab', state);

    if(state) tab(current_tab, false);
    current_tab = choice;
}


// Keyboard shortcuts
document.addEventListener('keydown', event => {
    let key = Number(event.key);
    if(key == 0) key = 10;
    if(key != NaN) tab(keys[key - 1]);
})


// On page load
window.onload = () => {
    for(let i = 0; i < keys.length; i++) {
        try { populate(keys[i]); }
        catch (error) { console.error(error); }
        if(i > 32) return console.error("Killing for loop: exceeded 32");
    }

    // Setup
    ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    fullDraw();

    // localStorage
    // let stored_tab = store('character_creator_tab');
    // if(stored_tab != null) tab(stored_tab, false);
}