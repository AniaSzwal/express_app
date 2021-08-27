const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidableMiddleware = require('express-formidable');

const app = express();

function isUser() {
    return false;
};

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public'))); // - static - wez wszystko cokolwiek jest w folderze public i serwuj pliki statyczne na naszym serwerze
app.use('/user', (req, res, next) => {
    if(isUser()) next();
    else res.show('forbidden.html');
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(formidableMiddleware());

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/home', (req, res) => {
    res.render('home')
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', {name: req.params.name });  // wczytaj szablon ./views/hello.hbs, podmień placeholder name na req.params.name,
                                                    // a na końcu zwróć już zmienioną treść jako odpowiedź dla klienta.
});

app.post('/contact/send-message',
    (req, res) => {

    const { author, sender, title, message } = req.fields;

        if(author && sender && title && message && req.files.file) {
            res.render('contact', { isSent: true, fileName: req.files.file.name});
        }
        else {
            res.render('contact', { isError: true });
        }

});

app.post('/upload', (req, res) => {
     // contains non-file fields
    // contains files
});

app.use((req, res) => {
    res.status(404).render('404.html', {layout: false});
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

//kolejnosc definiowania adresów important, czyta z gory na dol
