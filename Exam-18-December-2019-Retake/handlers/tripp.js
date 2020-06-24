function loadHomePage(req, res, next){
    res.render('tripp/home', {
        isLoggedIn: res.isLoggedIn
    });
}
function loadSharedTrippsPage(req, res, next){
    res.render('tripp/sharedTripps', {
        isLoggedIn: res.isLoggedIn
    });
}
function loadOfferTripPage(req, res, next){
    res.render('tripp/offerTripp', {
        isLoggedIn: res.isLoggedIn
    })
}
function offerTrippHandler(req, res, next){

}

module.exports = {
    loadHomePage,
    loadSharedTrippsPage,
    loadOfferTripPage,
    offerTrippHandler
}