const express = require('express');
const app = express();
const path= require('path');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const Company = require('./models/Company.js');
//setting up template engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//serving static files
app.use(express.static(__dirname+'/public'));

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Proto', {useMongoClient: true})
  .then(function() {
     console.log('Successfully connected to MongoDB!')
  }).catch(function(err) {
     console.error(err)
  });

app.get('/', (req, res)=>
{
   res.render('index');
});

app.get('/table',(req,res)=>{
  /*prototipi.find({}).toArray(function (err, docs){
		if (err){
			console.log(err);
        }
        else{
        res.render('table', {docs: docs});
        }
    });
    
 */

    Company.find(function(err, company) {
        if (err) { console.log(err); }
        res.render('table',{company:company});
        
      });
    
});

app.post('/table/add', (req,res)=>{
 
  var company = new Company();
  company.company_name = req.body.cname;
  company.address = req.body.address;
  company.location = req.body.location;
  company.clastname= req.body.clastname;
  company.website= req.body.website;
  company.cemail= req.body.cemail;
  company.cpswd=req.body.cpswd;
  company.cdescription= req.body.cdescription;
  Company.create(company, function(err, company) {
    if (err) { console.log(err); }
      res.redirect('/');
    //res.json(company);
    
  });
});
 
app.get('/table/edit/:id', (req,res)=>{
    Company.findById(req.params.id, function(err, company){
        if(err) { console.log(err); }
        res.render('edit',{company:company});
      });
});

app.get('/table/delete/:id', function(req, res) {

    Company.remove({_id: req.params.id}, function(err, result){
        if (err) { console.log(err); }
        res.redirect('/table');
      });

});

app.post('/table/update/:id', (req,res)=>{
   

    var updatedCompany = {
        company_name: req.body.cname,
        address: req.body.address,
        location: req.body.location,
        clastname: req.body.clastname,
        website: req.body.website,
        cemail: req.body.cemail,
        cpswd: req.body.cpswd,
        cdescription: req.body.cdescription
     }
     Company.findOneAndUpdate({_id: req.params.id}, updatedCompany, {new: true}, function(err, Company){
       if (err) { console.log(err); }
       res.redirect('/table');
     });
});


app.listen(3000, function(){
	console.log("Running at http://localhost:3000");
});