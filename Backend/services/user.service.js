const userModel = require('../models/user.model');

module.exports.register = async({
    firstName, lastName, email, password
})=>{
    if(!firstName || !email || !password){
        throw new Error("Please provide all required fields");
    }
    const user = await userModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}