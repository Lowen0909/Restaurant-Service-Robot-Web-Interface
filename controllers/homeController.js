var seat=['empty','occupied','empty','empty'];
const homeView = (req, res) => {
    res.render("newhome", {layout:false} );
}
const welcomeView = (req, res) => {
    res.render("cover", {layout:false} );
}
const transitionView = (req, res) => {
    res.render("transition", {layout:false} );
}
const waitView = (req, res) => {
    res.render("wait", {layout:false} );
}
const processingView = (req, res) => {
    res.render("processing", {seat:req.query.seat,layout:false} );
}
const seatView=(req,res)=>{
    res.render("seat",{title:'seat',script:'seat.js'});
}
const game=(req,res)=>{
    res.render("game",{layout:false});
}
const deliverView=(req,res)=>{
    res.render("deliver",{title:'deliver',script:'deliver.js'});
}
module.exports =  {
    homeView,
    welcomeView,
    transitionView,
    seatView,
    game,
    waitView,
    deliverView,
    processingView
};