const Album = require("../../models/album");

const albumsDataController = {
  index(req, res, next) {
    Album.find({}, (err, foundAlbums) => {
      if (err) {
        res.status(400).send({
          msg: err.message,
        });
      } else {
        res.locals.data.albums = foundAlbums;
        next();
      }
    });
  },

  async destroy(req, res, next) {
    try {
      const foundAlbum = await Album.findOne({
        albumId: req.params.id,
      });

      if (foundAlbum._id) {
        const deletedAlbum = await Album.findByIdAndDelete(foundAlbum._id);
        res.locals.data.album = deletedAlbum;
        next();
      } else {
        res.status(400).send({
          msg: "album ID not found",
        });
      }

      console.log(`albumId: ${foundAlbum}`);
    } catch (error) {
      console.log(error);
    }
  },
  async update(req, res, next) {
    try {
      const foundAlbum = await Album.findOne({
        albumId: req.params.id,
      });

      if (foundAlbum._id) {
        const updatedAlbum = await Album.findByIdAndUpdate(
          foundAlbum._id,
          req.body,
          { new: true }
        );
        res.locals.data.album = updatedAlbum;
        next();
      } else {
        res.status(400).send({
          msg: "album ID not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  create(req, res, next) {
    Album.create(req.body, (err, createdAlbum) => {
      if (err) {
        res.status(400).send({
          msg: err.message,
        });
      } else {
        res.locals.data.album = createdAlbum;
        next();
      }
    });
  },
  show(req, res, next) {
    Album.findById(req.params.id, (err, foundAlbum) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: "Could not find an album with that ID",
        });
      } else {
        res.locals.data.album = foundAlbum;
        next();
      }
    });
  },
};

const albumsApiController = {
  index(req, res, next) {
    res.json(res.locals.data.albums);
  },
  show(req, res, next) {
    res.json(res.locals.data.album);
  },
};

module.exports = { albumsDataController, albumsApiController };
