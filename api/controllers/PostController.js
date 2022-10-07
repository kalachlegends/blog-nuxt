import { validationResult } from "express-validator";
import { trusted } from "mongoose";
import PostShema from '../models/post.js'


export const create = async (req, res) => {
    try {
        const doc = new PostShema({
            url: req.body.url,
            title: req.body.title,
            sub_title: req.body.sub_title,
            html_text: req.body.html_text,
            imageUrl: req.body.imageUrl
        })
        const post = await doc.save();
        return res.json({
            message: "Удачно создано",
            post
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: 'Не удалось создать пост'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostShema.find()
        console.log(posts)
        console.log("получено")
        return res.json(
            posts
        )
    } catch (err) {
        res.status(500).json({
            message: 'Error'
        })
    }
}

export const getOneId = async (req, res) => {
    try {

        const posts = PostShema.findOne(
            {
                id: req.params.id
            },
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Не удалось получить статью'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }
                res.json(
                    doc
                )
            })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error'
        })
    }
}
export const getOne = async (req, res) => {
    try {

        const posts = PostShema.findOneAndUpdate(
            {
                url: req.params.url
            },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            }, (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Не удалось получить статью'
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }
                res.json(
                    doc
                )
            })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error'
        })
    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id
        const { title, url, sub_title, html_text, imageUrl } = req.body
        await PostShema.updateOne(
            { _id: postId },
            {
                title,
                url,
                sub_title,
                html_text,
                imageUrl
            })
    } catch (error) {
        res.status(500).json({
            message: 'Не удалось обновить статью',
            error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const posts = PostShema.findOneAndDelete({
            _id: req.params.id,
        }, (err, doc) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Не удалось удалить статью'
                })

            }
            if (!doc) {
                return res.status(404).json({
                    message: 'Не удалось найти'
                })
            }
            return res.json(
                doc
            )
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Error'
        })
    }
}
