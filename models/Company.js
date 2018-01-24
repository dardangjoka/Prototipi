var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
  company_name: String,
  address: String,
  location: String,
  clastname: String,
  website: String,
  cemail: String,
  cpswd: String,
  cdescription: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Company', CompanySchema);
