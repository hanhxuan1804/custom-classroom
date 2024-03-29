const GroupPost = require("../../mongooseModel/GroupPost");
exports.getPostOfGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        const groupPost = await GroupPost.find({ group: groupId });
        return res.status(200).json({
        groupPost,
        });
    } catch (err) {
        return res.status(400).json({
        error: err.message,
        });
    }
    }

exports.create = async (req, res) => {
    const data = req.body;
    try {
        const groupPost = await GroupPost.create({
            group: data.group,
            title: data.title,
            content: data.content,
            file: data.file,
            comment: [],
            owner: {
                id: req.user._id,
                name: req.user.firstName + " " + req.user.lastName,
                avatar: req.user.avatar,
            }
        });
        return res.status(200).json({
            groupPost,
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
}