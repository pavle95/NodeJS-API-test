const {validate, toString} = require('../models/advert');
const {User, Advert, Tag, AdvertTag} = require('../models/index');
const {Op} = require('sequelize');



exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({success:false,message:error.details[0].message});

        const user = await User.findOne({ where: { id: req.user.id }});
        if(!user) return res.status(403).json({success:false,message:"Token not valid."})

        const company = await user.getCompany();
        let advert = new Advert({
            company_id: company.id,
            title: req.body.title,
            description: req.body.description,
            from: req.body.from,
            to: req.body.to,
        });
        await advert.save();
        
        const tags = await Tag.findAll({where:{id: req.body.tags}})
        console.log(tags);
        tags.forEach(async tag => {
            let advertTag = new AdvertTag({
                advert_id: advert.id,
                tag_id: tag.id
            });
            await advertTag.save();
        });

        res.status(201).json({success:true,message:'Advert created.',data:{advert}});
    } catch (e) {
        return res.status(500).json(e.message);
    }

} 


exports.getAll = async (req, res) => {
    try {
        const date = new Date(Date.now()).toISOString().split('T')[0]
        let adverts = await Advert.findAll({
            where: {to: {[Op.gt]: date}},
            include: [{model: Tag, as: "tags", through: {attributes:[]}}],
            raw:false
        });
        if(!adverts) return res.status(404).json({success:false,message:'No active adverts.'});

        res.status(200).json({success:true,data:{adverts}});
    } catch (e) {
        return res.status(500).json(e.message);
    }
    
}

exports.getById = async (req, res) => {
    try {
        let advert = await Advert.findOne({ 
            where: { id: req.params.id },
            include: [{model: Tag, as: "tags", through: {attributes:[]}}],
            raw: false
        });
        if (!advert) return res.status(404).json({success:false,message:'No results.'});
        res.status(200).json({success:true,data:advert});
    } catch(e) {
        res.status(500).json(e.message);
    }
}