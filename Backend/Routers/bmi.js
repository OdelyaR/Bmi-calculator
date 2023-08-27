const express = require("express");
const router = express.Router();
const { checkUserRoles } = require("../Middleware/Auth");

const {
  createBmiData,
  updateBmi,
  deleteBmi,
  getBmiData,
} = require("../Contorllers/bmi");

router.route("/bmi").post(checkUserRoles(["user"]), createBmiData);
router.route("/update-bmi").put(checkUserRoles(["user"]), updateBmi);
router.route("/delete-bmi/").delete(checkUserRoles(["user"]), deleteBmi);
router.route("/get-bmi/").get(checkUserRoles(["user"]), getBmiData);

module.exports = router;
