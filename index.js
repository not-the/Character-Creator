// Canvas
var c = dom('canvas');
var ctx;
var src_size = 32;
var size = c.width;
var times = size / src_size; // Canvas is 16x larger than assets


// Data
// In order, back to front
const parts = {
    background: [
        'sky',
        'cloudy',
        'dusk',
    ],
    body: [
        'bill',
        'belle',
    ],
    head: [
        'basic',
    ],
    // eyes: [
    //     
    // ],
    mouth: [

    ],
    nose: [

    ],
    headwear: [
        'hair',
    ],
    extra: [

    ],
}
var user = {
    background: 0,
    body:       0,
    headwear:   0,
}
let keys = Object.keys(parts);

/** Populate parts list(s) */
function populate(type) {
    console.log(`Populating: ${type}`);
    let html = '';
    let list = parts[type];
    for(i = 0; i < list.length; i++) {
        let name = list[i];
        html +=
        `
        <figure class="part" id="part_${type}_${name}" onclick="equip('${type}', ${i})">
            <img src="./assets/${type}/${name}.png" alt="${name}" class="part_img">
            <figcaption>${capitalizeFL(name)}</figcaption>
        </figure>
        `;
    }
    dom(`parts_${type}`).innerHTML = html;
}

/** Equip part */
function equip(type, num) {
    console.log(type, num);
    if(user[type] == num) return;
    user[type] = num;
    fullDraw();
}

/** Draw all selected */
function fullDraw() {
    for(i = 0; i < keys.length; i++) {
        let type = keys[i];
        let num = user[type];
        let sel = parts[type][num];
        draw(type, sel);
    }
}

/** Draw */
function draw(type, name) {
    // console.log(`Drawing ${type}: ${name}`);
    // Setup
    ctx.imageSmoothingEnabled = false;

    // Get image
    var img = new Image();
    img.src = getSRC(type, name);
    // console.log(img.src);
    img.onload = () => ctx.drawImage(img, 0, 0, size, size); // Draw
}

/** Get image SRC */
function getSRC(type, name) { return `./assets/${type}/${name}.png`}

// UI
var current_tab = 'background';
/** Tab */
function tab(choice, state=true) {
    if(choice == current_tab && state) return;

    let button = dom(`tab_${choice}`);
    let content = dom(`parts_${choice}`);
    style(button, 'active_tab', state);
    style(content, 'active_tab', state);

    if(state) tab(current_tab, false);
    current_tab = choice;
}


// On page load
window.onload = () => {
    console.log(keys.length || 1);
    for(let i = 0; i < 7; i++) {
        try { populate(keys[i]); }
        catch (error) { console.error(error); }
    }

    ctx = c.getContext("2d");
    fullDraw();
}