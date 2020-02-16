const express = require('express');
const app = express();
const expbs = require('express-handlebars');
const bdpars = require('body-parser');
const fs = require('fs');

app.engine('handlebars', expbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bdpars.urlencoded({exended: false}));
app.use(bdpars.json())

app.use(express.static('public'));

fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
        return console.log('Erro ao ler arquivo');
    }
    var productsData = JSON.parse(data);
    app.get('/products', (req, res) => {
        res.json(productsData);
    })
})

app.get('/', (req, res) => {
    res.render('index', {  style: 'index', title: 'Home' });
});

app.get('/contato', (req, res) => {
    res.render('contato', { style: 'contato', title: 'Contato' });
});

app.post('/envio', (req, res) => {
    var erros = []

    if (!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        erros.push({texto: "Nome inválido."})
    } 
    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: "Email inválido."})
    } 
    if (!req.body.message || typeof req.body.message == undefined || req.body.message == null) {
        erros.push({texto: "Mensagem inválida."})
    }
    if (erros.length > 0) {
        res.render("contato", {erros: erros})
    } else {

        var newEmail = {
                        "name": req.body.name,
                        "email": req.body.email,
                        "message": req.body.message
                    }
        fs.readFile('emails.json', 'utf8', (err, data) => {
            if(err) {
                var response = { status: 'falha', resultado: err };
                res.json(response);
            } else {
                
                var obj = JSON.parse(data);

                obj.emails.push(newEmail);

                fs.writeFile('emails.json', JSON.stringify(obj), function(err) {
                    if (err) {
                        var response = {status: 'falha', resultado: err};
                        res.json(response);
                    } else {
                        var response = {status: 'sucesso', resultado: 'Email enviado com sucesso.'};  
                        res.render("contato", {response: response})
                    }
                });
            }
        })
    }
});

app.listen(3001, () => {
    console.log('Servidor de pé em: http://localhost:3001')
    console.log('Pra desligar o servidor: ctrl + c')
});