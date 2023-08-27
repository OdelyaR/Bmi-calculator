const Bmi = require("../Model/bmi");

exports.createBmiData = async (req, res) => {
  try {
    const { name, height, weight } = req.body;
    console.log(name, height, weight);
    const bmi_cal = weight / (height / 100) ** 2;
    // Check if the user already exists
    let bmi = await Bmi.findOne({ name });
    if (bmi) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create a new bmi data
    bmi = await Bmi.create({
      name,
      height,
      weight,
      bmi: bmi_cal,
    });
    await bmi.save();

    res.status(201).json({ success: true, bmi });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

exports.updateBmi = async (req, res) => {
  const { name, height, weight } = req.body;
  const bmi_cal = weight / (height / 100) ** 2;

  // Find the bmi by ID
  await Bmi.findOne({ name })
    .then(async (bmi) => {
      if (!bmi) {
        // bmi not found
        return res.status(404).json({ message: "name not found" });
      }

      // bmi found, update the bmi data
      bmi.name = name;
      bmi.height = height;
      bmi.weight = weight;
      bmi.bmi = bmi_cal;

      // Save the updated bmi to the database
      return bmi.save();
    })
    .then((bmi) => {
      // Send the updated bmi data as a response
      res.json({ message: "Bmi updated successfully", bmi });
    })
    .catch((error) => {
      // Error occurred while updating the bmi
      console.error("Error updating bmi:", error);
      res.status(500).json({ message: "Error updating bmi" });
    });
};

exports.deleteBmi = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  Bmi.findOneAndRemove({ name })
    .then((bmi) => {
      if (!bmi) {
        // bmi not found
        return res.status(404).json({ message: "bmi not found" });
      }
      // bmi found and deleted
      res.json({ message: "bmi deleted successfully" });
    })
    .catch((error) => {
      // Error occurred while deleting the bmi
      console.error("Error deleting bmi:", error);
      res.status(500).json({ message: "Error deleting user" });
    });
};

exports.getBmiData = async (req, res) => {
  try {
    const bmi = await Bmi.find();
    res.status(200).json({ bmi });
  } catch (error) {
    res.status(500).json({ message: "Fetching bmi failed" });
  }
};
