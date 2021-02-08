var poke = poke || {};

poke.FB_COLLECTION_USER = "User";
poke.FB_USER_KEY_NAME = "name";
poke.FB_USER_KEY_CONTACT = "contactEmail";
poke.FB_USER_KEY_GAMES = "gameOwned";
poke.FB_USER_KEY_POKEMON = "pokemonOwned";

poke.FB_COLLECTION_TRADE = "TradeRequest";
poke.FB_TRADE_KEY_AUTHOR = "author";
poke.FB_TRADE_KEY_POKEMON = "pokemonId";
poke.FB_TRADE_KEY_DESCRIPTION = "requestText";

poke.fbAuthManager = null;
poke.fbProfileManager = null;
poke.fbPokedexManager = null;
poke.fbPokemonManager = null;
poke.fbTradesListManager = null;
poke.fbTradeDetailManager = null;


poke.SideNavController = class {
    constructor() {
        const menuProfileItem = document.querySelector("#menuProfile");
        if (menuProfileItem) {
            menuProfileItem.addEventListener("click", (event) => {
                window.location.href = "/profile.html";
            });
        }
        const menuShowAllItem = document.querySelector("#menuShowAll");
        if (menuShowAllItem) {
            menuShowAllItem.addEventListener("click", (event) => {
                window.location.href = "/dex.html";
            });
        }
        const menuShowMyItem = document.querySelector("#menuShowMy");
        if (menuShowMyItem) {
            menuShowMyItem.addEventListener("click", (event) => {
                window.location.href = `/dex.html?uid=${rhit.fbAuthManager.uid}`;
            });
        }
        const menuSignOutItem = document.querySelector("#menuSignOut");
        if (menuSignOutItem) {
            menuSignOutItem.addEventListener("click", (event) => {
                rhit.fbAuthManager.signOut();
            });
        }
    }
}
poke.LoginPageController = class {
    constructor() {

    }
}
poke.ProfilePageController = class {
    constructor() {

    }
    updatePage() {

    }
}
poke.PokedexPageController = class {
    constructor() {

    }
    updatePage() {

    }
}
poke.PokemonPageController = class {
    constructor(pid) {
        const nameElement = document.querySelector("#pkmnName");
        fetch(`https://pokeapi.co/api/v2/pokemon/${pid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const name = data.name;
                const height = data.height/10;
                const weight = data.weight/10;
                const hpStat = data.stats[0].base_stat;
                const atkStat = data.stats[1].base_stat;
                const defStat = data.stats[2].base_stat;
                const spatkStat = data.stats[3].base_stat;
                const spdefStat = data.stats[4].base_stat;
                const spdStat = data.stats[5].base_stat;
                nameElement.innerHTML = name;
                document.querySelector("#pkmnHT").innerHTML = `HT: ${height} m`;
                document.querySelector("#pkmnWT").innerHTML = `WT: ${weight} kg`;
                if(Object.keys(data.types).length==1) {
                    const type1 = data.types[0].type.name;
                    document.querySelector("#type1").innerHTML = type1;
                    
                    document.querySelector("#type2").style.display = "none";
                } else if (Object.keys(data.types).length==2) {
                    const type1 = data.types[0].type.name;
                    const type2 = data.types[1].type.name;
                    document.querySelector("#type1").innerHTML = type1;
                    document.querySelector("#type2").style.display = "block";
                    document.querySelector("#type2").innerHTML = type2;
                }
                document.querySelector("#hpNum").innerHTML = hpStat;
                document.querySelector("#atkNum").innerHTML = atkStat;
                document.querySelector("#defNum").innerHTML = defStat;
                document.querySelector("#spatkNum").innerHTML = spatkStat;
                document.querySelector("#spdefNum").innerHTML = spdefStat;
                document.querySelector("#spdNum").innerHTML = spdStat;
                document.querySelector("#hpBarFill").style = `width:${100*hpStat/255}%;`;
                document.querySelector("#atkBarFill").style = `width:${100*atkStat/255}%;`;
                document.querySelector("#defBarFill").style = `width:${100*defStat/255}%;`;
                document.querySelector("#spatkBarFill").style = `width:${100*spatkStat/255}%;`;
                document.querySelector("#spdefBarFill").style = `width:${100*spdefStat/255}%;`;
                document.querySelector("#spdBarFill").style = `width:${100*spdStat/255}%;`;
            });
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(Object.keys(data.egg_groups).length==1) {
                    const eggGroup1 = data.egg_groups[0].name;
                    document.querySelector("#eggGroup1").innerHTML = eggGroup1;
                    document.querySelector("#eggGroup2").style.display = "none";
                } else if(Object.keys(data.egg_groups).length==2) {
                    const eggGroup1 = data.egg_groups[0].name;
                    const eggGroup2 = data.egg_groups[1].name;
                    document.querySelector("#eggGroup1").innerHTML = eggGroup1;
                    document.querySelector("#eggGroup2").style.display = "block";
                    document.querySelector("#eggGroup2").innerHTML = eggGroup2;
                }
                const hatchCounter = data.hatch_counter;
                document.querySelector("#eggSteps").innerHTML = `${hatchCounter*256} Steps`;
                let genus;
                data.genera.forEach(genera => {
                    if(genera.language.name=="en") {
                        genus = genera.genus;
                    }
                });
                document.querySelector("#pkmnCategory").innerHTML = genus ? genus : "??? Pokémon";
            });
        document.querySelector("#pkmnID").innerHTML = `#${pid}`;
        document.querySelector("#pkmnSprite").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pid}.png`;
    }
    updatePage() {

    }
}
poke.TradesListPageController = class {
    constructor() {

    }
    updatePage() {

    }
}
poke.TradeDetailPageController = class {
    constructor() {

    }
    updatePage() {

    }
}

poke.FbAuthManager = class {
    constructor() {

    }
    beginListening(changeListener) {

    }
    signIn() {

    }
    signOut() {

    }
}
poke.FbProfileManager = class {
    constructor() {

    }
    tryCreateNewUser(uid, name) {

    }
    beginListening(changeListener) {

    }
    stopListening() {

    }
    updateName(name) {

    }
    addGame(game) {

    }
    removeGame(game) {

    }
}
poke.FbPokedexManager = class {
    constructor(uid) {

    }
    beginListening(changeListener) {

    }
    stopListening() {

    }
    getPokemonAtIndex(index) {

    }
}
poke.FbPokemonManager = class {
    constructor(pid) {

    }
    addOwned() {

    }
    beginListening(changeListener) {

    }
    stopListening() {

    }
    removeOwned() {

    }
}
poke.FbTradesListManager = class {
    constructor(uid) {

    }
    createTrade(pokemon, description) {

    }
    beginListening(changeListener) {

    }
    stopListening() {

    }
    getTradeAtIndex(index) {

    }
}
poke.FbTradeDetailManager = class {
    constructor() {

    }
    beginListening(changeListener) {

    }
    stopListening() {

    }
    updateTrade(description) {

    }
    deleteTrade() {

    }
}

poke.Pokemon = class {
    constructor(id, name, owned) {

    }
}
poke.Trade = class {
    constructor(id, uid, pokemon, description) {

    }
}

poke.initializePage = function() {
    const urlParams = new URLSearchParams(window.location.search);
    new poke.SideNavController();
    if (document.querySelector("#pokemonDetailsPage")) {
        const pid = urlParams.get("pid");
        if (!pid) {
            window.location.href = "/pokemon.html?pid=1";
        } else {
            poke.fbPokemonManager = new this.FbPokemonManager(pid);
            new poke.PokemonPageController(pid);
        }
    }
}

poke.main = function() {
    poke.fbAuthManager = new poke.FbAuthManager();
    poke.initializePage();

    console.log("Ready");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            var displayName = user.displayName;
            var email = user.email;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var phoneNumber = user.phoneNumber;
            var uid = user.uid;
            console.log("Signed in", uid);
            console.log('displayName :>> ', displayName);
            console.log('email :>> ', email);
            console.log('photoURL :>> ', photoURL);
            console.log('isAnonymous :>> ', isAnonymous);
            console.log('phoneNumber :>> ', phoneNumber);
            console.log('uid :>> ', uid);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    document.querySelector("#createAccountButton").onclick = (event) => {
        console.log(`Create account for email: ${inputEmailEl.value}  password: ${inputPasswordEl.value}`);
        firebase.auth().createUserWithEmailAndPassword(inputEmailEl.value, inputPasswordEl.value).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Create user error", errorCode, errorMessage);
        });
    };

    document.querySelector("#logInButton").onclick = (event) => {
        console.log(`Log in to existing account for email: ${inputEmailEl.value}  password: ${inputPasswordEl.value}`);
        firebase.auth().signInWithEmailAndPassword(inputEmailEl.value, inputPasswordEl.value).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Log in existing user error", errorCode, errorMessage);
        });
    };

    // document.querySelector("#anonymousAuthButton").onclick = (event) => {
    //     console.log(`Log in via Anonymous auth`);

    //     firebase.auth().signInAnonymously().catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         console.log("Log in existing user error", errorCode, errorMessage);
    //     });
    // };

    document.querySelector("#signOutButton").onclick = (event) => {
        console.log("Sign Out called");
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
    };

    poke.startFirebaseAuthUi();
};

poke.startFirebaseAuthUi = () => {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
    });
}

poke.main();