const express = require('express')

const {
        getImages,
    getImage,
    createImage,
    deleteImage,
    updateImage
} = require('../controllers/ImageController')

const upload = require('../middleware/multerConfig')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()


router.get('/welcome', (req, res) => {
    res.json({msg: 'Welcome to the Momentus API, here you will see all the images'})
})

// protecting routes
router.use(requireAuth)

router.get('/', getImages)

router.get('/:id', getImage)

router.post('/', upload.single('image'), createImage);

router.delete('/:id', deleteImage)

router.patch('/:id', updateImage)

module.exports = router