const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
    Summary     : String,
    Location    : String,
    Description : String,
    Start       : Date,
    End         : Date,
    Attendees   : [ String ],
}, { collection: 'event' });

module.exports = mongoose.model('event', EventSchema);
