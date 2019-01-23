const express = require('express');
const router = express.Router();

const { Bookmark } = require('../models/bookmark');
//const { ObjectID } = require('mongodb');


router.get('/', function(req, res) {
    Bookmark.find().then(function(bookmarks) {
        res.send(bookmarks);
    }).catch(function(err) {
        console.log(err);
    })
});


router.get('/tags', function(req, res) {
    let tagNames = req.query.names;
    console.log(tagNames);
    tagNames = tagNames.split(',');
    Bookmark.find({tags: {"$in": [tagNames[0], tagNames[1] ]}}).then(function(bookmarks){
        res.send(bookmarks)
    }).catch(function(err){
        res.send(err)
    })
})

router.get('/:id', function(req, res) {
    let id = req.params.id;
    Bookmark.findById(id).then(function(bookmark) {
        res.send(bookmark);
    }).catch(function(err) {
        res.send(err);
    })
});

router.post('/', function(req, res) {
    let body = req.body;
    let u = new Bookmark(body);
    u.save().then(function(bookmark) {
        res.send(bookmark);
    }).catch(function(err){
        res.send(err);
    })
});

router.put('/:id', function(req, res) {
    let body = req.body;
    let id = req.params.id;
    Bookmark.findByIdAndUpdate(id, { $set: body}, {new: true}).then(function(bookmark){
        res.send(bookmark);
    }).catch(function(err) {
        res.send(err);
    })
});

router.delete('/:id', function(req, res) {
    let id = req.params.id;
    Bookmark.findByIdAndDelete(id).then(function(bookmark) {
        res.send( {
                notice: 'Successfully deleted the bookmark'
        })
    }).catch(function(err) {
        res.send(err);
    })
});



router.get('/tags/:name', function(req, res) {
    let name = req.params.name;
    Bookmark.find({tags: name}).then(function(name){
        res.send(name);
    }).catch(function(err){
        res.send(err);
    })
});



module.exports = {
    bookmarksController: router
}
