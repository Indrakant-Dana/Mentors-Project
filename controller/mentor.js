const Mentors = require("../model/Mentors");

exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentors.find();
    res.status(200).json({
      status: "success",
      mentors,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMentor = async (req, res) => {
  try {
    const mentor = await Mentors.findById(req.params.id);
    res.status(200).json({
      status: "success",
      mentor,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createMentor = (req, res) => {
  res.status(200).json({
    status: "success",
    results: 100,
  });
};

exports.deleteMentor = async (req, res) => {
  try {
    await Mentors.findByIdAndUpdate(req.params.id, { active: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    throw err;
  }
};
