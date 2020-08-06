const { response } = require('express');
const Role = require('../models/usuario/role');

const getRoles = async(req, res = response) => {
    try {
        const roles = await Role.find();
        res.json({
            ok: true,
            roles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }

};

const createRole = async(req, res = response) => {
    try {
        const role = Role(req.body);
        await role.save();
        res.json({
            ok: true,
            role
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }

};

module.exports = {
    getRoles,
    createRole
}