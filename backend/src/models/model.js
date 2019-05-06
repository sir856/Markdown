const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocumentSchema = new Schema({
    name: {
        type: String,
    },
    text: {
        type: String
    },
    changeDate: {
        type: String
    }
});

const Model = mongoose.model('documents', DocumentSchema);
module.exports = Model;
