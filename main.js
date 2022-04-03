// ==UserScript==
// @name         The-Artist
// @description  Cock and balls
// @namespace    http://tampermonkey.net/
// @version      0.69
// @author       Hornet#0046 - Thanks Jared and sust4in.
// @match        https://hot-potato.reddit.com/embed*
// @downloadURL  https://raw.githubusercontent.com/Hornet07/The-Artist/main/main.js
// @updateURL    https://raw.githubusercontent.com/Hornet07/The-Artist/main/main.js
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function () {
    "use strict";

    const colorMap = {
        "#BE0039": 1, //(Dark red)
        "#FF4500": 2, //(Red)
        "#FFA800": 3, //(Orange)
        "#FFD635": 4, //(Yellow)
        "#00A368": 5, //(Dark green)
        "#00CC78": 6, //(Hreen)
        "#7EED56": 7, //(Light green)
        "#00756F": 8, //(Dark teal)
        "#009EAA": 9, //(Teal)
        "#2450A4": 10, //(Dark blue)
        "#3690EA": 11, //(Blue)
        "#51E9F4": 12, //(Light blue)
        "#493AC1": 13, //(Indigo)
        "#6A5CFF": 14, //(Periwinkle)
        "#811E9F": 15, //(Dark purple)
        "#B44AC0": 16, //(Purple)
        "#FF3881": 17, //(Pink)
        "#FF99AA": 18, //(Light pink)
        "#6D482F": 19, //(Dark brown)
        "#9C6926": 20, //(Brown)
        "#000000": 21, //(Black)
        "#898D90": 22, //(Gray)
        "#D4D7D9": 23, //(Light gray)
        "#FFFFFF": 24, //(White)
    };

    //Main code
    async function runScript(theCanvas) {
        const placeApi = getPlaceApi(theCanvas);

        // PlaceAPI properties
        // function getPixel(x, y);
        // async function setPixel(x, y);

        let menu = document.createElement("div");
        menu.innerHTML = "<h>PLACEHOLDER<h>";
        document.body.prepend(menu);

    }

    //Sleep
    function sleep(ms) {
        return new Promise((response) => setTimeout(response, ms));
    }

    //Random integer
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max-min)+min);
    }

    //RGB to hexadecimal
    function componentToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    
    //Create event
    function createEvent(e, t) {
        return new CustomEvent(e, {
            composed: !0,
            bubbles: !0,
            cancelable: !0,
            detail: t,
        });
    }

    //Place wrapper
    function getPlaceApi(theCanvas) {
        const context = theCanvas.getContext("2d");

        return {
            getPixel: (x, y) => {
                const data = context.getImageData(x, y, 1, 1).data;
                return rgbToHex(data[0], data[1], data[2]);
            },

            setPixel: async (x, y, color) => {
                theCanvas.dispatchEvent(createEvent("click-canvas", { x, y }));
                await sleep(randomInt(1000, 1500));
                theCanvas.dispatchEvent(createEvent("select-color", { color: color }));
                await sleep(randomInt(1000, 1500));
                theCanvas.dispatchEvent(createEvent("confirm-pixel"));
            },
        };
    }

    //Initializer
    const isReadyInterval = setInterval(() => {
        const theCanvas = document
        .querySelector("mona-lisa-embed")
        ?.shadowRoot?.querySelector("mona-lisa-camera")
        ?.querySelector("mona-lisa-canvas")
        ?.shadowRoot?.querySelector("canvas");

        if (theCanvas && document.querySelector("mona-lisa-embed")?.shadowRoot?.querySelector("mona-lisa-overlay")?.shadowRoot.children.length === 0) {
            clearInterval(isReadyInterval);
            runScript(theCanvas);
        }
    }, 500);
})();
