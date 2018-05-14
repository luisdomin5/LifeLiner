const mongoose = require('mongoose');
const AudienceSchema = require('../schemas/audience');

var AudienceModel = mongoose.model('audiences', AudienceSchema);

AudienceModel.getAudiences = async () => {
    return await AudienceModel.find().exec();
};

AudienceModel.getAudience = async id => {
    return await AudienceModel.findById(id).exec();
};

AudienceModel.addAudience = async audience => {
    return await AudienceModel.create(audience);
};

AudienceModel.updateAudience = async (id, update) => {
    return await AudienceModel.findByIdAndUpdate(id, update, {
        runValidators: true,
        new: true
    }).exec();
};

AudienceModel.removeAudience = (id, callback) => {
    AudienceModel.findByIdAndRemove(id, callback);
};

module.exports = AudienceModel;
