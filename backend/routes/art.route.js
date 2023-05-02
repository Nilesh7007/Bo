const express = require("express")

const {ArtModel}= require("../model/art.model")


const ArtRouter = express.Router();


ArtRouter.post("/add", async(req,res)=>{

    try {
        const arti = new ArtModel(req.body);
        await arti.save()
        res.status(200).send({"msg":"new article has been added"})


    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})

ArtRouter.get("/:id", async(req,res)=>{
    const {id} =  req.params

   
    try {
        const articles = await ArtModel.find({userID:req.body.userID})

        const arti = await ArtModel.findOne({_id:id});
         res.send(arti)
       


    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})


ArtRouter.patch("/edit/:id", async(req,res)=>{
const {id} =  req.params

const arti = await ArtModel.findOne({_id:id});
    try {
        if(req.body.userID!==arti.userID){
res.status(200).send({"msg":"you are not autherised to do this"})
        }
        else{
            await ArtModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":"Article updated"})
        }
     
 } catch (err) {
        res.status(400).send({"err":err.message})
    }
})


ArtRouter.delete("/rem/:id", async(req,res)=>{
    const {id} =  req.params
    
    const arti = await ArtModel.findOne({_id:id});
        try {
            if(req.body.userID!==arti.userID){
    res.status(200).send({"msg":"you are not autherised to do this"})
            }
            else{
                await ArtModel.findByIdAndDelete({_id:id})
                res.status(200).send({"msg":"Article deleted"})
            }
         
     } catch (err) {
            res.status(400).send({"err":err.message})
        }
    })


    ArtRouter.get("/", async(req,res)=>{

        try {
           const {page} = req.query

           let lim = 2
           let skipp = lim*(page-1)
          if(page==0||page==undefined){
            lim =0;
            skipp=0;
          } 
          let arti = await ArtModel.find().skip(skipp).limit(lim)
          res.json({"articles":arti})
    
        } catch (err) {
            res.status(400).send({"err":err.message})
        }
    })

module.exports = {ArtRouter}