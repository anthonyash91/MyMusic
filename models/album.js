const { Schema, model } = require("mongoose");

const albumSchema = new Schema({
  albumTitle: { type: String, required: true },
  albumId: { type: String, required: true },
  albumArtists: { type: Array, required: true },
  albumArt: { type: String, required: true },
  favorite: { type: Boolean, required: true },
  userId: { type: String, required: true },
});

const Album = model("Album", albumSchema);

module.exports = Album;
