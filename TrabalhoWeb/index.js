const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
var firebase = require('firebase');

const user = require('./user');

const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.listen(PORT, () => console.log(`server started on port ${PORT}`));


var config = {
    databaseURL: "https://ipcawebtrabalho.firebaseio.com",
};
firebase.initializeApp(config);
var rootRef = firebase.database().ref();


//Body Parsing MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended : false}));



//Verifica se a palavrapasse introduzida corresponde á palavra passe na base de dados
app.get('/api/getLogin/:id/:pass', (req, res) => {

    var loginbool;
    var nome = req.params.id;
    var pass= req.params.pass;
    var dados;

    console.log("Valor de entrada" + nome)


    var ref = firebase.database().ref("logins/" + nome);
 
    ref.once("value")
      .then(function(snapshot) {
         dados = snapshot.val();
            
       console.log(dados);
        
       bcrypt.compare(pass, dados.password, function(err, result) {
       
        console.log("Login State:" + result);
        loginbool = result;
        if(loginbool == true){
            res.status(200).send("true");
        }else if(loginbool == false){
            res.status(200).send("false");
        }else{
            res.status(404).send("User not found");
        }
        
        

        });


      });
      

});

//Regista o novo user na base de dados.
app.post('/api/PostLogin', (req, res) => {
   
    const user = ({
        username: req.body.username,
        password: req.body.password
    });
    var userexists = 0;
   
   
    user.username = req.body.username;
    
    var oneRef = rootRef.child('logins/' + req.body.username);
    
    oneRef.once('value', function (snapshot) {
        if (snapshot.exists()) {
          
            res.status(201).send({message: "false"});

                            
        } else {
            
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            userexists = 0;
            user.password = hash;
            oneRef.set(user);

            res.status(201).send({message: "true"});

        });
           
        
        }
        
    });
 



});

//Verifica se o NIF já existe na base de dados
app.get('/api/getNIF/:nif', (req,res) => {

    var nif = req.params.nif;

    var oneRef = rootRef.child('users').orderByChild('NIF').equalTo(nif);

      
    oneRef.once('value', function (snapshot) {
        var exists =  snapshot.exists();
        
        if(exists == true){
            res.status(201).send({message: "true"});
        }else{
            
            res.status(201).send({message: "false"});
        }
    
    });
 
    

});