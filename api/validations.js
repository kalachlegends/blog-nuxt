import { body } from "express-validator";

export const registerValidator = [
    body("email", "Укажите Емайл").isEmail(),
    body("password", "password length min 5").isLength({ min: 5 }),
    body("fullName", "fullname length min 3").isLength({ min: 3 }),
    body("avatarUrl", "avatarUrl").optional().isURL(),
]


export const postValidator = [
    body("title", "стринг").isString(),
    body("url", "min 5").isString().isLength({ min: 5 }),
    body("sub_title", "min 5").isString().isLength({ min: 5 }),
    body("html_text", "min 10").isString().isLength({ min: 10 }),
    body("imageUrl", "Должен быть ссылкой").optional().isURL(),
]