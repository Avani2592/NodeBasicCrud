const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth.middleware');
const itemcontroller= require('../controllers/item.controller');
router.post('/create',auth,itemcontroller.create);
router.get('/all',auth,itemcontroller.getAll);
router.get('/:id',auth,itemcontroller.getById);
router.put('/update/:id',auth,itemcontroller.update);
router.delete('/delete/:id',auth,itemcontroller.delete);

module.exports=router;