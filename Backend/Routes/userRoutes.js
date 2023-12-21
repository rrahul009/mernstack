const { register, allUser, editUser, deleteUser } = require('../controllers/userControllers')
const router=require('express').Router()
router.post('/register',register)
router.get('/getalluser',allUser)
router.put('/edituser/:id',editUser)
router.delete('/deleteruser/:id',deleteUser)
module.exports=router