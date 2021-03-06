// LICENSE : MIT
"use strict";
import assert from "power-assert";
import glob from "glob";
import path from "path";
import Config from "../src/config/config";
/* load config from "./config/" and match expected result */
describe("config-as-example", function () {
    const configList = glob.sync(__dirname + "/config-fixtures/**/.textlintrc");
    configList.forEach(textlintrcPath => {
        const projectDir = path.dirname(textlintrcPath);
        const dirName = projectDir.split("/").pop();
        it(`test ${dirName}`, function () {
            const config = Config.initWithAutoLoading({
                configFile: textlintrcPath,
                // == node_modules/
                rulesBaseDirectory: path.join(__dirname, "config-fixtures", dirName, "modules")
            });
            const expect = require(path.join(projectDir, "expect.json"));
            const actual = config.toJSON();
            Object.keys(expect).forEach(key => {
                assert.deepEqual(actual[key], expect[key]);
            });
        });
    });
});