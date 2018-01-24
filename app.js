const express = require('express');
const app = express();
const path= require('path');
const bodyParser=require('body-parser');
const objectId= require('mongodb').ObjectId;

//setting up template engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//serving static files
app.use(express.static(__dirname+'/public'));

//body parser middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017/Finale';

MongoClient.connect(mongoURL, function(err, db)
{
	if (err){
		console.log(err);
	}
	else {
	
	console.log("Connected Succsesfully to MongoDB")
	}
	 prototipi=db.collection('prototipi');
	
});

app.get('/', (req, res)=>
{
   res.render('index');
});

app.get('/table',(req,res)=>{
   prototipi.find({}).toArray(function (err, docs){
		if (err){
			console.log(err);
        }
        else{
        res.render('table', {docs: docs});
        }
	});
    
});

app.post('/table/add', (req,res)=>{
  prototipi.insertOne({companyName: req.body.cname , address: req.body.address,
  location: req.body.location, clastname: req.body.clastname, website: req.body.website,
  cemail: req.body.cemail, cpswd: req.body.cpswd, cdescription: req.body.cdescription },(err, result)=>{
    if (err) {
        console.log(err);
    }
    else{
    res.redirect('/');
   }
  });
});

app.get('/table/edit/:id', (req,res)=>{
    var id = objectId(req.params.id);
	prototipi.findOne({_id: id}, function(err, doc){
		if (err) {
			console.log(err);
		}
		res.render('edit', {doc: doc});	
	
	});

});

app.get('/table/delete/:id', function(req, res) {
	var id = objectId(req.params.id);
	prototipi.deleteOne({_id: id}, function(err, result){
		if (err) {
			console.log(err);
		} else {
		res.redirect('/table');
		}
	});
});

app.post('/table/update/:id', (req,res)=>{
    var id= objectId(req.params.id);
    prototipi.updateOne({_id: id}, {$set:{companyName: req.body.cname , address: req.body.address,
        location: req.body.location, clastname: req.body.clastname, website: req.body.website,
        cemail: req.body.cemail, cpswd: req.body.cpswd, cdescription: req.body.cdescription }},function(err, result){
        if(err)
        {
            console.log(err);
        }

        res.redirect('/table');
    });

});


app.listen(3000, function(){
	console.log("Running at http://localhost:3000");
});