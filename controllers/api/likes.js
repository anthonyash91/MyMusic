const Like = require("../../models/like");

const likesDataController = {
  index(req, res, next) {
    Like.find({}, (err, foundLikes) => {
      if (err) {
        res.status(400).send({
          msg: err.message,
        });
      } else {
        res.locals.data.likes = foundLikes;
        next();
      }
    });
  },
  async destroy(req, res, next) {
    try {
      const foundLike = await Like.findOne({
        trackId: req.params.id,
      });

      if (foundLike._id) {
        const deletedLike = await Like.findByIdAndDelete(foundLike._id);
        res.locals.data.like = deletedLike;
        next();
      } else {
        res.status(400).send({
          msg: "like ID not found",
        });
      }
      console.log(`likeId: ${foundLike}`);
    } catch (error) {
      console.log(error);
    }
  },
  update(req, res, next) {
    Like.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updatedLike) => {
        if (err) {
          res.status(400).send({
            msg: err.message,
          });
        } else {
          res.locals.data.like = updatedLike;
          next();
        }
      }
    );
  },
  create(req, res, next) {
    Like.create(req.body, (err, createdLike) => {
      if (err) {
        res.status(400).send({
          msg: err.message,
        });
      } else {
        res.locals.data.like = createdLike;
        console.log(req.body.trackId);
        next();
      }
    });
  },
  show(req, res, next) {
    Like.findById(req.params.id, (err, foundLike) => {
      if (err) {
        res.status(404).send({
          msg: err.message,
          output: "Could not find an like with that ID",
        });
      } else {
        res.locals.data.like = foundLike;
        next();
      }
    });
  },
};

const likesApiController = {
  index(req, res, next) {
    res.json(res.locals.data.likes);
  },
  show(req, res, next) {
    res.json(res.locals.data.like);
  },
};

module.exports = { likesDataController, likesApiController };
