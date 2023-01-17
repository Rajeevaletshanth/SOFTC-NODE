require("dotenv").config();
const logger = require("../config/logger");
const Resumes = require("../models/resumes");
// const Upload = require('../models/upload');
const transporter = require("../services/nodemailer/mailer");

const multer = require('multer');
// const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/resumes');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../public', 'resumes'),
//     filename: function (req, file, cb) {   
//         // null as first argument means no error
//         cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));  
//     }
// });

module.exports = {
  create: (upload.single('file'), async (req, res, next) => {

    console.log(req.file)

    // const name = req.body.name;
    // const email = req.body.email;
    // const phone = req.body.phone;
    // const resume = req.body.resume;
    // // const file = req.body.resume;

    // try {         
    //         const newResume = new Resumes({
    //             name: name,
    //             email: email,
    //             phone: phone,
    //             resume: resume
    //         })
    //         await newResume.save();
    //         if(newResume)
    //             res.json({ response: "success", message: "Your cv uploaded successfully." })
    //         else
    //             res.json({ response: "error", message: "Sorry cannot upload file. Please try again later." })

    //     // }); 

    // } catch (error) {
    //     return res.json({response: "error", message: error.message});
    // }
      
  }),

  getAll: async (req, res) => {
    try {
      const resume = await Resumes.findAll();
      if (resume.length > 0) {
        res.send({ response: "success", resume });
      } else {
        res.send({ response: "error", message: "Resumes doesn't exist" });
      }
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  getByid: async (req, res) => {
    const id = req.params.id;
    try {
      const resume = await Resumes.findAll({
        where: {
          id: id,
        },
      });
      if (resume.length > 0) res.send({ response: "success", resume });
      else res.send({ response: "error", message: "Resume doesn't exist" });
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const resume = await Resumes.destroy({
        where: {
          id: id,
        },
      });
      if (resume > 0)
        res.send({ response: "success", message: "Successfully deleted." });
      else res.send({ response: "error", message: "Sorry, failed to delete!" });
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },
};
