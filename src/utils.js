const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL ma pa mi now';

// Helper function called in resolvers for authentication
const getUserId = (context) => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }
  throw new Error('Authentication failed');
};

module.exports = {
  APP_SECRET,
  getUserId,
};