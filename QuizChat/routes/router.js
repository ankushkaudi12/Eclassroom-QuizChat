const express = require('express');
const { addAnnouncements, upload } = require('../controllers/announcementsController');

const router = express.Router();

/* POST methods*/
router.post('/announcements/add', upload.single("file"), addAnnouncements);

module.exports = router;
