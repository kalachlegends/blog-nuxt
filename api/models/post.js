import mongoose from "mongoose";


const PostShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    sub_title: {
        type: String,
    },
    html_text: {
        type: String,
    },
    viewsCount: {
        type: Number,
        default: 0
    },
    imageUrl: String
}, {
    timestamps: true,
})
export default mongoose.model("Post", PostShema)