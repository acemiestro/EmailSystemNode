module.exports.getHomePage = function(req, res){
    res.render("home.pug", {title: "Home Page"})
};