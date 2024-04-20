// const ProfileService = require('../services/ProfileService');
//
// class ProfileController {
//     static async getProfile(req, res) {
//         try {
//             const { userId } = req.params;
//             const profile = await ProfileService.findByUserId(userId);
//             if (!profile) {
//                 return res.status(404).json({ message: 'Profil nebyl nalezen.' });
//             }
//             res.json(profile);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//
//     static async createProfile(req, res) {
//         try {
//             const profileData = req.body;
//             const profile = await ProfileService.createProfile(profileData);
//             res.status(201).json(profile);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//
//     static async updateProfile(req, res) {
//         try {
//             const { userId } = req.params;
//             const updateValues = req.body;
//             const updatedProfile = await ProfileService.updateProfile(userId, updateValues);
//             if (!updatedProfile) {
//                 return res.status(404).json({ message: 'Profil nebyl nalezen.' });
//             }
//             res.json(updatedProfile);
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
//
//     static async deleteProfile(req, res) {
//         try {
//             const { userId } = req.params;
//             await ProfileService.deleteProfile(userId);
//             res.status(204).send(); // No Content
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
// }
//
// module.exports = ProfileController;
