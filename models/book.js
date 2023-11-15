const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:  String,
    },
    publishDate:{
        type: Date,
        required:true,
    },
    pageCount:{
        type: Number,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
    },
    coverImage:{
        type:Buffer,
        requierd:true,
    },
    coverImageType:{
        type:String,
        reqiured:true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Authors",
    }
})

bookSchema.virtual("coverImagePath",).get(function() {
    if(this.coverImage != null && this.coverImageType != null){
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString("base64")}`
    }
})

module.exports = mongoose.model("Books",bookSchema);