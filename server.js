const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

function isUser() {
    return false;
};

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

//app.use(express.static(path.join(__dirname, '/public'))); // - static - wez wszystko cokolwiek jest w folderze public i serwuj pliki statyczne na naszym serwerze

app.use('/user', (req, res, next) => {
    if(isUser()) next();
    else res.show('forbidden.html');
});

app.use('/pomidor', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('home', {layout: false});
});

app.get('/home', (req, res) => {
    res.render('home', {layout: false});
});

app.get('/about', (req, res) => {
    res.render('about', {layout: false});
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', {layout: false, name: req.params.name });  // wczytaj szablon ./views/hello.hbs, podmień placeholder name na req.params.name,
                                                    // a na końcu zwróć już zmienioną treść jako odpowiedź dla klienta.
});

app.use((req, res) => {
    res.status(404).render('404.html', {layout: false});
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
