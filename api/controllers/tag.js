const {validate} = require('../database/models/tag');
const {Tag} = require('../database/models/index');

exports.create = async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        let tag = await Tag.findOne({where: {name: req.body.name}});
        if (tag) return res.status(400).send({success:false,message:'Tag already exists.'});
    
        tag = new Tag({name: req.body.name});
        
        await tag.save();
        res.status(201).json({success:true,message:'Tag succesfully created.',data:tag});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});

    }
    
}

exports.getAll = async(req, res) => {
    try {
        const tags = await Tag.findAll();
        if (!tags) return res.status(404).json({success:false,data:"No results."});
        res.status(200).json({success:true,data:{tags}});
    } catch(e) {
        res.status(500).json({success:false,message:e.message});
    }
    
}

exports.getById = async(req, res) => {
    try {
        const tag = await Tag.findOne({where: {id: req.params.id}});
        if (!tag) return res.status(404).json({success:false,message:'No Tag with given id.'});
        res.status(200).json({success:true,data:tag});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }
    
}