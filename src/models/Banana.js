
var mongoose = require('mongoose');


var BananaModel;


var BananaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
	
	mood: {
		type: String,
		trim: true,
        required: true
	},
    
    color: {
		type: String,
        required: true,
		trim: true
    },
	
	flavor: {
		type: String,
        required: true,
		trim: true
	},
    
    createdData: {
        type: Date,
        default: Date.now
    }

});


BananaSchema.methods.toAPI = function() {
    return {
        name: this.name,
    };
};

BananaSchema.statics.findByName = function(name, callback) {

    var search = {
        name: name
    };

    return BananaModel.findOne(search, callback);
};


BananaModel = mongoose.model('Banana', BananaSchema);

//export our public properties
module.exports.BananaModel = BananaModel;
module.exports.BananaSchema = BananaSchema;