

const recipeModel = require("../models/recipeModel")
const recipeRouter = require("express").Router()



//créer une recette + envoyer DB // 
recipeRouter.post("/recipes", async(req,res)=>{
    try {
        const newRecipe = new recipeModel(req.body)
        await newRecipe.save()
        res.json({message: "recette ajoutée avec succes",recipe:newRecipe})
    } catch (err) {
        res.json(err)
    }   
    })


// obtenir la liste complete de toutes les recettes  // 

recipeRouter.get("/recipes", async(req,res)=>{  
    try {
        const recipes =await recipeModel.find();
        res.json({message : "collection de recettes :",recipes})
    } catch (err) {
        res.json(err)
    }
})

// Obtenir les détails d'une recette spécifique en fonction de son ID unnque //

recipeRouter.get("/recipes/:id", async(req,res)=>{
    try {
        const recipe =await recipeModel.findById(req.params.id);
        res.json({message :"la recette correspondant a l'id a été trouvé :",recipe})
    } catch (err) {
        res.json(err)
    }
})


//supprimer une recette  //

recipeRouter.delete("/recipes/:id",async(req,res)=>{
    try {
        await recipeModel.deleteOne({_id:req.params.id})
    res.json({message:"la recette a été supprimé"})
}
catch(err){
    res.json(err)
}
})


// modifier les caractéristiques d'une recette // 

recipeRouter.put("/recipes/:id",async(req,res)=>{
    try {
      await recipeModel.updateOne({_id: req.params.id},req.body)  
      res.json({message: "la recette s'est modiffié avec succes"})
    } catch (err) {
        res.json(err)
    }
})

//récuperer une seule recette grace a son nom // 

recipeRouter.get("/recipes/title/:title", async(req,res)=>{
    try {
        const recipeByTitle =await recipeModel.find({title:req.params.title});
        res.json({message :"la recette correspondant a ce titre a été trouvé :",recipeByTitle})
    } catch (err) {
        res.json(err)
    }
})


//recupérer les recettes par ingredients //
// request exemple : http://127.0.0.1:3000/recipe/ingredients/poivre/  // 

recipeRouter.get("/recipes/ingredients/:ingredients", async (req, res) => {
    try {
        const ingredientsArray = req.params.ingredients.split(',');
        const recipe = await recipeModel.find({ ingredients: { $in: ingredientsArray } })
        res.json({"recette trouvée: " :recipe})
    }
    catch {
        res.json({ message: "aucune recette trouvée" })
    }
})


    module.exports = recipeRouter