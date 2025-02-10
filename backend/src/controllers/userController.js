const User = require('../models/userModel');  // ユーザーモデルをインポート

// ユーザー一覧を取得する
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();  // ユーザーを全て取得
        res.json(users);  // ユーザー一覧を返す
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  // エラーハンドリング
    }
};

// 新しいユーザーを作成する
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;  // リクエストボディからユーザー情報を取得

    try {
        const newUser = new User({ name, email, password });  // 新しいユーザーを作成
        await newUser.save();  // ユーザーをデータベースに保存
        res.status(201).json(newUser);  // 作成されたユーザーをレスポンスとして返す
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  // エラーハンドリング
    }
};

// ユーザー情報を更新する
exports.updateUser = async (req, res) => {
    const { id } = req.params;  // リクエストパラメータからユーザーIDを取得
    const { name, email, password } = req.body;  // リクエストボディから更新するユーザー情報を取得

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true }  // 更新後のユーザーを返す
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });  // ユーザーが見つからなかった場合
        }
        res.json(updatedUser);  // 更新されたユーザーを返す
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  // エラーハンドリング
    }
};

// ユーザーを削除する
exports.deleteUser = async (req, res) => {
    const { id } = req.params;  // リクエストパラメータからユーザーIDを取得

    try {
        const deletedUser = await User.findByIdAndDelete(id);  // ユーザーを削除
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });  // ユーザーが見つからなかった場合
        }
        res.json({ message: 'User deleted' });  // 削除成功メッセージを返す
    } catch (error) {
        res.status(500).json({ message: 'Server error' });  // エラーハンドリング
    }
};
