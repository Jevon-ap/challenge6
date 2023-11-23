const express = require('express')
const router = express.Router()
const artworkController = require('../controllers/artworkController')

router.post('/artworks', artworkController.createArtwork)
router.get('/artworks', artworkController.getAllArtworks)
router.get('/artworks/:id', artworkController.getArtworkById)
router.put('/artworks/:id', artworkController.updateArtwork)
router.delete('/artworks/:id', artworkController.deleteArtwork)

module.exports = router