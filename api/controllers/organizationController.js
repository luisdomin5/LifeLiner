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

function getOrganization(request, response) {
    var id = request.params.id;

    OrganizationModel.getOrganization(id, (error, organization) => {
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
            if (error.name == 'ValidationError') {
                response.status(400).json({
                    error: error.message
                });
            } else {
                response.status(500).json({
                    error: error.message
                });
            }
        } else {
            response.status(201).json(organization);
        }
    });
}

function updateOrganization(request, response) {
    var id = request.params.id;
    var organization = request.body;

    OrganizationModel.updateOrganization(
        id,
        organization,
        { runValidators: true, new: true },
        (error, organization) => {
            if (error) {
                if (error.name == 'ValidationError') {
                    response.status(400).json({
                        error: error.message
                    });
                } else {
                    response.status(500).json({
                        error: error.message
                    });
                }
            } else {
                if (!organization) {
                    response.status(404).json({
                        error: `Could not find organization with ID: ${id}.`
                    });
                } else {
                    response.status(200).json(organization);
                }
            }
        }
    );
}

function removeOrganization(request, response) {
    var id = request.params.id;

    OrganizationModel.removeOrganization(id, (error, organization) => {
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

module.exports = {
    getOrganizations,
    getOrganization,
    addOrganization,
    updateOrganization,
    removeOrganization
};
