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
        'sky',
        'cloudy',
        'dusk',
        'library',
        'themery',
        'carrot pile',
        'classic',
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
    ],
    head: [
        'bill',
        'belle',
        'greg',
        {
            id: 'charles',
            headwear_offset: {x:0, y:3}
        },
        {
            id: 'carl',
            headwear_offset: {x:0, y:2}
        },
    ],
    mouth: [
        'none',
        'bill',
        'belle',
        'greg',
        'charles',
        'carl',
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
        'carl',   // carl
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
                [12, 12],
                [18, 12],
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
    ],
    headwear: [
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
        'carl',
    ],
    accessory: [ // #44474c
        'none',
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
    ],
    foreground: [
        'none',
        'carrot pile',
        'bill buddy',
    ],
}
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
    headwear: {
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
var user = {
    part: {
        background: 0,
        midground:  0,

        body:       0,
        head:       0,
        eyes:       1,
        mouth:      1,
        nose:       1,
        headwear:   1,
        accessory:  0,
        foreground: 0,
    },
    color: {
        background: '#888888',
    },
    position: {
        background: {x:0,y:0},
        midground:  {x:0,y:0},

        body:       {x:0,y:0},
        head:       {x:0,y:0},
        eyes:       {x:0,y:0},
        mouth:      {x:0,y:0},
        nose:       {x:0,y:0},
        headwear:   {x:0,y:0},
        accessory:  {x:0,y:0},
        foreground: {x:0,y:0},
    }
}
let keys = Object.keys(parts);

/** Get image SRC */
function getSRC(type, name) { return name != 'none' ? `./assets/${type}/${name}.png` : './assets/none.png'; }
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
        let icons = `<img src="./assets/palette.svg" alt="Customizable" class="part_icon" title="Color options available">`;
        if(item.color_default == undefined) icons = '';
        html +=
        `
        <figure class="part part_${type} ${user.part[type] == i ? 'active' : ''}" id="part_${type}_${name}" onclick="equip('${type}', ${i})">
            <img src="${getSRC(type, name)}" alt="${name}" class="part_img">
            <figcaption>${capitalizeFL(name)}</figcaption>
            ${icons}
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
            <b>${capitalizeFL(type)} Color:</b>
            <input type="color" name="${type}_color" id="${type}_color">
            <button class="cc_reset_button button" onclick="resetCustom(${type}, 'color')">
                <p>Reset</p>
                <div class="button_shade"></div>
            </button>
        </div>`;
        dom(`${type}_color`).addEventListener('input', event => {
            user.color[type] = event.srcElement.value;
            fullDraw();
        });
    }
    if(part_data[type].position == true) {
        container.innerHTML += `
        <div class="customize_item flex">
        <b>${capitalizeFL(type)} Position:</b>
        <div class="position_container">
            <button class="${type}_position position_button pos_up no_styling" onclick="position('${type}', 'y', -1)">
                <div></div>
                <svg height="12" width="20"><polygon points="10,0 20,12 0,12"/></svg>
            </button>
            <button class="${type}_position position_button pos_left no_styling" onclick="position('${type}', 'x', -1)">
                <div></div>
                <svg height="12" width="20"><polygon points="10,0 20,12 0,12"/></svg>
            </button>
            <button class="${type}_position position_button pos_right no_styling" onclick="position('${type}', 'x', 1)">
                <div></div>
                <svg height="12" width="20"><polygon points="10,0 20,12 0,12"/></svg>
            </button>
            <button class="${type}_position position_button pos_down no_styling" onclick="position('${type}', 'y', 1)">
                <div></div>
                <svg height="12" width="20"><polygon points="10,0 20,12 0,12"/></svg>
            </button>
        </div>`;
        dom(`${type}_color`).addEventListener('input', event => {
            user.color[type] = event.srcElement.value;
            fullDraw();
        });
    }
}

function resetCustom(type, option) {
    console.log(type, option);
    let target = user?.[option]?.[type];
    if(target == undefined) return;
    target = undefined;
    dom(`${type}_${option}`).value = '#ff0000';
}

/** Equip part */
function equip(type, num) {
    console.log(type, num);
    if(user.part[type] == num) return;
    user.part[type] = num;
    document.querySelectorAll(`.part_${type}`).forEach(element => element.classList.remove('active'));
    console.log(`part_${type}_${itemID(parts[type][num])}`);
    dom(`part_${type}_${itemID(parts[type][num])}`)?.classList.add('active');
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
    }
    images_loaded = true;
}

