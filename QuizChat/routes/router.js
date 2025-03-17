const express = require('express');
const { saveComment, getComments } = require('../controllers/commentControllers');

const router = express.Router();

/* POST methods*/
router.post('/comments/add', saveComment);

/* GET methods */
router.get('/comments/:classroom_id', getComments);

module.exports = router;
