const  mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    }
});

userSchema.methods.matchPass = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
}

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  
const User = mongoose.model('users', userSchema);
module.exports = User;


//del
