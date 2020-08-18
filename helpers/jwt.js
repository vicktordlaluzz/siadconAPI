const jwt = require('jsonwebtoken');


const generarJWT = (uid, usuario) => {

    return new Promise((resolve, reject) => {

        // se arma el payload
        const pyload = {
            uid,
            usuario
        };

        // se firma el payload 
        jwt.sign(pyload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                // se devuelve el token
                resolve(token);
            }
        });
    });

};

module.exports = {
    generarJWT
}