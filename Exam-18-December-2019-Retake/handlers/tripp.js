const Tripp = require('../models/Tripp');

function loadHomePage(req, res, next) {
    console.log(res.user)
    res.render('tripp/home', {
        isLoggedIn: res.isLoggedIn,
        email: res.user.email
    });
}
async function loadSharedTrippsPage(req, res, next) {
    res.render('tripp/sharedTripps', {
        isLoggedIn: res.isLoggedIn,
        tripps: await getAlltripps(),
        email: res.user.email
    });
}
function loadOfferTripPage(req, res, next) {
    res.render('tripp/offerTripp', {
        isLoggedIn: res.isLoggedIn,
        email: res.user.email
    })
}
async function loadTrippDetails(req, res, next) {
    const { id } = req.params;
    const tripp = await Tripp.findById(id).lean();
    console.log(tripp);
    const user = res.user;
    console.log(user)

    let isAdmin = false;
    let joined = false;
    let noAvailableSeats = false;
    let normalUserView = false;

    console.log(typeof(tripp.buddies), user.id)
    console.log(tripp.buddies.includes(user.id))

    if (user.id == tripp.driver) {
        isAdmin = true;
    }
    else if (tripp.buddies.includes(user.id)) {
        console.log('I am HERE')
        joined = true;
    }
    else if (tripp.buddies.length === Number(tripp.seats)) {
        noAvailableSeats = true;
    }
    else {
        normalUserView = true;
    }
    res.render('tripp/trippDetails', {
        isLoggedIn: res.isLoggedIn,
        email: res.user.email,
        ...tripp,
        isAdmin,
        joined,
        noAvailableSeats,
        normalUserView
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
    const [startPoint, endPoint] = startEndPoint.split(' - ');
    const [date, time] = dateAndTime.split(' - ');
    const userId = res.user.id

    if (!startPoint || !endPoint || !date || !time) {
        console.log('Invalid params');
        return;
    }
    const tripp = new Tripp({
        startPoint,
        endPoint,
        date,
        time,
        seats,
        description,
        driver: userId,
        carImage
    })
    await tripp.save();
    res.redirect('/shared-tripps');
}
async function getAlltripps() {
    const tripps = await Tripp.find().lean();
    return tripps;
}
async function joinTripp(req, res, next) {
    const { id } = req.params;
    const userId = res.user.id;
    console.log(id, userId);

    const tripp = await Tripp.findById(id);
    if(!tripp.buddies.includes(userId)){
        tripp.buddies.push(userId);
    }

    await Tripp.updateOne({_id:id}, tripp);

    res.redirect(`/shared-tripps/${id}`);
    
}

module.exports = {
    loadHomePage,
    loadSharedTrippsPage,
    loadOfferTripPage,
    offerTrippHandler,
    getAlltripps,
    loadTrippDetails,
    joinTripp
}