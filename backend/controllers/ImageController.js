const { json } = require('express')
const mongoose = require('mongoose')
const Image = require('../model/imageModel')

// Get all images
const getImages = async(req, res)=>{

    const images = await Image.find()

    res.status(200).json(images)
}

// Get a single Image
const getImage = async(req, res)=>{

    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "ID cannot exist",
            message: "This ID cannot exist in Mongo database"
        })
    }
    const image = await Image.findById(id)

    if(!image){
        return res.status(404).json({
            error: "No such Image is found",
            message: "The ID you are looking for is not present in the database"
        })
    }

    res.status(200).json(image)

}

// Create new Image
const createImage = async (req, res) => {
  try {
    // Multer stores the file info here
    if (!req.file) {
      return res.status(400).json({
        error: 'Image file is required',
        message: 'No image file was uploaded',
      });
    }

    const { caption } = req.body;

    const newImage = await Image.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: `/uploads/${req.file.filename}`,
      caption: caption || '',
    });

    res.status(201).json({
      message: 'Image Posted',
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: 'Encountered Server Error',
    });
  }
}

// Deleating an image
const deleteImage = async(req, res)=>{

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ 
            error: 'Invalid ID',
            message: "The ID given is invalid, please provide a valid mongoose ID"
        })
    }
    const deletedImageID = await Image.findOneAndDelete(id);
    if(!deletedImageID){
        return res.status(404).json({
            error: 'Image not in Database',
            message: 'The Image you selected is not present in our database'
        })
    }
    res.status(202).json({
        message: "Image is deleted",
        image: deletedImageID
    })
}

// Updating an image
const updateImage = async(req, res)=>{
    const { id } = req.params
    const { caption } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ 
            error: 'Invalid ID',
            message: "The ID given is invalid, please provide a valid mongoose ID"

        });
    }
    const updatedImageID = await Image.findByIdAndUpdate(
        id,
        {caption},
        {new: true}
    )
    if(!updatedImageID){
        return res.status(404).json({ 
            error: 'Image not found',
            message: 'Image is not found in our database, cannot update'
        })
    }
    res.status(200).json({
        message: 'Caption Updated',
        image: updatedImageID
    })
}

module.exports = {
    getImages,
    getImage,
    createImage,
    deleteImage,
    updateImage
}