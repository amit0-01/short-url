const express = require('express');
const {handleGenerateNewShortURL, handleGetAnalytics, handleUrlDelete} = require ('../controllers/url');
const router = express.Router();

router.post('/',handleGenerateNewShortURL );
router.get('/analytics/:shortId', handleGetAnalytics);
router.delete('/:id',handleUrlDelete)

module.exports = router;