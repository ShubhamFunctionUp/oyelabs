const express = require('express');
const router = express();
const auth = require('../auth/auth')
router.get('/',async ()=>(console.log("router")))
const UserController = require('../controller/userController')

// Customer add api 
router.post('/createAdmin',UserController.createAdmin);
router.post('/addCustomer',auth.authorization,UserController.addCustomer)
router.post('/loginwithCustomer',UserController.loginWithCustomer);
router.post('/loginwithAdmin',UserController.loginWithAdmin)



// Task 3
router.put('/modifyName',UserController.sameEmailAndDifferentName);

module.exports = router