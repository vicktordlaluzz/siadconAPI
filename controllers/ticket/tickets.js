const Ticket = require('../../models/ticket/ticket');
const { response } = require('express');

const getTickets = async(req, res = response) => {
    try {
        const tickets = await Ticket.find();
        res.json({
            ok: true,
            tickets
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favpr contacte al administrador'
        });
    }
};

const createTicket = async(req, res = response) => {
    try {
        let ticket = new Ticket(req.body);
        ticket.usuario = req.uid;
        ticket.expedicion = new Date();
        const ticketDB = await ticket.save();
        res.json({
            ok: true,
            msg: 'Se ha guardado exitosamente',
            ticketDB
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }

};

const updateTicket = async(req, res) => {
    const id = req.params.id;
    try {
        const ticket = await Ticket.findByIdAndUpdate(id, {
            comentarios: req.body.comentarios,
            estado: req.body.estado,
            comprobantePago: req.body.comprobantePago || null,
            formaPago: req.body.formaPago,
            monto: req.body.monto
        }, { new: true });
        res.json({
            ok: true,
            msg: 'Se ha actualizado con exito'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }
}

module.exports = {
    getTickets,
    createTicket,
    updateTicket
}