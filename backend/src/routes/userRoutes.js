const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // コントローラーをインポート

// ユーザー一覧を取得
router.get('/users', userController.getUsers);

// ユーザーを新規作成
router.post('/users', userController.createUser);

// ユーザー情報を更新
router.put('/users/:id', userController.updateUser);

// ユーザーを削除
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
