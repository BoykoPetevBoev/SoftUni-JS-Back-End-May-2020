const Tripp = require('../models/Tripp');

function loadHomePage(req, res, next) {
    res.render('tripp/home', {
        isLoggedIn: res.isLoggedIn,
        email: res.email
    });
}
async function loadSharedTrippsPage(req, res, next) {
    res.render('tripp/sharedTripps', {
        isLoggedIn: res.isLoggedIn,
        tripps: await getAlltripps(),
        email: res.email
    });
}
function loadOfferTripPage(req, res, next) {
    res.render('tripp/offerTripp', {
        isLoggedIn: res.isLoggedIn,
        email: res.email
    })
}
async function offerTrippHandler(req, res, next) {
    const { startEndPoint, dateAndTime, carImage, seats, description } = req.body;
    if (
        !startEndPoint.includes('-') ||
        !dateAndTime.includes('-') ||
        !carImage ||
        !seats ||
        !description
    ) {
        console.log('Invalid params');
        return;
    }
    const [ startPoint, endPoint ] = startEndPoint.split(' - ');
    const [ date, time ] = dateAndTime.split(' - ');

    if( !startPoint || !endPoint || !date || !time) {
        console.log('Invalid params');
        return ;
    }
    
    const tripp = new Tripp({
        startPoint,
        endPoint,
        date,
        time,
        seats,
        description,
        carImage,
    })

    await tripp.save();
    res.redirect('/shared-tripps');
}
async function getAlltripps(){
    const tripps = await Tripp.find().lean();
    return tripps;
}
function loadTrippDetails(req, res, next){
    console.log(req.params)
    res.render('availableTrippDetails', {
        isLoggedIn: req.isLoggedIn
    })
}

module.exports = {
    loadHomePage,
    loadSharedTrippsPage,
    loadOfferTripPage,
    offerTrippHandler,
    getAlltripps,
    loadTrippDetails
}