const express = require('express');
const app = express();
const { mongoose } = require('./config/db');
const { bookmarksController } = require('./app/controllers/bookmarks_controller');
const { Bookmark } = require('./app/models/bookmark');
const port = 3000;



app.use(express.json());

app.get('/', function(req, res) {
    res.send('Welcome to the site');
});

app.use('/bookmarks', bookmarksController)


app.get('/:hash', function(req, res) {
    let hashUrl = req.params.hash;
    
    Bookmark.findOne({hashedURL: hashUrl}).then(function(bookmark){
        res.redirect(bookmark.originalURL);
    }).catch(function(err){
        res.send(err);
    })
})





app.listen(port, function() {
    console.log('Listening on port', port);
})