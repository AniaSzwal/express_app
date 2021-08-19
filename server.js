const express = require('express');
const path = require('path');

const app = express();

function isUser() {
    return false;
};


app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

//app.use(express.static(path.join(__dirname, '/public'))); // - static - wez wszystko cokolwiek jest w folderze public i serwuj pliki statyczne na naszym serwerze

app.use('/user', (req, res, next) => {
    if(isUser()) next();
    else res.show('forbidden.html');
});

app.use('/pomidor', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.show('home.html');
});

app.get('/home', (req, res) => {
    res.show('home.html');
});

app.get('/about', (req, res) => {
    res.show('about.html');
});

app.use((req, res) => {
    res.status(404).show('404.html');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});