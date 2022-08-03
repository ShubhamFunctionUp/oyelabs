const Validator = require('../validator/validator')
const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')


const addCustomer  =async(req,res)=>{
    let {name,email,phoneNumber} = req.body;
    if(!Validator.isValid(name)){
        return res.status(404).send({status:false,msg:"Please enter valid name"})
    }


    if(!Validator.isValid(email)){
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


    if(!Validator.isValid(phoneNumber)){
        return res.status(404).send({status:false,msg:"Please enter valid phoneNumber"})
    }

    let isPhoneNumber = await UserModel.findOne({phoneNumber:phoneNumber});

    if(isPhoneNumber){
        return res.status(400).send({status:false,msg:"phoneNumber is already present"})
    }



    let customerIsAdded = await UserModel.create(req.body);

    return res.status(201).send({status:true,msg:customerIsAdded})

}

const loginWithCustomer = async (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
     
    if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid email" });
      }
      
      let userIsPresent = await UserModel.findOne({email:email});
      if(!userIsPresent){
        return res.status(400).send({status:false,msg:"false",data:"Email is not correct"})

      }
      let actualPassword = await userIsPresent.isValidPassword(password)

      if(!actualPassword){
        return res.status(400).send({status:false,msg:"false",data:"password is not correct"})

      }

    //   console.log(actualPassword);
    
      let token = jwt.sign({userId:userIsPresent._id},"Shubham");
      
      return res.status(200).send({status:true,message:"Token is generated Successfully",data:token});


}

const loginWithAdmin = async (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;
     
    if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid email" });
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


module.exports.loginWithAdmin = loginWithAdmin
module.exports.loginWithCustomer = loginWithCustomer
module.exports.addCustomer = addCustomer