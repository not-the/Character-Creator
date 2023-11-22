// Page
const select_preset = dom('select_preset');

// Canvas
var c = dom('canvas'); // Canvas element
var ctx; // Contextualized canvas
var src_size = 32; // Size of the assets
var size = c.width; // Size of the canvas
var times = size / src_size; // Canvas is 16x larger than assets

let images_loaded = false;

// User configuration
var user = {
    part: {
        background: 0,
        midground:  0,

        body:       0,
        head:       0,
        hair:       1,
        eyes:       1,
        mouth:      1,
        nose:       1,
        hat:        1,
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
        hair:       {x:0,y:0},
        eyes:       {x:0,y:0},
        mouth:      {x:0,y:0},
        nose:       {x:0,y:0},
        hat:        {x:0,y:0},
        accessory:  {x:0,y:0},
        foreground: {x:0,y:0},
    },
    last_edited: false,
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
        <figure class="part part_${type} ${user.part[type] == i ? 'active' : ''}" id="part_${type}_${name}" onclick="equip('${type}', ${i})" role="button" tabindex="0">
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
            ${resetButtonHTML(type, 'color')}
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
            </div>
            ${resetButtonHTML(type, 'position')}
        </div>`;
        dom(`${type}_color`).addEventListener('input', event => {
            user.color[type] = event.srcElement.value;
            fullDraw();
        });
    }

    /** Reset button template */
    function resetButtonHTML(type, option_name='color') {
        return `
        <button class="cc_reset_button button" onclick="resetCustom('${type}', '${option_name}')">
            <p>Reset</p>
            <div class="button_shade"></div>
        </button>`;
    }
}



/** Resets color/position options */
function resetCustom(type, option='color') {
    let to = option == 'position' ? {x:0,y:0} : undefined;
    user[option][type] = to;
    if(option == 'color') dom(`${type}_${option}`).value = '#000000';
    fullDraw();
}

/** Equip part */
function equip(type, num, draw=true, equip=true) {
    // console.log(type, num);
    if(user.part[type] == num) return;
    if(equip) user.part[type] = num;
    document.querySelectorAll(`.part_${type}`).forEach(element => element.classList.remove('active'));
    // console.log(`part_${type}_${itemID(parts[type][num])}`);
    dom(`part_${type}_${itemID(parts[type][num])}`)?.classList.add('active');
    if(draw) fullDraw();
}

/** Draw all selected */
function fullDraw(custom_preset=false) {
    for(i = 0; i < keys.length; i++) {
        let type = keys[i];
        let num = user.part[type];
        let item = parts[type][num];
        let name = itemID(item); // Get ID
        draw(type, name, num);
    }
    images_loaded = true;
    if(!custom_preset) select_preset.value = 'custom';
}

/** Calculates a part's offset */
function getOffset(type) {
    let values = {x:0, y:0};
    // Head offset by body
    if(type == 'head' || type == 'eyes' || type == 'nose' || type == 'mouth' || type == 'hat' || type == 'hair' || type == 'accessory') {
        let head_off = parts['body'][user.part.body].head_offset;
        if(head_off != undefined) {
            values.x += head_off.x || 0;
            values.y += head_off.y || 0;
        }
    }
    // Headwear offset by head
    if(type == 'hat' || type == 'hair') {
        let headwear_off = parts['head'][user.part.head].headwear_offset;
        if(headwear_off != undefined) {
            values.x += headwear_off.x || 0;
            values.y += headwear_off.y || 0;
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

    ctx.filter = parts[type][num].filter || 'none';

    if(part_data[type].color && parts[type]?.[num]?.['color_mode'] == 'before') drawColor(type, user.part[type]); // Color before mode

    // Draw
    if(images_loaded) d();
    else img.onload = d;

    if(part_data[type].color && parts[type]?.[num]?.['color_mode'] != 'before') drawColor(type, num); // Color

    function d() { ctx.drawImage(img, x, y, size, size); }
}
/** Draw rectangle
 * @param {string} type Part type
 * @param {number} num Part ID
 * @returns 
 */
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
/** Position part
 * @param {string} type Part type
 * @param {string} axis Axis, either X or Y
 * @param {number} amount Change in position
 */
function position(type, axis, amount) {
    type = type || user.last_edited;
    user.last_edited = type;

    let me = user.position[type];
    me[axis] = (me[axis] || 0) + amount;
    user.last_edited = type;
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
    console.log(image);

    let link = document.createElement("a");
    link.setAttribute("href", image);
    link.setAttribute("download", 'My character');
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/** Randomize character */
function randomize() {
    for(i in keys) {
        let type = keys[i];
        let list = parts[type];
        let random = Math.ceil(Math.random() * (list.length-1));
        if(type == 'foreground' && Math.ceil(Math.random() * 100) <= 80) random = 0;
        equip(type, random, false);
    }
    fullDraw();
}

/** Set preset */
function setPreset(preset) {
    // if(select_preset.value == 'custom') {
    //     if(!window.confirm("Your character will be lost. Continue?")) {
    //         select_preset.value = 'custom';
    //         return;
    //     }
    //     console.log('eee');
    // };

    user.part = JSON.parse(JSON.stringify(presets[preset]));
    // for(i in keys) {
    //     let type = keys[i];
    //     let to = presets[preset][type];
    //     equip(type, to, false, false);
    // }
    fullDraw();
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
document.addEventListener('keydown', event => {
    let key = event.key;

    // Arrow key positioning
    if(
        key == 'ArrowUp' || key == 'ArrowRight' || key == 'ArrowDown' || key == 'ArrowLeft'
        && document.activeElement.tagName != 'select' && user.last_edited != false
    ) {
        event.preventDefault();
        try {
            if(key == 'ArrowUp') position(undefined, 'y', -1);
            else if(key == 'ArrowRight') position(undefined, 'x', 1);
            else if(key == 'ArrowDown') position(undefined, 'y', 1);
            else if(key == 'ArrowLeft') position(undefined, 'x', -1);
        } catch (error) {
            console.log('[Character Creator] No element selected')
        }
    }


    // let key = Number(event.key);
    // if(key == 0) key = 10;
    // if(key != NaN) tab(keys[key - 1]);
});

// Select preset
select_preset.addEventListener('input', event => {
    let value = select_preset.value;
    setPreset(value);
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