var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');;

mongoose.connect("mongodb://localhost/usersDemo");
var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
var Users = mongoose.model("User", UserSchema);

// INDEX:
router.get('/', function(req, res) {
  Users.find({}, function (err, docs) {
    res.render('users/index', { users: docs });
  })
});

// NEW
router.get("/new", function (req, res) {
  res.render('users/new');
})

// CREATE
router.post("/", function (req, res) {
  var b = req.body;
  new Users({
    name: b.name,
    email: b.email,
    age: b.age
  }).save(function (err, docs) {
    if(err) res.json(err);
    res.redirect('/');
  });
})

//SHOW

router.get("/:user", function (req, res) {
  res.send("name: " + req.user)
  // res.render('users/show', { user: req.name });
})

// router.param('name', function (req, res, name, next) {
//   Users.find( {}), function (err, docs) {
//     req.user = docs[0];
//     next();
//   }
// })
module.exports = router;
