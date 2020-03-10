const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('x-Access-Token');
    if(!token) return res.status(401).send('Access Denied, No token Provided');
    try{
        const decoded = jwt.verify(token, 'thoughtworks');
        req.user = decoded;
        next();
    }catch(e) {
        return res.status(401).send('Invalid token');
    }
}