let fonts = require('./oled-fonts'),
    fs = require('fs');
let font = fonts.MegaNumbers;
let ch_size = font.height * font.width / 8;

let swap = (arr, width, height) => {
    var res = arr.splice();
    let b = height / 8;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < b; j++) {
            res[i * b + j] = arr[(b - j - 1) * width + i];
        }
    }
    return res;
};

let toStr = (arr) => {
    let str = arr.map((num) => {
        return '0x' + ('0' + (Number(num).toString(16))).slice(-2).toLowerCase();
    });
    return str.join(', ');
};

let fh = fs.openSync('./result.txt', 'w');
if (fh) {
    for (let i = 0; i < font.lookup.length; i++) {
        let buf = font.fontData.slice(i * ch_size, (i + 1) * ch_size);
        let str = toStr(swap(buf, font.width, font.height)) + ',   // ' + font.lookup[i];
        console.log(str);
        fs.writeSync(fh, str + "\n");
    }
    fs.closeSync(fh);
}