//we create a safe namespace for our library by creating an IIFE, we need accesses to the window and jquery objects so we pass
// those objects in when we invoke the function. This creates safe code. There is now structure around the code that we write
// and ready to be reused by anybody.
(function (global, $){

    var Greetr = function (firstName, lastName, location, language){
        //we return a function constructor to create the new object. This allows the user to not have to always use 
        //the new keyword when calling $G()
        return new Greetr.init(firstName, lastName, location, language);
    };

    //our Greetr.init constructor has access to this variable because it is in the same lexical environment of the constructor
    //and will close in on the supportedLanguages to have access to its values even after the IIFE has returnd. But it also
    //keeps it hidden from other developers trying to go in and change these values.
    var supportedLanguages = ["english", "spanish", "french", "german"];

    //we use objects so that we can refer to the keys by name with greeting['english'] and get the property value.
    //this protects the values from other developers outside of the Greetr framework, I would have to expose it for them
    //not exposed to the outside world until I desire to do so
    var greeting = {
        english: "Hello",
        spanish: "Hola",
        french: "Salut",
        german: "Hallo"
        };

    var formalGreeting = {
        english: "Greetings",
        spanish: "Saludos",
        french: "Bonjour",
        german: "Hallo"
    };

    var logMessages = {
        english: "Logged in",
        spanish: "Inicio sesion",
        french: "connecte",
        german: "eingeloggt"
    };

    var locations = {
        america: "America",
        mexico: "Mexico",
        france: "France",
        germany: "germany"
    };

    //set the prototype of the above object to an empty object, once we set the constructor's prototype equal to this prototype
    //we can add methods directly to this prototype. While our above objects are private, anything we put inside of our prototype here
    //will be exposed. Any objects built by the cosntructor will have access to properties and methods created in this prototype. 
    //one giant object literal that is the prototype of all the objects defined by it
    Greetr.prototype = {
        //adding functionality to each object, each will have access to these methods
        fullName: function (){
            return this.firstName + " " + this.lastName;
        },

        validate: function (){
            if(supportedLanguages.indexOf(this.language) === -1){
                throw "Invalid Language";
            }
        },

        greeting: function (){
            return greeting[this.language] + " " + this.firstName;
        },

        formalGreeting: function (){
            return formalGreeting[this.language] + " " + this.fullName();
        },

        //logs the approporate diaglog to the counsole depending on if it is formal or not, and we are allowing for chaining 
        //by returning this.
        greet: function (formal){
            var message;

            //if undefined or false it will be coerced to false
            if(formal){
                message = this.formalGreeting();
            } else {
                message = this.greeting();
            }

            if(console){
                console.log(message);
            }

            //this refers to the calling object at execution time, makes the method chainable
            return this;
        },

        //logs to the counsel whoever used the library
        log: function (){
            if (console){
                console.log(logMessages[this.language] + ": " + this.fullName());
                console.log("You are in: " + locations[this.location]);
            }

            //makes the object chainable
            return this;
        },

        updateLanguage: function (lang){
            //update the language to the lagnuage that is passed into the parameter of this function
            this.language = lang;

            //validate to make sure it is a valid language
            this.validate();

            //makes it chainable
            return this;
        },

        //this allows us to show the greeting when the user clicks on the login button.
        //if jQuery is not downloaded we throw an error, if a selector is not added we throw an error
        //we then take if it is formal or not and call the appropriate method to show a greeting to the user in
        //the HTML selector that we pass in. We use HTML to fill in the div with the verbiage.
        selectorGreeting: function (selector, formal){
            if(!$){
                throw "Must have jQuery installed";
            }

            if(!selector){
                throw "Missing jQuery selector";
            }

            var message;
            if(formal){
                message = this.formalGreeting();
            } else {
                message = this.greeting();
            }

            $(selector).html(message);

            //makes this method chainable
            return this;

        },

        //allow the user to enter a location. We set the default location to America if the user does not specify one
        //from the clien we pass in a html selector and use the html function to display the text on the page.
        getLocation: function (selector, location){
            this.location = this.location || location;

            $(selector).html("You are in " + this.location);

            return this;
        }
    };

    //we can create this after the above function because Greetr.init won't actually be called until after we invoke
    //the Greetr function above.
    Greetr.init = function (firstName, lastName, location, language){
        //setting up the new object, building it for what will be returned by the Greetr function
        var self = this;
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "english";
        self.location = location || "america";

        //validate the language passed in is valid
        self.validate();
    };

    //set any object that is created with the constructor function above = to the prototype of the Greetr function that the user
    //is actually calling when they use G$(). The .__proto__ of the object created by the constructor function will point to the 
    //prototype property of the constructor function. We are setting that prototype equal to the prototype of the function
    //that the user will actually be calling from the page.
    //Any objects created with the constructor should actually point to the Greetr function for its prototype chain. So now we can put 
    //methods on the Greetr.prototype property
    //makes sure each object creatd has access to all the methods we defined above
    Greetr.init.prototype = Greetr.prototype;

    //on the global object the two names will point to the Greetr function, making it accessible outside of the IIFE.
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));