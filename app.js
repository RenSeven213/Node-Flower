const path = require("path");

// Подключение модуля express
const { json } = require("express");
const express = require("express");

// Подключение модуля express-handlebars
const expressHbs = require("express-handlebars")

const hbs = require("hbs");

const urlencodedPaeser = express.urlencoded({extended: false});

const jsonParser = express.json();

const mysql = require("mysql2");
  
const connection = mysql.createPool({
  host: "localhost",
  user: "renseven",
  database: "plants",
  password: "qwsd1234"                                                                     
});



// Создание объекта приложения
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Настройка шаблонов подключаемых слоев
app.engine("hbs", expressHbs.engine(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
));


// Подключение модуя движка шаблонизатора
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "views/partials");

// Определение маршрутов приложения
app.get("/", function(request, response) {
    // Отправка статусного кода
    // response.status(400).send("Ведутся тех.работа");
    // Отправка ответа на запрос
    response.render("index.hbs");
});

app.get("/index", function(request, response){
    response.render("simple.hbs", {
        title: "Главная страница",
        header: "Страница index!",
        btnVisible: false
    });
});

app.get("/index/:id", function(request, response){
    response.render("simple2.hbs", {
        title: "Главная страница",
        header: "Страница index!",
        id: request.params["id"],
        btnVisible: true
    });
});

app.get("/page", function(request, response){
    response.render("contacts.hbs");
});

app.get("/auth", function(request, response){
    response.render("auth.hbs");
});

app.post("/auth", jsonParser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    
    response.json(request.body);


});

app.get("/reg", function(request, response){
    response.render("reg.hbs");
});

app.post("/reg", urlencodedPaeser, function(request, response){
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userLogin} - ${request.body.userPassw} - ${request.body.userPasswD} - ${request.body.userFIO} - ${request.body.userDB} - ${request.body.userEmail}`);
});




app.listen(3000);