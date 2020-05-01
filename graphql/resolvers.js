const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = {
    createUser: async function({ userInput }, req) {
        // const email = args.userInput.email;
        const errors =[];
        if (!validator.isEmail(userInput.email)) {
            errors.push({ message: 'Email is invalid.' });
        }
        if (validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 5})) {
            errors.push({ message: 'Password too short.' });
        }
        if (errors.length > 0) {
            const error = new Error('Invalid Input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }
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
    },
    login: async function({ email, password }) {
        const user = await User.findOne({email: email});
        if (!user) {
            const error = new Error('User not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        //now both the email and password is corrcet
        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, 'somesupersecretsecret', {
            expiresIn: '1h'
        });
        return {token: token, userId: user._id.toString() };
    }
};