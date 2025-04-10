const express = require("express");
const {
  addAnnouncements,
  upload,
  getAnnouncements,
  deleteAnnouncement,
  updateAnnouncement
} = require("../controllers/announcementsController");

const router = express.Router();

/* POST methods*/
router.post("/announcements/add", upload.single("file"), addAnnouncements);

/* GET methods */
router.get("/announcements/:classroom_id", getAnnouncements);

/* DELETE methods */
router.delete("/announcements/delete/:id", deleteAnnouncement);

/* PUT methods */
router.post(
  "/announcements/update/:id",
  upload.single("file"),
  updateAnnouncement
);

module.exports = router;
