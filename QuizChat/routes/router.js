const express = require('express');
const { addAnnouncements } = require('../controllers/announcementsController');

const router = express.Router();

/* POST methods*/
router.post('/announcements/add', addAnnouncements);

module.exports = router;
