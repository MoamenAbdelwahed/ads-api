let db = require('../models/index');

exports.create = (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      message: "ad title can not be empty"
    });
  }
  if(!req.body.description) {
    return res.status(400).send({
      message: "ad description can not be empty"
    });
  }

  const ad = new db.Ad({
    title: req.body.title,
    description: req.body.description,
    categoryId: req.body.category,
    advertiser: req.body.advertiser,
    isFree: req.body.isFree,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    photo: req.body.photo,
  });
  ad.save()
    .then(data => {
      if (req.body.tags.length > 0) {
        req.body.tags.forEach(function (tag) {
          const adTag = new db.AdTag({
            tagId: tag,
            adId: ad.id
          });
          adTag.save();
        })
      }
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Ad."
    });
  });
};

exports.findAll = (req, res) => {
  let params = [];
  if (req.body.category) {
    params.push({
        model: db.Category,
        where: { id: req.body.category }
    });
  }
  if (req.body.tag) {
    params.push({
        model: db.Tag,
        where: { id: req.body.tag }
    });
  }
  if (req.body.advertiser) {
    params.push({
        model: db.User,
        where: { id: req.body.advertiser }
    });
  }
  db.Ad.findAll({
    include: params
  })
    .then(ads => {
      res.send(ads);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving ads."
    });
  });
};

exports.findOne = (req, res) => {
  db.Ad.findByPk(req.params.adId)
    .then(ad => {
      if(!ad) {
        return res.status(404).send({
          message: "Ad not found with id " + req.params.adId
        });
      }
      res.send(ad);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Ad not found with id " + req.params.adId
      });
    }
    return res.status(500).send({
      message: "Error retrieving ad with id " + req.params.adId
    });
  });
};

exports.update = (req, res) => {
  db.Ad.update(req.body, {
    where: { id: req.params.adId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ad was updated successfully."
        });
      } else {
        res.send({
          message: `This ad not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating this Ad"
      });
    });
};

exports.delete = (req, res) => {
  db.Ad.destroy({
    where: { id: req.params.adId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ad was deleted successfully!"
        });
      } else {
        res.send({
          message: `This ad not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete this ad"
      });
    });
};

exports.findAdvertisers = (req, res) => {
  db.User.findAll({
    include: [{
      model: db.Ad
    }]
  })
    .then(advertisers => {
      res.send(advertisers);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving advertisers."
    });
  });
}

exports.myAds = (req, res) => {
  db.Ad.findAll({
    where: {
      advertiser: req.user.id
    }
  })
    .then(advertisers => {
      res.send(advertisers);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving advertisers."
    });
  });
}
