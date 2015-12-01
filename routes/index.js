var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


/*Get Hello world page*/
router.get('/helloworld', function (req, res) {
    res.render('helloworld', {title: 'Hellow, World!'});
});

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

/*Get New User page*/
router.get('/newuser', function (req, res) {
    res.render('newuser', {title: 'Add new User'});
});

router.post('/adduser', function (req, res) {
        var db = req.db;

        var userNmae = req.body.username;
        var userEmail=req.body.useremail;

        var collection=db.get('usercollection');

        collection.insert({
            "username" : userNmae,
            "email" : userEmail
        }, function (err, doc) {
            if(err){
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else{
                res.redirect("userlist");
            }
        })

    }
)

module.exports = router;
