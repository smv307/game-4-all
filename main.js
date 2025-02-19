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
        if (!["Alt", "Ctrl", "Meta", "Shift", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "F12", "F11", "F10", "F9", "F8", "F7", "F6", "F5", "F4", "F3", "F2", "F1", "Escape"].includes(event.key)) {
            this.setKeys.add(event.key.toLowerCase().charCodeAt());
        } else {
            if(event.key == "Alt") this.setKeys.add(130);
            if(event.key == "Ctrl") this.setKeys.add(128);
            if(event.key == "Meta") this.setKeys.add(135);
            if(event.key == "Shift") this.setKeys.add(129);
            if(event.key == "Tab") this.setKeys.add(9);
            if(event.key == "ArrowLeft") this.setKeys.add(216);
            if(event.key == "ArrowRight") this.setKeys.add(215);
            if(event.key == "ArrowUp") this.setKeys.add(218);
            if(event.key == "ArrowDown") this.setKeys.add(217);
            if(event.key == "F12") this.setKeys.add(205);
            if(event.key == "F11") this.setKeys.add(204);
            if(event.key == "F10") this.setKeys.add(203);
            if(event.key == "F9") this.setKeys.add(202);
            if(event.key == "F8") this.setKeys.add(201);
            if(event.key == "F7") this.setKeys.add(200);
            if(event.key == "F6") this.setKeys.add(199);
            if(event.key == "F5") this.setKeys.add(198);
            if(event.key == "F4") this.setKeys.add(197);
            if(event.key == "F3") this.setKeys.add(196);
            if(event.key == "F2") this.setKeys.add(195);
            if(event.key == "F1") this.setKeys.add(194);
            if(event.key == "Escape") this.setKeys.add(193);
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
                    alert("Error: " + error + ". There was an error. Please ensure that this website is not open on any other tabs, then reload the page and try again.");
                };
                resolve();
            }, error => {
                // console.log(error);
                alert("Error: " + error + ". There was an error. Please ensure that this website is not open on any other tabs, then reload the page and try again.");
                reject();
            });
        })
    }

    function saveToMCU(sendString) {

        // console.log(button1.returnKeys());

        console.log(sendString);

        let textEncoder = new TextEncoder();

        if (port) {
            port.send(textEncoder.encode(sendString)).catch(error => {
                console.log('Send error: ' + error);
                alert("Send error: " + error + ". There was an error. Please ensure that this website is not open on any other tabs, then reload the page and try again.");
            }).then(() => {
                alert("Success!");
            });
        } else {
            serial.requestPort().then(selectedPort => {
                port = selectedPort;
                // connect();
                connect().then(() => {
                    port.send(textEncoder.encode(sendString)).catch(error => {
                        console.log('Send error: ' + error);
                        alert("Send error: " + error + ". There was an error. Please ensure that this website is not open on any other tabs, then reload the page and try again.");

                    }).then(() => {
                        alert("Success!");
                    });;
                });
            });
        }
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

        saveToMCU(sendString);
    });

    resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
        sendString = JSON.stringify({
            1: [49],
            2: [50],
            3: [51],
            4: [52]
        });

        saveToMCU(sendString);
    })

    // document.getElementById("connect").addEventListener("click", ()=> {
    //     serial.requestPort().then(selectedPort => {
    //         port = selectedPort;
    //         // connect();
    //         connect();
    //     });

    // })
    window.saveToMCU = saveToMCU;
});

window.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.altKey || event.metaKey) {
        event.preventDefault();
    }

    console.log(button1.returnKeys());
});