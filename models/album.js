const { Schema, model } = require('mongoose')

const albumSchema = new Schema({
  albumTitle: { type: String, required: true },
  trackTitle: { type: String, required: false },
  albumId: { type: String, required: true },
  trackId: { type: String, required: false },
  albumArtists: { type: Array, required: true },
  albumArt: { type: String, required: true },
  userId: { type: String, required: true },
  musicType: { type: String, required: true },
  previewUrl: { type: String, required: false },
  playlist: { type: String, require: false },
  favoriteAlbum: { type: Boolean, required: false },
  trackDuration: { type: String, required: false },
  trackPlayCount: { type: String, required: false }
})

const Album = model('Album', albumSchema)

module.exports = Album