/** Calculates a part's offset */
function getOffset(type) {
    let values = {x:0, y:0};
    // Head offset by body
    if(type == 'head' || type == 'eyes' || type == 'nose' || type == 'mouth' || type == 'headwear' || type == 'accessory') {
        let head_off = parts['body'][user.part.body].head_offset;
        if(head_off != undefined) {
            values.x = head_off.x || 0;
            values.y = head_off.y || 0;
        }
    }
    // Headwear offset by head
    if(type == 'headwear') {
        let headwear_off = parts['head'][user.part.head].headwear_offset;
        if(headwear_off != undefined) {
            values.x = headwear_off.x || 0;
            values.y = headwear_off.y || 0;
        }
    }
    return values;
}

/** Draw */
function draw(type, name, num, offset) {
    // console.log(`Drawing ${type}: ${name}`);
    if(type == undefined || name == undefined) return console.warn(`Invalid part type or name. Type: ${type} Name: ${name}`);

    let [x, y] = offset || [0, 0];

    // User offset
    x += user.position[type].x || 0;
    y += user.position[type].y || 0;

    // Part offset
    let part_off = getOffset(type);
    x += part_off.x;
    y += part_off.y;

    x*=times;
    y*=times;

    // Get image
    var img = new Image();
    img.src = getSRC(type, name);

    if(part_data[type].color && parts[type]?.[num]?.['color_mode'] == 'before') drawColor(type, user.part[type]); // Color before mode

    // Draw
    if(images_loaded) d();
    else img.onload = d;

    if(part_data[type].color && parts[type]?.[num]?.['color_mode'] != 'before') drawColor(type, num); // Color

    function d() { ctx.drawImage(img, x, y, size, size); }
}
/** Draw rectangle */
function drawColor(type, num) {
    let pixels = parts[type][num].color_pixels;
    let color = user['color'][type];
    if(color == undefined || pixels == undefined) return;
    
    // User offset
    let off_x = user.position[type].x || 0;
    let off_y = user.position[type].y || 0;

    // Part offset
    let part_off = getOffset(type);
    off_x += part_off.x;
    off_y += part_off.y;

    for(let i = 0; i < pixels.length; i++) {
        let pix = pixels[i];
        let [x, y, w, h, color_override, alpha] = pix;
        x+=off_x;
        y+=off_y;
        ctx.fillStyle = color_override || color || 'gray';
        ctx.globalAlpha = alpha || 1;
        ctx.fillRect(x*times, y*times, (w||1)*times, (h||1)*times);
        ctx.globalAlpha = 1;
    }
}
/** Position part */
function position(type, axis, amount) {
    let me = user.position[type];
    me[axis] = (me[axis] || 0) + amount;
    // console.log(me);
    fullDraw();
}

// UI
var current_tab = 'background';
/** Tab */
function tab(choice, state=true) {
    if(choice == current_tab && state) return;

    store('character_creator_tab', choice);

    let button = dom(`tab_${choice}`);
    let content = dom(`content_${choice}`);
    style(button, 'active_tab', state);
    style(content, 'active_tab', state);

    if(state) tab(current_tab, false);
    current_tab = choice;
}

/** Export image */
function exportImage() {
    let image = canvas.toDataURL('image/png'); // Create image

    let link = document.createElement("a");
    link.setAttribute("href", image);
    link.setAttribute("download", 'My character');
    document.body.appendChild(link);
    link.click();
    link.remove();
}

// Debug
var region = {};
/** Debug function */
function canvasClick(event) {
    var rect = canvas.getBoundingClientRect();
    var y = Math.floor((event.clientX - rect.left) / times); //x position within the element.
    var x = Math.floor((event.clientY - rect.top) / times);  //y position within the element.
    console.log(x + ', ' + y);

    // Start region
    if(region.x1 == undefined) {
        region.x1 = x;
        region.y1 = y;
    }
    else {
        region.x2 = x;
        region.y2 = y;
        console.log(`[${region.x1}, ${region.x2}, ${region.x2 - region.x1}, ${region.y2 - region.y1}],`);
        for(var value in region) delete region[value];
    }
}

// Keyboard shortcuts
// Keyboard shortcuts
document.addEventListener('keydown', event => {
    let key = Number(event.key);
    if(key == 0) key = 10;
    if(key != NaN) tab(keys[key - 1]);
});

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