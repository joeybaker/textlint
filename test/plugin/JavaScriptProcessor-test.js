import assert from "power-assert";
import {TextLintCore} from "../../src/index";
import rule from "../fixtures/rules/example-rule";
describe("JavaScriptProcessor-test", function () {
    it("should parse js", function () {
        var textlint = new TextLintCore();
        textlint.setupRules({
            "example-rule": rule
        });
        var results = textlint.lintText("/**\n" +
            " * test \n" +
            " */", ".js");
        var message = results.messages[0];
        assert(results.messages.length > 0);
    });
});