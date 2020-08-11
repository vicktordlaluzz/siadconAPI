const path = require('path');
const fs = require('fs');

const response = require('express');
const { v4: uuidv4 } = require('uuid');

const cargarDoc = async(req) => {
    if (!req.files || Object.keys(req.files.length === 0)) {
        return res.status(400).send({
            ok: false,
            msg: ''
        });
    }
}