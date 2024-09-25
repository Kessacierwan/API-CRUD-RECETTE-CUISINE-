const mongoose =require("mongoose")

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "le titre est requis"]
    },
    ingredients: {
        type: [String],

    },
    instructions:{
        type : String,
        required : [true, "instructions requises"]
    },
    timePrep : {
        type : Number,
        required : [true,"temps de préparation est requis"]
    },
    timeCook : {
        type : Number,
        required : [true,"temps de cuisson requis"]
    },
    difficulty : {
        type : String,
        required : [true,"niveau de difficulté requis"]
    },
    category : {
        type : String,
        required : [true, "catégorie requise"]
    },
    image : {
        type : String,

    }

})

const recipeModel = mongoose.model("recipes", recipeSchema);
module.exports = recipeModel ;