const validator = require('../validator/validator')
const UserModel = require('../model/user')
const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('../model/user');
const bcrypt = require('bcrypt')
// Adding Customer


const addCustomer  =async(req,res)=>{
    
    let {name,email,phoneNumber,password} = req.body;
    if(!validator.isValid(name)){
        return res.status(404).send({status:false,msg:"Please enter valid name"})
    }


    if(!validator.isValid(email)){
        return res.status(404).send({status:false,msg:"Please enter valid email"})
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        res.status(400).send({status:false, msg:"email is not valid"})
        return
    }

    let isEmailPresent = await UserModel.findOne({email:email});
    if(isEmailPresent){
        return res.status(400).send({status:false,msg:"Email is already present"})
    }



    if(!validator.isValid(phoneNumber)){
        return res.status(404).send({status:false,msg:"Please enter valid phoneNumber"})
    }


    if (!/^[1-9]{1}\d{9}$/.test(phoneNumber)) {
        return res.status(422).send({
          status: false,
          message:
            "please enter 10 digit number which does not contain 0 at starting position",
        });
      }


    let isPhoneNumber = await UserModel.findOne({phoneNumber:phoneNumber});

    if(isPhoneNumber){
        return res.status(400).send({status:false,msg:"phoneNumber is already present"})
    }


    if(!(password.length>7 && password.length<=16)){
        return res.status(400).send({status:false,msg:"Please follow correct password format"})
    }

    let customerIsAdded = await UserModel.create(req.body);

    return res.status(201).send({status:true,msg:customerIsAdded})

}

// Login with Customer



const loginWithCustomer = async (req,res)=>{
    
    let email = req.body.email;
    let password = req.body.password;
     
    if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid email" });
      }
     
      if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        res.status(400).send({status:false, msg:"email is not valid"})
        return
    }

      let userIsPresent = await UserModel.findOne({email:email});
    
      if(!userIsPresent){
        return res.status(400).send({status:false,msg:"false",data:"Email is not correct"})

      }
      let actualPassword = await userIsPresent.isValidPassword(password)

      if(!actualPassword){
        return res.status(400).send({status:false,msg:"false",data:"password is not correct"})

      }

    
      let token = jwt.sign({userId:userIsPresent._id},"Shubham");
      
      return res.status(200).send({status:true,message:"Token is generated Successfully",data:token});


}

// Login with Admin



const loginWithAdmin = async (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;
     
    if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid email" });
      }
      


      if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        res.status(400).send({status:false, msg:"email is not valid"})
        return
    }

      let userIsPresent = await UserModel.findOne({email:email,isAdmin:true});

      if(!userIsPresent){
        return res.status(400).send({status:false,msg:"false",data:"customer is not correct"})

      }

      let actualPassword = await userIsPresent.isValidPassword(password)

      if(!actualPassword){
        return res.status(400).send({status:false,msg:"false",data:"password is not correct"})

      }

      let token = jwt.sign({userId:userIsPresent._id},"Shubham");
      
      return res.status(200).send({status:true,message:"Token is generated Successfully",data:token});

}


// Question 3

const sameEmailAndDifferentName = async (req,res)=>{

    let {email,name} = req.body;

    
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        res.status(400).send({status:false, msg:"email is not valid"})
        return
    }

    let userIsPresent = await UserModel.findOne({email:email});

      if(!userIsPresent){
        return res.status(400).send({status:false,msg:"false",data:"email is not correct"})

      }

      let nameIsPresent = await UserModel.findOne({name:name});

      if(nameIsPresent){
        return res.status(400).send({status:false,msg:"false",data:"Name is already present"})

      }

      let updateTheName = await UserModel.findOneAndUpdate({email:email},{name:name},{new:true});


      return res.status(200).send({status:true,msg:"success",data:updateTheName})


}


const createAdmin = async (req,res)=>{
    let {name,email,phoneNumber,password} = req.body;
    if(!validator.isValid(name)){
        return res.status(404).send({status:false,msg:"Please enter valid name"})
    }


    if(!validator.isValid(email)){
        return res.status(404).send({status:false,msg:"Please enter valid email"})
    }

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        res.status(400).send({status:false, msg:"email is not valid"})
        return
    }

    let isEmailPresent = await UserModel.findOne({email:email});
    if(isEmailPresent){
        return res.status(400).send({status:false,msg:"Email is already present"})
    }



    if(!validator.isValid(phoneNumber)){
        return res.status(404).send({status:false,msg:"Please enter valid phoneNumber"})
    }


    if (!/^[1-9]{1}\d{9}$/.test(phoneNumber)) {
        return res.status(422).send({
          status: false,
          message:
            "please enter 10 digit number which does not contain 0 at starting position",
        });
      }


    let isPhoneNumber = await UserModel.findOne({phoneNumber:phoneNumber});

    if(isPhoneNumber){
        return res.status(400).send({status:false,msg:"phoneNumber is already present"})
    }


    if(!(password.length>7 && password.length<=16)){
        return res.status(400).send({status:false,msg:"Please follow correct password format"})
    }

    let customerIsAdded = await UserModel.create(req.body);

    return res.status(201).send({status:true,msg:customerIsAdded})

}


module.exports.createAdmin = createAdmin
module.exports.sameEmailAndDifferentName = sameEmailAndDifferentName
module.exports.loginWithAdmin = loginWithAdmin
module.exports.loginWithCustomer = loginWithCustomer
module.exports.addCustomer = addCustomer