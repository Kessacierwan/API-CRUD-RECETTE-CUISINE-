const userModel = require("../models/userModel")
const userRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const JWT_SECRET = "secure_key"


//créer un user + envoyer DB // 
//test ok // 
userRouter.post("/register", async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.json({ message: "user ajouté avec succes", user: newUser })
    } catch (err) {
        res.json(err)
    }
})

module.exports = userRouter

// récupérer les utilisateurs de la DB // 
userRouter.get("/login", async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ message: "collection de recettes :", users })
    } catch (err) {
        res.json(err)
    }
})

// requettes pour envoyer //
userRouter.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await userModel.findOne({ name : name });

        if (!user) {
            throw({ message: "utilisateur introuvable " })
        }

        if (password != user.password) {
        // console.log("connexion réussie")
        res.json({ message: "mdp incorrect" })

        }  
        
        const token = jwt.sign({userId: user._id, name: user.name},JWT_SECRET,{expiresIn:"1h"} )
        res.json({token , message: "connexion reussie"})



    } catch (err) {

        res.json(err.message)

    }
})