const express = require('express');
const { addAnnouncements, upload, getAnnouncements } = require('../controllers/announcementsController');

const router = express.Router();

/* POST methods*/
router.post('/announcements/add', upload.single("file"), addAnnouncements);

/* GET methods */
router.get('/announcements/:classroom_id', getAnnouncements);

module.exports = router;
