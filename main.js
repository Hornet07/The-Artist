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
// @connect      hornet07.github.io
// ==/UserScript==

(function () {
    "use strict";

    const colorMap = {
        '#6D001A': 0,
        '#BE0039': 1,
        '#FF4500': 2,
        '#FFA800': 3,
        '#FFD635': 4,
        '#FFF8B8': 5,
        '#00A368': 6,
        '#00CC78': 7,
        '#7EED56': 8,
        '#00756F': 9,
        '#009EAA': 10,
        '#00CCC0': 11,
        '#2450A4': 12,
        '#3690EA': 13,
        '#51E9F4': 14,
        '#493AC1': 15,
        '#6A5CFF': 16,
        '#94B3FF': 17,
        '#811E9F': 18,
        '#B44AC0': 19,
        '#E4ABFF': 20,
        '#DE107F': 21,
        '#FF3881': 22,
        '#FF99AA': 23,
        '#6D482F': 24,
        '#9C6926': 25,
        '#FFB470': 26,
        '#000000': 27,
        '#515252': 28,
        '#898D90': 29,
        '#D4D7D9': 30,
        '#FFFFFF': 31,
    };

    //Main code
    async function runScript(theCanvas) {
        const placeApi = getPlaceApi(theCanvas);

        // PlaceAPI properties
        // function getPixel(x, y);
        // async function setPixel(x, y);

        /*
        const start = {x: 299, y: 343};
        const end   = {x: 480, y: 450};
        */

        const start = {x: 299, y: 343};
        const end   = {x: 299, y: 343};

        const image = [[16]];

        sleep(700);
        while (true) {
            for(let x = start.x; x <= end.x; x++) {
                for(let y = start.y; y <= end.y; y++) {
                    const selectedPixel = placeApi.getPixel(x, y);
                    const matchingPixel = image[start.x-end.x][start.y-end.y];

                    if(colorMap[selectedPixel] != matchingPixel) {
                        await placeApi.setPixel(x, y, matchingPixel);
                        await sleep((5+(Math.random()*5))*60000);
                    }
                    else {
                        await sleep(randomInt(100, 250));
                    }
                }
            }
        }
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
