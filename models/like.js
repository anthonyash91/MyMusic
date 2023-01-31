const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  albumTitle: { type: String, required: true },
  trackTitle: { type: String, required: false },
  albumId: { type: String, required: true },
  trackId: { type: String, required: false },
  albumArtists: { type: Array, required: true },
  albumArt: { type: String, required: true },
  previewUrl: { type: String, required: false },
  playlist: { type: String, require: false },
  trackDuration: { type: String, required: false },
  trackPlayCount: { type: String, required: false },
  userId: { type: String, required: true },
});

const Like = model("Like", likeSchema);

module.exports = Like;
