const mongoose =require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "le prenom est requis"]
    },
    firstname: {
        type: String,
        required : [true,"le nom est requis"]

    },
    password:{
        type : String,
        required : [true, "mot de passe requis"]
    },
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel ;