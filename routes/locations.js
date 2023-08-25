var express = require('express');
var router = express.Router();
const HANDLER = require('../handler/api-handler');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    let handler = new HANDLER(req);
    let locations = await handler.getLocations();
    res.status(200).json(locations);
  } catch (error) {
    switch (error.code) { 
      case 'ECONNREFUSED':
        res.status(500).json({ error: { code: error.code, message: 'The server rejected your request.' }});
        break;
      default:
        res.status(500).json({ error: { code: error.code, message: 'Unknown error', more: error } });
        break;
    }
  }
});

module.exports = router;
