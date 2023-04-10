import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { signupSchema, signinSchema } from '../schemas/auth.js';

dotenv.config();

const { SECRET_CODE } = process.env;

console.log(SECRET_CODE);

export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        const { name, email, password } = req.body;

        if (error) {
            return res.status(400).json({
                alert: error.details.map((err) => err.message),
            });
        }

        // Kiểm tra Email đã tồn tại
        const haveEmail = await User.findOne({ email });
        if (haveEmail) {
            return res.status(404).json({
                alert: 'Email đã được đăng ký',
            });
        }

        // Hash password
        const hashPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({
            ...req.body,
            password: hashPassword,
        });

        user.password = undefined;

        return res.status(201).json({
            alert: 'Tạo tài khoản thành công',
            user,
        });
    } catch (error) {
        return res.status(400).json({
            alert: 'Server bị lỗi',
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { error } = signinSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(404).json({
                message: error.details.map((err) => err.message),
            });
        }

        const { email, password } = req.body;

        const haveUser = await User.findOne({ email: req.body.email });

        if (!haveUser) {
            return res.status(400).json({
                alert: 'tài khoản không tồn tại',
            });
        }

        const checkPassword = bcryptjs.compare(password, haveUser.password);

        if (!checkPassword) {
            return res.status(400).json({
                alert: 'Mật khẩu không khớp',
            });
        }

        // access token

        const token = jwt.sign(
            {
                id: haveUser._id,
            },
            SECRET_CODE,
            { expiresIn: '1y' },
        );

        haveUser.password = undefined;

        return res.status(200).json({
            alert: 'Đăng nhập thành công',
            accessToken: token,
            user: haveUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            alert: 'Server bị lỗi',
        });
    }
};
