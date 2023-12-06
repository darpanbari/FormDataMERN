import RegistrationModel from "../models/RegistrationModel.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const handleFileUpload = upload.single('resume');

export const registerController = async (req, res) => {
  try {
    handleFileUpload(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'Error in file upload',
          error: err.message,
        });
      }

      const { name, dateOfBirth, gender, hobbies, state, address, resume } = req.body;

      try {
        const user = new RegistrationModel({
          name,
          dateOfBirth,
          gender,
          hobbies,
          state,
          address,
          // resume
          resume: req.file.path, 
        });

        await user.save();

        res.status(201).send({
          success: true,
          message: 'User Registered Successfully',
          path: `${process.env.BASE_URL_}`,
          user,
        });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: 'Error in Registration',
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in Registration',
      error: error.message,
    });
  }
};

export const getDataController = async (req, res) => {
  try {
    const data = await RegistrationModel.find({});
    if (data) {
      res.status(200).json({
        success: true,
        data: data,
        message: "Data Fetch Successfully",
        path: `${process.env.BASE_URL_}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
