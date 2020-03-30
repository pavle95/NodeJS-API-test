const {validateAdvert} = require('../validation/advert');
const {User, Advert, Tag, AdvertTag, ApplicantAdvert, Chat, Message} = require('../database/models/index');
const {Op} = require('sequelize');

exports.create = async (req, res) => {
    try {
        const time =  new Date(Date.now());
        const message = new Message({
            chat_id: req.params.id,
            user_id: req.user.id,
            text: req.body.text,
            time: time
        });
        await message.save();
        res.status(200).json({success:true,data:message});
    } catch (e) {
        return res.status(500).json(e.message);
    }
} 

exports.getById = async (req, res) => {
    try {
        const chat = await Chat.findOne({ 
            where: { id: req.params.id},
            include: [{model: Message, as: "messages", include: [{model: User, as: 'user'}]}],
            raw: false
        });
        res.status(200).json({success:true,data:chat});
    } catch(e) {
        res.status(500).json(e.message);
    }
}