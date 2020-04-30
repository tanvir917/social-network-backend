const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = {
    createUser: async function({ userInput }, req) {
        // const email = args.userInput.email;
        //return User.findOne().then()
        const existingUser = await User.findOne({email: userInput.email });
        if (existingUser) {
            const error = new Error('User exists already!');
            throw error;
        }
        const hashedPw = await bcrypt.hash(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            name: userInput.name,
            password: hashedPw
        });
        const createUser = await user.save();
        return { ...createUser._doc, _id: createUser._id.toString() }
    }
}