let db = require('../models/index');

exports.create = (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      message: "Tag name can not be empty"
    });
  }

  const tag = new db.Tag({
    name: req.body.name
  });

  tag.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Tag."
    });
  });
};

exports.findAll = (req, res) => {
  db.Tag.findAll()
    .then(tags => {
      res.send(tags);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tags."
    });
  });
};

exports.findOne = (req, res) => {
  db.Tag.findByPk(req.params.tagId)
    .then(tag => {
      if(!tag) {
        return res.status(404).send({
          message: "Tag not found with id " + req.params.tagId
        });
      }
      res.send(tag);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Tag not found with id " + req.params.tagId
      });
    }
    return res.status(500).send({
      message: "Error retrieving tag with id " + req.params.tagId
    });
  });
};

exports.update = (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      message: "Tag name can not be empty"
    });
  }
  db.Tag.update(req.body, {
    where: { id: req.params.tagId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tag was updated successfully."
        });
      } else {
        res.send({
          message: `This tag not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating this Tag"
      });
    });
};

exports.delete = (req, res) => {
  db.Tag.destroy({
    where: { id: req.params.tagId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!"
        });
      } else {
        res.send({
          message: `This tag not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete this tag"
      });
    });
};
