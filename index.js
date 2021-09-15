const express  = require('express');
const morgan   = require('morgan');
const fs       = require('fs');
const handlers = require('./lib/handlers');
const db = require('./db')

const app = express()
const port = process.env.PORT || 3000

switch(app.get('env')){
    case 'development': 
        app.use(morgan('dev'));
        break
    case 'production':
        const stream = fs.createWriteStream(`${__dirname}/access.log`, {flags: 'a'});
        app.use(morgan('combined', {stream}));
        break
}

app.get('/',
    (req,res) => {
        res.type('text/plain');
        console.log(req.hostname);
        res.send('/');
    }
)

app.get('/vacations', handlers.listVacations);

// app.get('/vacations', (req,res) => {
//     res.type('json');
//     db.getVacations({available: true}).then(
//         (vacations) => res.jsonp(vacations)
//     )
// })

app.post('/vacations', handlers.addVacationEntry);

app.listen(port, () => console.log(`Express servers is working and listen on http://localhost:${port}`));