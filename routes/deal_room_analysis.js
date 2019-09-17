var express = require('express');
var router = express.Router();
var middleware = require('../middleware');
const multer = require('multer');

//@desc create a storage object: destination and filename. They are both functions that determine where the file should be stored.
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './upload');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
var upload = multer({ storage: storage });

//@route GET /deal_room_analysis
//@desc  GET the search mask for deal_room_analysis
//@acces Public
//@ToDo  middleware.isLoggedIn,
router.get('/deal_room_analysis', function(req, res) {
  res.render('./deal_room_analysis/search_mask_deal_room_analysis', {
    currentUser: req.user
  });
});

//@route POST /deal_room_analysis
//@desc  POST UPLODE ZONE  for deal_room_analysis
//@acces Public
router.post('/deal_room_analysis', upload.array('profile', 20), (req, res) => {
  try {
    var fileinfo = req.files;
    var title = req.body.title;
    console.log(title);
    res.send(fileinfo);
    res.render('./deal_room_analysis/search_mask_deal_room_analysis', {
      currentUser: req.user
    });
  } catch (err) {
    console.err(err);
    res.send(400);
  }
});
module.exports = router;
