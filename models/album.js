const { Schema, model } = require('mongoose')

const albumSchema = new Schema({
  title: { type: String, required: true },
  albumId: { type: String, required: true },
  artists: { type: Array, required: true },
  artistsId: { type: Array, required: true },
  art: { type: String, required: true}
})

const Album = model('Album', albumSchema)

module.exports = Album
