import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
  return jwt.sign({ ...user }, config.JWT_SECRET, {
    expiresIn: '24h'
  });
}

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid token!' });
      }
      req.user = decode;
      return next();
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied!' });
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin token invalid!' });
}

export { getToken, isAuth, isAdmin };