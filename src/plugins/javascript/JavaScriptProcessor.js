// LICENSE : MIT
"use strict";
import {parse} from "esprima";
import {parse as makrdownToAst } from "markdown-to-ast";
export default class MarkdownProcessor {
    constructor(config) {
        this.config = config;
    }

    static availableExtensions() {
        return [
            ".js",
            ".es6",
            ".jsx"
        ];
    }

    processor(ext) {
        return {
            // processは複数のastを返せるのでは?
            preProcess(text, filePath) {
                var ast = parse(text, {
                    comments: true
                });
                var comment = ast.comments[0];
                return makrdownToAst(comment.value);
            },
            postProcess(messages, filePath) {
                return {
                    messages,
                    filePath: filePath ? filePath : "<javascript>"
                };
            }
        };
    }
}
