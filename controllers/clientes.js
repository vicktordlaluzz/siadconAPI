const { response } = require('express');
const Cliente = require('../models/cliente/cliente');
const Direccion = require('../models/cliente/direccion');
const Telefono = require('../models/cliente/telefono');

const getClientes = async(req, res = response) => {
    try {
        const clientes = await Cliente.find().sort('fecha')
            .populate('usuarioA', 'nombre')
            .populate('usuarioM', 'nombre');
        res.json({
            ok: true,
            clientes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const updateDirecciones = async(direcciones) => {
    try {
        for (const dir of Object.keys(direcciones)) {
            await Direccion.findByIdAndUpdate(direcciones[dir]._id, direcciones[dir]);
        }
    } catch (error) {
        console.log(error);
    }
};

const updateTelefonos = async(telefonos) => {
    try {
        for (const tel of Object.keys(telefonos)) {
            await Telefono.findByIdAndUpdate(telefonos[tel]._id, telefonos[tel]);
        }
    } catch (error) {
        console.log(error);
    }
};

const saveDireccion = async(dirs, idCliente) => {
    try {
        let direccion = new Direccion(dirs);
        direccion.cliente = idCliente;
        await direccion.save();

    } catch (error) {
        console.log(error);
    }
};

const saveTelefono = async(tels, idCliente) => {
    try {
        for (const tel of Object.keys(tels)) {
            let telefono = new Telefono(tels[tel]);
            telefono.cliente = idCliente;
            await telefono.save();
        }
    } catch (error) {
        console.log(error);
    }
};

const createCliente = async(req, res = response) => {
    try {
        const cliente = Cliente({
            nombre: req.body.nombre,
            apaterno: req.body.apaterno,
            amaterno: req.body.amaterno,
            rfc: req.body.rfc,
            curp: req.body.curp,
            nss: req.body.nss,
            email: req.body.email || null,
            usuarioA: req.uid,
            usuarioM: req.uid
        });
        const clienteDB = await cliente.save();
        const direccion = {
            calle: req.body.calle,
            numeroE: req.body.numeroE,
            numeroI: req.body.numeroI,
            colonia: req.body.colonia,
            estado: req.body.estado,
            municipio: req.body.municipio,
            cp: req.body.cp
        }
        await saveDireccion(direccion, clienteDB._id);
        await saveTelefono(req.body.telefonos, clienteDB._id);
        res.json({
            ok: true,
            clienteDB,
            msg: 'Se ha guardado el cliente con exito :D'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte al administrador'
        });
    }
};

const updateCliente = async(req, res = response) => {
    const usuario = req.uid;
    const cID = req.params.id;
    try {
        let clienteDB = await Cliente.findById(cID);
        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el cliente solicitado'
            });
        }
        if (req.body.direcciones) {
            await updateDirecciones(req.body.direcciones);
        }
        if (req.body.telefonos) {
            await updateTelefonos(req.body.telefonos);
        }
        let update = {
            nombre: req.body.cliente.nombre,
            apaterno: req.body.cliente.apaterno,
            amaterno: req.body.cliente.amaterno,
            email: req.body.cliente.email,
            fecha: new Date(),
            usuarioM: usuario,
            comentarios: req.body.cliente.comentarios,
        }
        console.log(req.body);
        console.log(update);
        await Cliente.findByIdAndUpdate(cID, update);
        res.json({
            ok: true,
            msg: 'Cliente actualizado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        })
    }
};

const getCliente = async(req, res = response) => {
    const clienteID = req.params.cliente;
    try {
        const cliente = await Cliente.findById(clienteID);
        const direcciones = await Direccion.find({ cliente: clienteID });
        const telefonos = await Telefono.find({ cliente: clienteID });
        res.json({
            ok: true,
            cliente,
            direcciones,
            telefonos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }
}

const deleteCliente = async(req, res = response) => {
    const id = req.params.id;
    // const uid = req.uid;

    try {
        const clienteDB = await Cliente.findById(id);

        // Verifica si existe el usuario
        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el cliente solicitado'
            });
        }

        // se guardan los cambios
        await Cliente.findByIdAndUpdate({ _id: id }, { activo: false }, { new: true });
        res.json({
            ok: true,
            msg: 'Cliente eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

module.exports = {
    getClientes,
    createCliente,
    updateCliente,
    deleteCliente,
    getCliente
}