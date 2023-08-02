import { Response } from "express";

export const returnErrorMessage = (
  res: Response,
  data: object,
  status: number = 404
) => {
  return res.status(status).json({ success: false, ...data });
};

export const returnSuccessMessage = (
  res: Response,
  data: object,
  status: number = 200
) => {
  return res.status(status).json({ success: true, ...data });
};

export const createSlug = (title: string): string => {
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
  const textArr: string[] = title.split("");
  let slug: string = `${Math.floor(Math.random() * 100000)}-`;

  textArr.forEach((text: string) => {
    const isSpecialCharacter = specialCharacters.findIndex(
      (character) => character == text
    );

    if (isSpecialCharacter > 0) {
      slug += "-";
    } else {
      slug += text;
    }
  });

  return slug.toLowerCase().split(" ").join("-");
};

export const getCurrentTime = (): string => {
  const date = new Date();

  const hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
  const minutes =
    date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
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
