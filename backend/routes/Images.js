const express = require('express')

const {
        getImages,
    getImage,
    createImage,
    deleteImage,
    updateImage
} = require('../controllers/ImageController')

const router = express.Router()


router.get('/welcome', (req, res) => {
    res.json({msg: 'Welcome to the Momentus API, here you will see all the images'})
})

router.get('/', getImages)

router.get('/:id', getImage)

router.post('/', createImage)

router.delete('/:id', deleteImage)

router.patch('/:id', updateImage)

module.exports = router