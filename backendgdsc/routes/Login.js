const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require("../models/Admin")


router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase()
    
    try {
        console.log(email)
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(404).json({success: false, message: 'Admin not found' });
      }
  
      const validPassword = await bcrypt.compare(password, admin.password);
  
      if (validPassword) {
        //req.session.admin = { email: admin.email };
        //console.log(req.session.user);
        res.json({success: true, message: 'Login successful' });
      } else {
        //console.log('Incorrect password for user:', username);
        res.status(401).json({success: false, message: 'Incorrect password' });
      }
    } catch (error) {
      res.json({success: false, message: 'Internal Server error' });
      console.error('Error during login:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;