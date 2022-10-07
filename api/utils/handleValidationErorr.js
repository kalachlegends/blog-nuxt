import { validationResult } from "express-validator";

export default (req, res, next) => {
    const erorr = validationResult(req)
    if (!erorr.isEmpty()) {
        return res.status(400).json(erorr.array())
    }
    next()
}