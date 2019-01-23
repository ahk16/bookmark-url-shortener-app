const mongoose = require('mongoose');
const validator = require('validator');
const shortHash = require('shorthash');
const Schema = mongoose.Schema;

const bookmarkSchema = new Schema ({
    title: {
        type: String,
        required: true,
        trim: true
    },
    tags: {
        type: [String],
        required: true
    },
    originalURL: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: function() {
                return 'Invalid URL'
            }
        }
    },
    hashedURL: {
        type: String
    },
    createdAt: {
        type: Date,
       // required: true,
        default: Date.now
    }
})

bookmarkSchema.pre('save', function(next) {
    let bookmark = this;
    let hash = shortHash.unique(this.originalURL);
    this.hashedURL = hash;
    next();
     
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = {
    Bookmark
}
