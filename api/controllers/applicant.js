const {validateApplicant, validateSearchQuery} = require('../database/models/applicant');
const {User, Applicant} = require('../database/models/index');
const client = require('../redis/redis');

exports.update = async (req, res) => {
    try {
        const { error } = validateApplicant(req.body);
        if (error) return res.status(400).json({success:false,message:error.details[0].message});

        const user = await User.findOne({ where: { id: req.user.id } });

        let applicant = await user.getApplicant();
        applicant.first_name = req.body.first_name;
        applicant.last_name = req.body.last_name;
        applicant.bio = req.body.bio;
        applicant.category = req.body.category;
        applicant.portfolio = req.body.portfolio;

        client.hmset(`applicant:${applicant.id}`, applicant.get({plain:true}));

        await applicant.save();
        res.status(200).json({success:true,message:'Aplicant updated successfully.'});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }

}

exports.getAll = async (req, res) => {
    try {
        const applicants = await Applicant.findAll();
        if (!applicants) return res.status(404).json({success:false,message:'No results.'});
        res.status(200).json({success:true,data:{applicants}});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }
    
}

exports.getById = async (req, res) => {
    try {
        const applicant = await Applicant.findOne({ where: { id: req.params.id } });
        if (!applicant) return res.status(404).json({success:false,message:'No applicants with given id.'});

        res.status(200).json({success:true,data:applicant});
    } catch (e) {
        res.status(400).send({success:false,message:e.message});
    }
    
}

exports.search = async (req, res) => {
    try {
        const {error} = validateSearchQuery(req.body);
        if(error) return res.status(400).send({success:false,message:error.details[0].message});

        const applicants = await Applicant.findAll({where: req.body});
        if (applicants.length == 0) return res.status(404).send({success:false,message:'No applicants with given credentials.'});

        res.status(200).json({success:true,data:{applicants}});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }
}

// exports.apply = async (req, res) => {
//     try {
        
//     }
// }
    