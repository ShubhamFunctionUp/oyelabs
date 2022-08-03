const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const CustomerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trime:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
    
},{timestamps:true})



CustomerSchema.pre(
    'save',
    async function(next){
        const user = this;
        const hash = await bcrypt.hash(this.password,10)
        this.password = hash
        next()
    }
)

CustomerSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password,user.password)
    return compare
}




module.exports = mongoose.model('Customer',CustomerSchema);