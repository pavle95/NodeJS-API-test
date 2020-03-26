const {validate, validateSearchQuery} = require('../validation/company');
const {User, Company} = require('../database/models/index');

exports.update = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({success:false,message:error.details[0].message});

        const user = await User.findOne({ where: { id: req.user.id } });

        let company = await user.getCompany();

        company = {
            company,
            ...req.body
        }
        // company.name = req.body.name;
        // company.no_employees = req.body.no_employees;
        // company.category = req.body.category;
        // company.working_time = req.body.working_time;
        // company.website = req.body.website;

        await company.save();
        res.status(200).json({success:true,message:'Company updated successfully.'});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }

}

exports.getAll = async(req, res) => {
    try {
        console.log('a');
        const companies = await Company.findAll();
        if(!companies) res.status(404).json({success:false,message:'No results'});
        res.status(200).json({success:true,data:{companies}});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }

}

exports.getById = async(req, res) => {
    try {
        const company = await Company.findOne({ where: { id: req.params.id } });
        if (!company) return res.status(404).json({success:false,message:'No company with given id.'});
        res.status(200).json({success:true,data:company});
    } catch (e) {
        res.status(500).send({success:false,message:e.message});
    }
}

exports.search = async (req, res) => {
    try {
        const {error} = validateSearchQuery(req.body);
        if(error) return res.status(400).send({success:false,message:error.details[0].message});

        const companies = await Company.findAll({where: req.body});
        if (companies.length == 0) return res.status(404).send({success:false,message:'No companies with given credentials.'});

        res.status(200).json({success:true,data:{companies}});
    } catch (e) {
        res.status(500).json({success:false,message:e.message});
    }
}

