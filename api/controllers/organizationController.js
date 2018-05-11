const OrganizationModel = require('../models/organization');

function getOrganizations(request, response) {
    OrganizationModel.getOrganizations((error, organizations) => {
        if (error) {
            response.status(500).json({
                error: error.message
            });
        } else {
            response.status(200).json(organizations);
        }
    });
}

function getOrganizationById(request, response) {
    var id = request.params.id;

    OrganizationModel.getOrganizationById(id, (error, organization) => {
        if (error) {
            response.status(500).json({
                error: error.message
            });
        } else {
            if (!organization) {
                response.status(404).json({
                    error: `Could not find organization with ID: ${id}.`
                });
            } else {
                response.status(200).json(organization);
            }
        }
    });
}

function addOrganization(request, response) {
    var organization = request.body;

    OrganizationModel.addOrganization(organization, (error, organization) => {
        if (error) {
            response.status(500).json({
                error: error.message
            });
        } else {
            response.status(201).json(organization);
        }
    });
}

module.exports = {
    getOrganizations,
    getOrganizationById,
    addOrganization
};
