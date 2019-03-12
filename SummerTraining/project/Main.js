var express = require('express');

var _bodyParserPackage =require("body-parser");
var app = express();
var sql = require("mssql");

var cors =require("cors");

app.use(cors());

app.use(function (req,res, next) {

res.header("Access-Control-Allow-Origin","*"); 
res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT"); 
res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
next(); 
});



app.use(_bodyParserPackage.json());

var config = {
    user: 'sa',
    password: 'vandana',
    server: 'DESKTOP-LN484UH', 
    database: 'User-Data',
    port:1433 
};

var pool =new sql.ConnectionPool(config);
pool.connect(err => {
        
    console.log(err);
    
    
    if (err){ 
        console.log("Error while connecting to database... :- " +
    err); 
    }
    
    else{
        console.log("Connected!");
    }
    
    })
app.post('/GetUserData', function (req, res) {

        var request =pool.request();
        var data= req.body;
        var query = "declare @UT varchar(10),@ID int "+
        "select @UT=UserType,@ID=Id from [tblUserData] where Email= '"+data.Email+"' and password='"+data.Password+"' "+
        "select * from [tblUserData] where UserType=case when @UT='Admin' then UserType else @UT end "+
        "and Id=case when @UT='Admin' then Id else @ID end";
       /* if(UserType="Normal")
        {
            query="select * from tblUserData where Email= '"+data.Email+"' and Password= '"+data.Password+"' and UserType= '"+data.UserType+"'";
        }
        else
        {
            query="select * from tblUserData ";
        }*/

        request.query(query, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
   
});

   app.post('/InsertUserData', function (req, res ) {


   var request =pool.request();
   var data= req.body;
   console.log(data);
    var query ="INSERT INTO [tblUserData] VALUES ( '"+data.MobileNumber+"','"+data.first_name+"','"+data.last_name+"','"+data.Email+"','"+data.IsStatus+"','"+data.UserType+"','"+data.Password+"' )";
    request.query(query, function (err, recordset){//line 2
        if (err) console.log(err) 

        console.log('1. ', recordset)
            res.json({'status':"inserted"});//res.send(recordset);
        });
       // return "created";
    });

    app.put('/updateUserData', function (req, res ) {

     var request =pool.request();
     var data=req.body;
   

    // var query ="UPDATE [tblUserData]  WHERE id=" + data.id 'SET( '"+data.first_name+"','"+data.last_name+"','"+data.Email+"','"+data.IsStatus+"','"+data.UserType+"')';
       var query ="UPDATE [tblUserData] SET  first_name= '" + data.first_name  +  "' , last_name=  '" + data.last_name + "' , Email=  '" + data.Email + "' , IsStatus=  '" + data.IsStatus + "' , UserType=  '" + data.UserType + "' , Password=  '" + data.Password + "', MobileNumber=  '" + data.MobileNumber + "' WHERE id= "+ data.id +"";
      // executeQuery (res, query);

        request.query(query, function (err, recordset){//line 2
           if (err) console.log(err)

           var finaldata={};
           //finaldata["recordset"]=recordset.rowsAffected[0];
           finaldata["recordset"]=recordset;
             res.send(finaldata);//res.send('updated');
    });

  });   
  
  app.post('/updateData', function (req, res) {
  var request =pool.request();
  var data=req.body;
  
  var query="select * from tblUserData where id= "+data.id+"";

  request.query(query, function (err, recordset){
   if (err) console.log(err)

   var finaldata={};
   finaldata["recordset"]=recordset;
   res.send(finaldata);

    });
  });
  
  
  

  




app.post('/deleteUserData', function(req, res) {
    
    var request =pool.request();
    var data=req.body;//try
     
     var query = "DELETE FROM [tblUserData] WHERE id= "+ data.id +"";    
     // var query = "DELETE FROM [tblUserData] WHERE Id="  + data.id;

         request.query(query, function (err, recordset){
          
              if (err){
                  console.log(err)
              }
            console.log('1.', recordset)
            res.json({'status':"Deleted"});
             // console.log("data delete");
            /* var finaldata={};
             finaldata["recordset"]=recordset.rowsAffected[0];
             res.send(finaldata);   //res.send(data.recordset);
              */
         });         
}); 

//For checking of Email and Password
app.post('/authentication', function(req, res) {
   // var request =pool.request();
    var data=req.body;
    var query ="";

   if(data.Email!="" &&
   data.Email!=null &&
   data.Password!="" &&
   data.Password!=null)
   {
     query =    
    "SELECT * FROM [tblUserData] where Email= '"+data.Email+"' and Password= '"+data.Password+"'";
    GetQueryToExecuteInDatabase(req,res,query,function(err,data)
    {
        var Finaldata={};
        if(data.recordset.length>0)

        {
        
        Finaldata["recordset"]="True";
        
        }
        else

         {

        Finaldata["recordset"]="False";

        }
        Finaldata["status"]="200";

        Finaldata["message"]="OK";

         res.send(Finaldata);

        console.log(Finaldata);

        

        });
    }
    else

{

var Finaldata={};

Finaldata["recordset"]=null;

Finaldata["status"]="400";

Finaldata["message"]="Bad Request";

res.send(Finaldata);

}

});


/*
app.get("/authentication", function(_req ,_res)
{ 

console.log(_req.header);

var Sqlquery ="";

if(_req.headers.Email!="" &&
_req.headers.Email!=null &&
_req.headers.password!="" &&
_req.headers.password!=null)

{ 

Sqlquery= 
"select * from [tblUserData] where Email='"+_req.headers.Email+"' and password='"+_req.headers.password+"'";

GetQueryToExecuteInDatabase(_req,_res,
Sqlquery,function(err,data){

var Finaldata={};

if(data.recordset.length>0)

{

Finaldata["recordset"]="True";

}
else

{

Finaldata["recordset"]="False";

}
Finaldata["status"]="200";

Finaldata["message"]="OK";

_res.send(Finaldata);

console.log(Finaldata);

});

}

else

{

var Finaldata={};

Finaldata["recordset"]=null;

Finaldata["status"]="400";

Finaldata["message"]="Bad Request";

_res.send(Finaldata);

}

});*/

//last
var server = app.listen(4000, function () {
    console.log('Server is running..');
});

const GetQueryToExecuteInDatabase =function (_req,response,
    strQuery,callback) {
    
    //close sql connection before creating an connection otherwise you will get an error if connection already exists.
    
    // _sqlPackage.close(); 
    
    //Now connect your sql connection 
    
    // var credentials =
    // auth(_req);
    
   
    
    try
    
    {
    
    // _sqlPackage.connect(dbConfig, function (error) {
    
    // if (error) { 
    
    // console.log('Inside Try-If'); 
    
    
    
    // response.send(error); 
    
    // } 
    
    // else { 
    
    //let's create a request for sql object 
    
    
    
    /*const pool = new _sqlPackage.ConnectionPool(dbConfig);
    
    pool.connect(err => {
    
    console.log(err);
    
    
    if (err) 
    
    {
    
    console.log("Error while connecting to database... :- " + err);
    
    }
    
    else
    
    console.log("Connected!");
    
    }) */
    
    var request =
    pool.request();
    
    //Query to run in our database 
    
    request.query(strQuery,
    function (error,
    responseResult) { 
    
    if (error) {
    
    console.log('Inside Try-Else');
    
    response.send(error);
    
    } 
    
    else { 
    
    //response.send(responseResult); 
    
    callback(null,responseResult);
    
    } 
    
    }); 
    
    // } 
    
    // }); 
    
    }catch(error)
    
    {
    
    
   
   
    
    } 
}
     
    