const UserService = require('../services/UserService');

class UserController {
    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async findUserByUsername(req, res) {
        try {
            const username = req.params.username;
            const user = await UserService.findUserByUsername(username);
            if (!user) {
                return res.status(404).json({ message: 'Uživatel nebyl nalezen.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteUserByUsername(req, res) {
        try {
            const username = req.params.username;
            await UserService.deleteUserByUsername(username);
            res.status(200).json({ message: 'Uživatel byl úspěšně odstraněn.' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateUserByUsername(req, res) {
        try {
            const username = req.params.username;
            const updateValues = req.body;
            const updatedUser = await UserService.updateUserByUsername(username, updateValues);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Uživatel nebyl nalezen.' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async loginUser(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserService.loginUser(username, password);
            res.status(200).json({ message: 'Uživatel byl úspěšně ověřen.', user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;
