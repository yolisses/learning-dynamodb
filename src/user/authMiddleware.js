export function authMiddleware(req, res, next) {
  res.user = {
    name: 'Neil',
    email: 'tyson@nasa.com',
    id: '2ace88c0f04a8b3afa7d',
  };

  next();
}
