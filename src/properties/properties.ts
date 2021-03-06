import {GlobalAppProperties} from "./propertiesInterface";

//const hostAPI = "http://127.0.0.1:8085";
const hostAPI = "https://api.funnychain.co";

const serviceAvatar = '/service/avatar';
const serviceUser = '/service/user';
const serviceWallet = '/service/api';

export const GLOBAL_PROPERTIES:GlobalAppProperties = {
    MODE:"DEV",

    //Web service properties
    FUNNYCHAIN_SERVICE:hostAPI,
    WALLET_SERVICE:hostAPI+serviceWallet,
    WALLET_SERVICE_UPVOTE:hostAPI+serviceWallet+"/upvote",///upvote/:uid/:memeid
    AVATAR_GENERATION_SERVICE:hostAPI+serviceAvatar+'/avatar_ipfs',
    USERNAME_GENERATION_SERVICE:hostAPI+serviceAvatar+'/name',
    USER_SERVICE:hostAPI+serviceUser,
    USER_SERVICE_INIT:hostAPI+serviceUser+"/init",

    //FIREBASE properties
    apiKey: "AIzaSyAJC1BLZBe64zPsZHBIVBzGmPvH4FPSunY",
    authDomain: "funnychain-dev.firebaseapp.com",
    databaseURL: "https://funnychain-dev.firebaseio.com",
    projectId: "funnychain-dev",
    storageBucket: "funnychain-dev.appspot.com",
    messagingSenderId: "818676897965"
};