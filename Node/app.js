const express = require('express');
const app = express();
const port = 8080
const cors = require('cors');
const {checkTokenMiddleware} = require('./Services/uti');
const LoginModule = require('./Modules/LoginModule');
const InscriptionModule = require('./Modules/InscriptionModule');
const ScannerModule = require('./Modules/ScannerModule');

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(express.json());


app.get('/', checkTokenMiddleware, (req, res) => {
    res.send('Hello Foreach!');
});


app.use("/connexion" ,LoginModule);
app.use('/inscription', InscriptionModule);
app.use('/scanner', ScannerModule);

app.listen(port, () =>{
    console.log("Node est lancé");
});