//gets a new object, we don't have to specify new here, the framework is designed to do that for us
var g = G$("brian", "schmitz");
// console.log(g.fullName());

//this listens for a click event on the login button, when clicked it creates a new greeter object and hides the login div,
//it then calls the updateLanguage method on the prototype and sets the language equal to what was selected by the user, and 
//passes those values into the selectorGreeting method, which outputs the greeting message formally in the greeting div. 
//I also added log so that we log the activity to the console.
$('#login').click(function (){

    var greeter = G$("Tom", "Jones", "germany");


    //hide the div after clicking the login button
    $('#logindiv').hide();

    //chianing of methods
    greeter.updateLanguage($("#lang").val()).selectorGreeting('#greeting', true);
    greeter.getLocation('#location').log();

});