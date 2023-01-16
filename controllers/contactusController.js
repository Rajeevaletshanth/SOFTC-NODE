require('dotenv').config();
const logger = require('../config/logger');
const Contactus = require('../models/contactus');

module.exports = {
    create: async (req, res) => {
        
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const message = req.body.message;

        try{

            const newContact = new Contactus({
                name: name,
                email: email,
                phone: phone,
                message: message
            })
            await newContact.save();

            if(newContact){
                res.send({response: "success", message : "Your information has been received, and we'll be in touch soon."})
            }else{
                res.send({response : "error", message : "Sorry, please try again later!"})
            }

        }catch(error){
            res.send({response: "error", message : error.message});
        }

    },

    getAll: async (req, res) => {

        try{
            const contact = await Contactus.findAll()
            if(contact.length > 0){
                res.send({response: "success", contact})
            }else{
                res.send({response: "error", message : "Contact doesn't exist"})
            }
        }catch(error) {
            res.send({response: "error", message : error.message});
        }
    },

    getByid: async (req, res) => {
        const id = req.params.id
        try {
            const contact = await Contactus.findAll({
                where: {
                    id: id
                }
            })
            if(contact.length > 0)
                res.send({response: "success", contact})
            else
                res.send({response: "error", "message" : "Contact doesn't exist"})
        } catch(error) {
            res.send({response: "error", message : error.message});
        }
    },

    delete : async(req, res) => {
        const  { id } = req.params;

        try {
            const contact = await Contactus.destroy({
                where: {
                    id: id
                }
            })
            if(contact > 0)
                res.send({response: "success", message : "Successfully deleted."})
            else
                res.send({response : "error", message : "Sorry, failed to delete!"})
        } catch(error) {
            res.send({response: "error", message : error.message});                     
        }
    },



}