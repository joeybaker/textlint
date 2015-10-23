// LICENSE : MIT
"use strict";
import {parse} from "esprima";
import {parse as txtToAst } from "txt-to-ast";
import { Controller } from "txt-ast-traverse";
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
                let ast = parse(text, {
                    comment: true,
                    range: true,
                    loc: true
                });
                let comments = [];
                const controller = new Controller();
                ast.comments.forEach(comment => {
                    let txtAst = txtToAst(comment.value);
                    controller.traverse(txtAst, {
                        enter(node, parent) {
                            node.loc.start.line += comment.loc.start.line - 1;
                            node.loc.end.line += comment.loc.end.line - 1;
                            node.range[0] += comment.range[0];
                            node.range[1] += comment.range[1];
                        }
                    });
                    comments = comments.concat(txtAst.children);
                });
                return {
                    "type": "Document",
                    "children": comments,
                    "range": ast.range,
                    "loc": ast.loc
                };
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
