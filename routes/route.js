const express = require('express');
const router = express.Router();

const Contact = require('../models/contact');

//retrieving contracts data
router.get('/contacts', (req, res, next)=>{
    Contact.find((err, contacts)=>{
        res.json(contacts);
    });
});

//adding contacts data
router.post('/contact', (req, res, next)=>{
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone
    });
    newContact.save((err, contacts)=>{
        if(err){
            res.json({msg: 'Failed to add'});
        }
        else{
            res.json(contacts);
        }
    });
});

//delete contacts data
router.delete('/contact/:id', (req, res, next)=>{
    Contact.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});


module.exports = router;