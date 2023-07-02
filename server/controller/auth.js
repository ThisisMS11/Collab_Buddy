const User = require('../modals/users');
const errorResponse = require('../utils/errorHandler');
const asyncHandler = require('../middleware/asyncHandler');
const bcrypt= require('bcryptjs');

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new errorResponse('Please provide an email and password', 400));
    }

    const user = await User.findOne({ email: req.body.email }).select('+password')

    if (!user) {
        return next(new errorResponse('Invalid Input', 404));
    }

    // if (!user.isVerified && !user.unverifiedEmail) {
    //     return next(new errorResponse('Please verify your email', 401));
    // }

    const matchPassword = await user.matchPassword(req.body.password);

    if (!matchPassword) {
        return next(new errorResponse('Invalid Input', 404));
    }

    sendTokenResponse(user, 200, res)
})

exports.register = asyncHandler(async (req, res, next) => {
    let { name, email, password } = req.body;

    let user1 = await User.findOne({ email: req.body.email });

    if (user1) {
        return next(new errorResponse('User already exists with given email', 400));
    }

    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(password, salt);

    let user = await User.create({ name, email, password });

    await user.save({ validateBeforeSave: false });

    user = await User.findOne({ email: req.body.email }).select('+password');

    const token = user.getVerificationToken();


    sendTokenResponse(user, 200, res);



    // const verificationUrl = `https://musical-monstera-20ce50.netlify.app/emailverification/${token}`;

    // const message = `Please verify your email by clicking on the link below: \n\n ${verificationUrl}`;

    // try {
    //     await sendEmail({
    //         email: user.email,
    //         subject: 'Email Verification',
    //         message
    //     })
    //     res.status(200).json({ success: true, data: 'Email sent' });
    // } catch (err) {
    //     console.log(err);
    //     user.verificationToken = undefined;
    //     user.verificationTokenExpire = undefined;
    //     await user.save({ validateBeforeSave: false });
    //     return next(new errorResponse('Email could not be sent', 500));
    // }
})

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    // const options = {
    //     expires: new Date(
    //         Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    // }

    res.status(statusCode).send({ status: true, token: token });
}

exports.getMe = asyncHandler(async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next(new errorResponse('Not authorize to access the route', 401))
    }

    if (user.password) {
        user.password = undefined;
    }

    res.status(200).send({ status: true, data: user });
})

/* user logout */
exports.logout = (asyncHandler(async (req, res) => {
    /* To destroy the session on the backend side */
    // req.session.destroy((err) => {
    //     if (err) throw err;
    // })
    /* To set the token cookie to none at the browser */
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    
    res.status(200).send({ status: "success", data: {} })
}));
