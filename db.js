const mongoose = require('mongoose');
const Vacation = require('./models/vacation');
const credentials = require('./.credentials.development.json');
const { connectionString } = credentials.mongo;

if (!connectionString) {
    console.error('[Error] connection issue to MongoDB!')
    process.exit(1);
}

mongoose.connect(connectionString);
const db = mongoose.connection

db.on('error', err => {
    console.error(`MongoDB error : ${err.message}`);
    process.exit(1);
})

db.once('open', () => console.log("MongoDb connection is working..."))

Vacation.find((err,vacations) => {
    if(err) return console.error(err)
    if(vacations.length) return 
        new Vacation({
            name: 'Jednodniowa wycieczka do Hood River',
            slug: 'hood-river-day-trip',
            category: 'Jednodniowa wycieczka',
            sku: 'HR199',
            description: 'Spędź dzień na żeglowaniu po Kolumbii i ' +
            'rozkoszuj się rzemieślniczymi piwami w Hood River!',
            location: {
                search: 'Hood River, Oregon, USA',
            },
            price: 99.95,
            tags: ['jednodniowa wycieczka', 'hood river', 'żeglowanie', 'windsurfing', 'browary'],
            inSeason: true,
            maximumGuests: 16,
            available: true,
            packagesSold: 0,
        }).save()
})


module.exports = {
    getVacations: async (options = {}) =>  Vacation.find(options),
        // const vacataions = [
        //     {
        //         name: "Jednodniowa wycieczka do Hood River",
        //         slug: "hood-river-day-trip",
        //         category: "wycieczka jednodniowa",
        //         sku: 'HR199',
        //         description: 'Spędź dzień na żeglowaniu po Kolumbii i ' +
        //         'rozkoszuj się rzemieślniczymi piwami w Hood River!',
        //         location: {
        //             search: 'Hood River, Oregon, USA',
        //         },
        //         price: 99.95,
        //         tags: ['jednodniowa wycieczka', 'hood river', 'żeglowanie', 'windsurfing', 'browary'],
        //         inSeason: true,
        //         maximumGuests: 16,
        //         available: true,
        //         packagesSold: 0,
        //     }
        // ]
    //     const vacations =;
    //     if(options.available !== undefined){
    //         return vacations.filter(({ available }) => available === options.available)
    //     }
    //     return vacations
    // },
    addVacationInSeasonListener : async (email,sku) => {

    },
}