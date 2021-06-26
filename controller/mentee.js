const Mentees = require("../model/mentees");

exports.getAllMentees = async (req, res) => {
  try {
    const mentees = await Mentees.find();
    res.status(200).json({
      status: "success",
      mentees,
    });
  } catch (err) {
    throw err;
  }
};

exports.getMentee = async (req, res) => {
  try {
    const mentee = await Mentees.findById(req.params.id);
    res.status(200).json({
      status: "success",
      mentee,
    });
  } catch (err) {
    throw err;
  }
};

exports.createMentee = (req, res) => {
  res.status(200).json({
    status: "success",
    results: 100,
  });
};

exports.deleteMentee = async (req, res) => {
  try {
    await Mentees.findByIdAndUpdate(req.params.id, { active: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    throw err;
  }
};
