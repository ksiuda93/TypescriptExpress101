const db = require("../db")

module.exports.listVacations = async (req,res) => {
    const vacations = await db.getVacations({available: true})

    const context = {
        vacations: vacations.map(vacation => ({
            sku: vacation.sku,
            name: vacation.name,
            description: vacation.description,
            price: '$' + vacation.price.toFixed(2),
            inSeason: vacation.inSeason,
        }))
    }
    res.send(context)
};

// module.exports.notifyWhenInSeasonProcess = async(req,res) => {
//     const {email,sku} = req.body;

//     await db.addVacationInSeasonListener(email,sku);

//     return res.redirect(303, '/vacations')
// };

module.exports.addVacationEntry = async(req,res) => {
    const vacation = await req.body
    console.log(vacation)
    res.jsonp(vacation);
}