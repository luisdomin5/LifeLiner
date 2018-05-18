const AudienceModel = require('../models/audience');
const audiencesValidator = require('../validators/audiencesValidator');
const language = require('../data/language.json');

async function getAudiences(request, response) {
    try {
        var audiences = await AudienceModel.getAudiences();
        response.status(200).json(audiences);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

async function getAudience(request, response) {
    try {
        var id = request.params.id;
        var audience = await AudienceModel.getAudience(id);
        if (!audience) {
            response.status(404).json({
                error: `Could not find audience with ID: ${id}.`
            });
        } else {
            response.status(200).json(audience);
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

async function addAudience(request, response) {
    try {
        var audienceToAdd = request.body;
        var audience = await AudienceModel.addAudience(audienceToAdd);
        response.status(201).json(audience);
    } catch (error) {
        console.log(error.name);
        console.log(error.code);
        if (
            error.name == 'ValidationError' ||
            error.message.includes('E11000')
        ) {
            response.status(400).json({
                error: error.message
            });
        } else {
            console.log(error.message);
            response.status(500).json({
                error: language.errors['500']
            });
        }
    }
}

async function updateAudience(request, response) {
    try {
        var id = request.params.id;
        var update = request.body;
        var audience = await AudienceModel.updateAudience(id, update);
        if (!audience) {
            response.status(404).json({
                error: `Could not find audience with ID: ${id}.`
            });
        } else {
            response.status(200).json(audience);
        }
    } catch (error) {
        if (
            error.name == 'ValidationError' ||
            error.message.includes('E11000')
        ) {
            response.status(400).json({
                error: error.message
            });
        } else {
            console.log(error.message);
            response.status(500).json({
                error: language.errors['500']
            });
        }
    }
}

// TODO: Don't remove unless not being used
async function removeAudience(request, response) {
    try {
        var id = request.params.id;
        if (await audiencesValidator.audienceIdUsed(id)) {
            response.status(403).json({
                error: `The ID: ${id} is currently being used.`
            });
        } else {
            var audience = await AudienceModel.removeAudience(id);
            if (!audience) {
                response.status(404).json({
                    error: `Could not find audience with ID: ${id}.`
                });
            } else {
                response.status(200).json(audience);
            }
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            error: language.errors['500']
        });
    }
}

module.exports = {
    getAudiences,
    getAudience,
    addAudience,
    updateAudience,
    removeAudience
};
