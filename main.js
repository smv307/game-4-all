const keyMap = {
    "a": 0x04, "b": 0x05, "c": 0x06, "d": 0x07,
    "e": 0x08, "f": 0x09, "g": 0x0A, "h": 0x0B,
    "i": 0x0C, "j": 0x0D, "k": 0x0E, "l": 0x0F,
    "m": 0x10, "n": 0x11, "o": 0x12, "p": 0x13,
    "q": 0x14, "r": 0x15, "s": 0x16, "t": 0x17,
    "u": 0x18, "v": 0x19, "w": 0x1A, "x": 0x1B,
    "y": 0x1C, "z": 0x1D,

    "0": 0x27, "1": 0x1E, "2": 0x1F, "3": 0x20,
    "4": 0x21, "5": 0x22, "6": 0x23, "7": 0x24,
    "8": 0x25, "9": 0x26,

    "Enter": 0x28, "Escape": 0x29, "Backspace": 0x2A, "Tab": 0x2B,
    " ": 0x2C, "-": 0x2D, "=": 0x2E, "[": 0x2F, "]": 0x30,
    "\\": 0x31, ";": 0x33, "'": 0x34, "`": 0x35, ",": 0x36,
    ".": 0x37, "/": 0x38,

    "ArrowUp": 0x52, "ArrowDown": 0x51, "ArrowLeft": 0x50, "ArrowRight": 0x4F
};

function formatShortcut(keys) {
    return [...keys].map(key => key.replace(" ", "Space")).join(" + ");
}

class InputBox {
    constructor(id) {
        this.id = id;
        this.pressedKeys = new Set();
        this.box = document.getElementById(this.id);

        if (!this.box) {
            console.error(`Element with id '${id}' not found.`);
            return;
        }

        this.keyListen = this.keyListen.bind(this);
        this.keyRelease = this.keyRelease.bind(this);
        this.clearWait = this.clearWait.bind(this)
        this.setKeys = new Set();

        this.box.addEventListener("click", () => this.startListening());
        document.addEventListener("click", this.clearWait);
    }

    keyListen(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.pressedKeys.size === 0) {
            this.setKeys.clear();
        }

        console.log(event.key);
        this.pressedKeys.add(event.key);
        // this.setKeys.add(event.key.toLowerCase().charCodeAt());
        if (!["Alt", "Ctrl", "Meta", "Shift", "Tab"].includes(event.key)) {
            this.setKeys.add(event.key.toLowerCase().charCodeAt());
        } else {
            if(event.key == "Alt") this.setKeys.add(130);
            if(event.key == "Ctrl") this.setKeys.add(128);
            if(event.key == "Meta") this.setKeys.add(135);
            if(event.key == "Shift") this.setKeys.add(129);
            if(event.key == "Tab") this.setKeys.add(9);
        }
        this.box.textContent = formatShortcut(this.pressedKeys);
    }

    keyRelease(event) {
        this.pressedKeys.delete(event.key);
        document.removeEventListener("keydown", this.keyListen);
    }

    startListening() {
        this.pressedKeys.clear();
        this.box.textContent = "Type a shortcut...";

        document.removeEventListener("keydown", this.keyListen); // Avoid duplicates
        document.removeEventListener("keyup", this.keyRelease);

        document.addEventListener("keydown", this.keyListen);
        document.addEventListener("keyup", this.keyRelease);
    }

    clearWait(event) {
        if (this.box.contains(event.target)) {
            return;
        } else {
            document.removeEventListener("keydown", this.keyListen);

            if (this.box.textContent === "Type a shortcut...") {
                this.setKeys.clear();
            }
        }
    }

    returnKeys() {
        return this.setKeys;
    }
}

let button1;
let button2;
let button3;
let button4;
let saveButton;

let sendString = "";

// Wait for the DOM to load before creating the instance
document.addEventListener("DOMContentLoaded", () => {
    button1 = new InputBox("I");
    button2 = new InputBox("II");
    button3 = new InputBox("III");
    button4 = new InputBox("IV");

    let port;

    function connect() {
        return new Promise((resolve, reject) => {

            port.connect().then(() => {
                // statusDisplay.textContent = '';
                // connectButton.textContent = 'Disconnect';

                port.onReceive = data => {
                    let textDecoder = new TextDecoder();
                    console.log(textDecoder.decode(data));
                }
                port.onReceiveError = error => {
                    console.error(error);
                };
                resolve();
            }, error => {
                console.log(error);
                reject();
            });
        })
    }

    saveButton = document.getElementById("save");
    saveButton.addEventListener("click", () => {
        sendString = JSON.stringify({
            // 1: Array.from(button1.returnKeys()).map((key) => {return keyMap[key]}),
            // 2: Array.from(button2.returnKeys()).map((key) => {return keyMap[key]}),
            // 3: Array.from(button3.returnKeys()).map((key) => {return keyMap[key]}),
            // 4: Array.from(button4.returnKeys()).map((key) => {return keyMap[key]})
            1: Array.from(button1.returnKeys()),
            2: Array.from(button2.returnKeys()),
            3: Array.from(button3.returnKeys()),
            4: Array.from(button4.returnKeys())
        });

        console.log(button1.returnKeys());

        console.log(sendString);

        let textEncoder = new TextEncoder();

        if (port) {
            port.send(textEncoder.encode(sendString)).catch(error => {
                console.log('Send error: ' + error);
            });
        } else {
            serial.requestPort().then(selectedPort => {
                port = selectedPort;
                // connect();
                connect().then(() => {
                    port.send(textEncoder.encode(sendString)).catch(error => {
                        console.log('Send error: ' + error);
                    });
                });
            });
        }


    });

    // document.getElementById("connect").addEventListener("click", ()=> {
    //     serial.requestPort().then(selectedPort => {
    //         port = selectedPort;
    //         // connect();
    //         connect();
    //     });

    // })
});

window.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        event.preventDefault();
    }

    console.log(button1.returnKeys());
});