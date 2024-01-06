require('dotenv').config();
// Middleware to validate API key
const verifyApiKey = (req, res, next) => {
    
    const apiKey = req.headers['x-api-key'];
    
    if (!req.originalUrl.startsWith("/docs/") && (!apiKey || apiKey !== process.env['API_KEY'].toString())) {
      return res.status(401).json({ error: 'Missing API key in header' });
    }
  
    next();
  };

module.exports = verifyApiKey;