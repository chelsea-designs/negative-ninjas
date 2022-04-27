/**
 * @jest-environment jsdom
 */

function resetGame() {};
global.jQuery = require('jquery');
global.$ = global.jQuery;
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();

    resetGame = require("../script.js");
});

describe("resetGame works correctly", () => {
    resetGame();
    test("should set health bars to full", () => {
        expect($(".progress-bar").attr("aria-valuenow")).toEqual("100");
    });
    test("should clear the player answer input", () => {
        expect($("#questions_input").val()).toBe("");
    });
});