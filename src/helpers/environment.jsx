let APIURL = "";

switch (window.location.hostname) {
    case 'localhost' || "127.0.0.1":
        APIURL = "http://localhost:3000";
        break;
//    case 'immrama.herokuapp.com':                                NOBODY SEEMS TO KNOW WHERE THIS COMES FROM (not same APIURL in module)
    default:
        APIURL = "https://immrama.herokuapp.com";
}

export default APIURL;


// Deployed to Heroku on 11/30/2020
//     https://immrama.herokuapp.com/

// git: https://git.heroku.com/immrama.git