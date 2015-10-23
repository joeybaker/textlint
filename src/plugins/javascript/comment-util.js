// LICENSE : MIT
"use strict";

export function trimRight(str) {
    return str.replace(/\s+$/, '');
}

export function stripStars(line) {
    var re = /^(?:\s*[\*]{1,2}\s)/;
    return trimRight(line.replace(re, ''));
}

export function splitLines(text) {
    let lines = text.split("\n");
    let regExp = /^(?:\s*[\*]{1,2}\s)/g;
    return lines.map(line => {
        let match = regExp.exec(line);
        if (match) {
            let lastIndex = regExp.lastIndex;
            return {
                text: line.substring(lastIndex),
                indent: lastIndex
            };
        } else {
            return {
                text: line,
                indent: 0
            };
        }
    });
}