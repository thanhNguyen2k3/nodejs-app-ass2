import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const { SECRET_CODE } = process.env;

// Check author

// export const checkPermission = async (req, res, next) => {
//     try {
//         const author = req.headers.authorization;

//         if (!author) {
//             return res.status(400).json({
//                 alert: 'bạn chưa đăng nhập',
//             });
//         }

//         const token = req.headers.authorization.split(' ')[1];

//         jwt.verify(token, SECRET_CODE, async (err, decoded) => {
//             if (err) {
//                 if ((err.name = 'TokenExpiredError')) {
//                     return res.status(400).json({
//                         alert: err.message || 'Token đã hêt hạn',
//                     });
//                 }

//                 if ((err.name = 'JsonWebTokenError')) {
//                     return res.status(400).json({
//                         alert: 'Token bị lỗi',
//                     });
//                 }
//             }

//             const user = await User.findById(decoded.id);

//             if (!user) {
//                 return res.status(400).json({
//                     alert: 'Người dùng không có trong hệ thống',
//                 });
//             }

//             if (user.role !== 'admin') {
//                 return res.status(400).json({
//                     alert: 'Bạn không có quyền thực hiện hành động này!',
//                 });
//             }

//             // Finally

//             req.user = user;

//             next();
//         });
//     } catch (error) {
//         return res.status(500).json({
//             alert: 'Server bị lỗi',
//         });
//     }
// };

export const checkPermission = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // ["Bearer", "xxx"]
    if (!authHeader) {
        return res.status(401).json({
            message: 'Bạn chưa đăng nhập',
        });
    }

    jwt.verify(token, 'banThayDat', async (error, payload) => {
        if (error) {
            if (error.name === 'JsonWebTokenError') {
                return res.status(400).json({
                    message: 'Token không hợp lệ',
                });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(400).json({
                    message: 'Token đã hết hạn',
                });
            }
        }
        const user = await User.findById(payload.id);
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: 'Bạn không có quyền thực hiện hành động này',
            });
        }
        next();
    });
};
