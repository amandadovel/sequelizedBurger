
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  db.Burger.findAll({}).then(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject.burgers[0]);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  db.Burger.create({
    burger_name: req.body.name,
    devoured: req.body.devoured
  }).then(function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  // var condition = "id = " + req.params.id;

  // console.log("condition", condition);

  db.Burger.update({
   burger_name: req.body.name,
   devoured: req.body.devoured
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  // }, condition, function (result) {
  //   if (result.changedRows == 0) {
  //     // If no rows were changed, then the ID must not exist, so 404
  //     return res.status(404).end();
  //   } else {
  //     res.status(200).end();
  //   }
  });


router.delete("/api/burgers/:id", function (req, res) {
  //var condition = "id = " + req.params.id;

  db.Burger.destroy({
    where: {
      id: req.params.id
    }
    // condition, function (result) {
    // if (result.affectedRows == 0) {
    //   // If no rows were changed, then the ID must not exist, so 404
    //   return res.status(404).end();
    // } else {
    //   res.status(200).end();
    // }
  }).then(function(result) {
    res.json(result);
  })
});

// Export routes for server.js to use.
module.exports = router;