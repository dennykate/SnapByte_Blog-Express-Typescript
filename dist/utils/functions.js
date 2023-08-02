"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = exports.createSlug = exports.returnSuccessMessage = exports.returnErrorMessage = void 0;
const returnErrorMessage = (res, data, status = 404) => {
    return res.status(status).json(Object.assign({ success: false }, data));
};
exports.returnErrorMessage = returnErrorMessage;
const returnSuccessMessage = (res, data, status = 200) => {
    return res.status(status).json(Object.assign({ success: true }, data));
};
exports.returnSuccessMessage = returnSuccessMessage;
const createSlug = (title) => {
    const specialCharacters = [
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "&",
        "*",
        "(",
        ")",
        "_",
        "+",
        "=",
        "[",
        "]",
        "{",
        "}",
        ";",
        ":",
        "'",
        '"',
        ",",
        ".",
        "<",
        ">",
        "/",
        "?",
        "|",
        "\\",
    ];
    const textArr = title.split("");
    let slug = `${Math.floor(Math.random() * 100000)}-`;
    textArr.forEach((text) => {
        const isSpecialCharacter = specialCharacters.findIndex((character) => character == text);
        if (isSpecialCharacter > 0) {
            slug += "-";
        }
        else {
            slug += text;
        }
    });
    return slug.toLowerCase().split(" ").join("-");
};
exports.createSlug = createSlug;
const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
    const minutes = date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const month = monthNames[monthIndex];
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
};
exports.getCurrentTime = getCurrentTime;
