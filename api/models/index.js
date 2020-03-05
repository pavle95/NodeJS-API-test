const {User} = require('./user');
const {Company} = require('./company');
const {Applicant} = require('./applicant');
const {Role} = require('./role');
const {Advert} = require('./advert');
const {Tag} = require('./tag');
const {AdvertTag} = require('./advertTag');

Role.hasOne(User, {foreignKey: 'role_id', as: 'role'});
User.belongsTo(Role, {foreignKey: 'role_id', as: 'user'});

User.hasOne(Company, { foreignKey: 'user_id', as: 'company'});
Company.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

User.hasOne(Applicant, {foreignKey: 'user_id', as: 'applicant' });
Applicant.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

Company.hasMany(Advert, {foreignKey: 'company_id', as: 'adverts'});
Advert.belongsTo(Company, {foreignKey: 'company_id', as: 'company'});

Advert.belongsToMany(Tag, {through: AdvertTag, foreignKey: 'advert_id', as: 'tags'});
Tag.belongsToMany(Advert, {through: AdvertTag, foreignKey: 'tag_id', as: 'adverts'});

exports.Role= Role;
exports.User =  User;
exports.Company = Company;
exports.Applicant = Applicant;
exports.Advert = Advert;
exports.Tag = Tag;
exports.AdvertTag = AdvertTag;


