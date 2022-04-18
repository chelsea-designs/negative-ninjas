const {
    difficulty
} = require("../script");


beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("difficulty object contains correct keys", () => {
    test("times tables key exists", () => {
        expect("timesTables" in difficulty).toBe(true);
    });
});