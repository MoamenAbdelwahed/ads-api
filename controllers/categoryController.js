let db = require('../models/index');

exports.create = (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      message: "Tag name can not be empty"
    });
  }

  const category = new db.Category({
    name: req.body.name
  });

  category.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the category."
    });
  });
};

exports.findAll = (req, res) => {
  db.Category.findAll()
    .then(categories => {
      res.send(categories);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving categories."
    });
  });
};

exports.findOne = (req, res) => {
  db.Category.findByPk(req.params.categoryId)
    .then(category => {
      if(!category) {
        return res.status(404).send({
          message: "Category not found with id " + req.params.categoryId
        });
      }
      res.send(category);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Category not found with id " + req.params.categoryId
      });
    }
    return res.status(500).send({
      message: "Error retrieving category with id " + req.params.categoryId
    });
  });
};

exports.update = (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      message: "Category name can not be empty"
    });
  }
  db.Category.update(req.body, {
    where: { id: req.params.categoryId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `This category not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating this Category"
      });
    });
};

exports.delete = (req, res) => {
  db.Category.destroy({
    where: { id: req.params.categoryId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `This category not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete this category"
      });
    });
};
