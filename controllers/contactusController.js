require("dotenv").config();
const logger = require("../config/logger");
const Contactus = require("../models/contactus");
const transporter = require("../services/nodemailer/mailer");

module.exports = {
  create: async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    try {
      const newContact = new Contactus({
        name: name,
        email: email,
        phone: phone,
        message: message,
      });
      await newContact.save();

      if (newContact) {
        let mailOptions = {
          from: `SOFTC <${process.env.MAILER_USER}>`,
          to: email,
          subject: "Welcome to SOFTC.",
          html: `<html>
                    <head>
                      <style>
                        /* Add some styling to make the email look nice */
                        body {
                          font-family: Arial, sans-serif;
                          background-color: #f8f8f8;
                          padding: 20px;
                        }
                        h1 {
                          color: #003366;
                          text-align: center;
                        }
                        p {
                          font-size: 16px;
                          line-height: 1.5;
                          margin-bottom: 20px;
                        }
                        .container {
                          max-width: 600px;
                          margin: 0 auto;
                          background-color: #fff;
                          padding: 20px;
                          border-radius: 10px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .btn {
                          background-color: #003366;
                          color: #fff;
                          padding: 12px 20px;
                          border-radius: 25px;
                          text-decoration: none;
                          margin-top: 20px;
                          display: inline-block;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h1>Thank you for contacting SOFTC</h1>
                        <p>We appreciate your interest in our services and products. We have received your message and will get back to you as soon as possible. </p>
                        <p>If you need immediate assistance, please call us at +94768021017.</p>
                        <p>Thank you for choosing SOFTC.</p>
                        <a href="https://softc.vercel.com" class="btn">Visit our website</a>
                      </div>
                    </body>
                  </html>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            res.send({ response: "success", message: err });
            res.send({ response: "error", message: err });
          } else {
            res.send({
              response: "success",
              message:
                "Your information has been received, and we'll be in touch soon.",
            });
          }
        });
        // res.send({response: "success", message : "Your information has been received, and we'll be in touch soon."})
      } else {
        res.send({
          response: "error",
          message: "Sorry, please try again later!",
        });
      }
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const contact = await Contactus.findAll();
      if (contact.length > 0) {
        res.send({ response: "success", contact });
      } else {
        res.send({ response: "error", message: "Contact doesn't exist" });
      }
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  getByid: async (req, res) => {
    const id = req.params.id;
    try {
      const contact = await Contactus.findAll({
        where: {
          id: id,
        },
      });
      if (contact.length > 0) res.send({ response: "success", contact });
      else res.send({ response: "error", message: "Contact doesn't exist" });
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      const contact = await Contactus.destroy({
        where: {
          id: id,
        },
      });
      if (contact > 0)
        res.send({ response: "success", message: "Successfully deleted." });
      else res.send({ response: "error", message: "Sorry, failed to delete!" });
    } catch (error) {
      res.send({ response: "error", message: error.message });
    }
  },
};
