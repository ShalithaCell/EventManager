const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
    Summary     : String,
    Location    : String,
    Description : String,
    imageURL    : String,
    Start       : Date,
    End         : Date,
    Attendees   : [ String ],
    Category    : String,
}, { collection: 'event' });

module.exports = mongoose.model('event', EventSchema);
