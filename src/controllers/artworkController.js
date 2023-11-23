const ImageKit = require('../utils/imageKit')
const prisma = require('../prismaClient')
const fs = require('fs')

const artworkController = {
  createArtwork: async (req, res) => {
    try {
        
        const { title, description } = req.body
        const file = req.file 

        const fileBuffer = fs.readFileSync(file.path)

        ImageKit.upload({
            file: fileBuffer, 
            fileName: file.originalname, 
        }, async (error, result) => {
            if (error) {
                res.status(500).send(error.message)
            } else {
                const imageUrl = result.url
                const newArtwork = await prisma.artwork.create({
                    data: {
                        title,
                        description,
                        imageUrl
                    },
                })
                fs.unlinkSync(file.path)
                res.json(newArtwork)
            }
        })
    } catch (error) {

        if (req.file) {
            fs.unlinkSync(req.file.path)
        }
        res.status(500).send(error.message)
    }
},

  getAllArtworks: async (req, res) => {
    try {
      const artworks = await prisma.artwork.findMany()
      res.json(artworks)
    } catch (error) {
      res.status(500).send(error.message)
    }
  },

  getArtworkById: async (req, res) => {
    try {
      const { id } = req.params
      const artwork = await prisma.artwork.findUnique({
        where: { id: parseInt(id) },
      })
      res.json(artwork)
    } catch (error) {
      res.status(500).send(error.message)
    }
  },

  updateArtwork: async (req, res) => {
    try {
      const { id } = req.params
      const { title, description, imageUrl } = req.body
      const updatedArtwork = await prisma.artwork.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          imageUrl,
        },
      })
      res.json(updatedArtwork)
    } catch (error) {
      res.status(500).send(error.message)
    }
  },

  deleteArtwork: async (req, res) => {
    try {
      const { id } = req.params
      await prisma.artwork.delete({
        where: { id: parseInt(id) },
      })
      res.send(`Artwork with ID ${id} is deleted`)
    } catch (error) {
      res.status(500).send(error.message)
    }
  },
}

module.exports = artworkController
