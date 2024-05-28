import jwt from 'jsonwebtoken';

class Auth {
  static KEY = 'secret_key';

  static authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, Auth.KEY, (err, user) => {
      if (err) return res.sendStatus(403); // Token not valid
      req.user = user;
      next();
    });
  }

  static generateToken(userId) {
    return jwt.sign({ userId }, Auth.KEY, { expiresIn: '1h' });
  }
}

export default Auth;
