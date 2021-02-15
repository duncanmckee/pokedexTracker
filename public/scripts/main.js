var poke = poke || {};

poke.NUM_POKEMON = 898;

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


poke.MoveData = class {
    constructor(learnType, moveName, learnLevel, gameName) {
        this.learnType = learnType;
        this.moveName = moveName;
        this.learnLevel = learnLevel;
        this.moveGame = "";
        this.moveGameA = "";
        this.moveGameB = "";
        switch (gameName) {
            case "red-blue":
                this.moveGameA = "Red";
                this.moveGameB = "Blue";
                break;
            case "yellow":
                this.moveGame = "Yellow";
                break;
            case "gold-silver":
                this.moveGameA = "Gold";
                this.moveGameB = "Silver";
                break;
            case "crystal":
                this.moveGame = "Crystal";
                break;
            case "ruby-sapphire":
                this.moveGameA = "Ruby";
                this.moveGameB = "Sapphire";
                break;
            case "emerald":
                this.moveGame = "Emerald";
                break;
            case "firered-leafgreen":
                this.moveGameA = "Fire Red";
                this.moveGameB = "Leaf Green";
                break;
            case "diamond-pearl":
                this.moveGameA = "Diamond";
                this.moveGameB = "Pearl";
                break;
            case "platinum":
                this.moveGame = "Platinum";
                break;
            case "heartgold-soulsilver":
                this.moveGameA = "Heart Gold";
                this.moveGameB = "Soul Silver";
                break;
            case "black-white":
                this.moveGameA = "Black";
                this.moveGameB = "White";
                break;
            case "black-2-white-2":
                this.moveGameA = "Black 2";
                this.moveGameB = "White 2";
                break;
            case "colosseum":
                this.moveGame = "Colosseum";
                break;
            case "xd":
                this.moveGame = "XD";
                break;
            case "x-y":
                this.moveGameA = "X";
                this.moveGameB = "Y";
                break;
            case "omega-ruby-alpha-sapphire":
                this.moveGameA = "Omega Ruby";
                this.moveGameB = "Alpha Sapphire";
                break;
            case "sun-moon":
                this.moveGameA = "Sun";
                this.moveGameB = "Moon";
                break;
            case "ultra-sun-ultra-moon":
                this.moveGameA = "Ultra Sun";
                this.moveGameB = "Ultra Moon";
                break;
            default:
                this.moveGame = "ERROR";
                break;
        }
    }

    getMoveRow() {
        if (this.moveGame != "") {
            return `<div class="learn-type learn-row-item caps"><div>${this.learnType}</div></div>
            <div class="learn-move-name learn-row-item caps">${this.moveName}</div>
            <div class="learn-level learn-row-item">${this.learnLevel}</div>
            <div class="learn-game learn-row-item">${this.moveGame}</div>`;
        } else {
            return `<div class="learn-type learn-row-item caps"><div>${this.learnType}</div></div>
        <div class="learn-move-name learn-row-item caps">${this.moveName}</div>
        <div class="learn-level learn-row-item">${this.learnLevel}</div>
        <div class="learn-game-A learn-row-item">${this.moveGameA}</div>
        <div class="learn-game-B learn-row-item">${this.moveGameB}</div>`;
        }
    }
}

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
    constructor(pid = null, versionGroupIn = null, versionIn = null) {
        const pokemonDetailsPage = document.querySelector("#pokemonDetailsPage");
        const pokedexList = document.querySelector("#pokedexList");
        pokedexList.innerHTML = "";
        for (let id = 1; id <= poke.NUM_POKEMON; id++) {
            const idstay = id;
            const pokeIcon = document.createElement("div")
            pokeIcon.classList.add("dex-icon");
            pokeIcon.innerHTML = `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idstay}.png">`;
            pokeIcon.onclick = (event) => {
                if (pid == idstay) {
                    window.location.href = "/pokemon.html";
                } else if (versionIn) {
                    window.location.href = `/pokemon.html?pid=${idstay}&game=${versionIn}`;
                } else {
                    window.location.href = `/pokemon.html?pid=${idstay}`;
                }
            };
            pokedexList.appendChild(pokeIcon);
        }

        const gameIcons = document.querySelectorAll(".game-icon");
        for (let i = 0; i < gameIcons.length; i++) {
            const gameIcon = gameIcons[i];
            const gameName = gameIcon.dataset.version;
            gameIcon.onclick = (event) => {
                if (versionIn) {
                    if (versionIn == gameName) {
                        window.location.href = `/pokemon.html?pid=${pid}`;
                    } else {
                        window.location.href = `/pokemon.html?pid=${pid}&game=${gameName}`
                    }
                } else {
                    window.location.href = `/pokemon.html?pid=${pid}&game=${gameName}`
                }

            }
        }

        if (pid) {
            pokemonDetailsPage.classList.add("pokemon-view");
            fetch(`https://pokeapi.co/api/v2/pokemon/${pid}`)
                .then(response => response.json())
                .then(data => {
                    const name = data.name;
                    const height = data.height / 10;
                    const weight = data.weight / 10;
                    const hpStat = data.stats[0].base_stat;
                    const atkStat = data.stats[1].base_stat;
                    const defStat = data.stats[2].base_stat;
                    const spatkStat = data.stats[3].base_stat;
                    const spdefStat = data.stats[4].base_stat;
                    const spdStat = data.stats[5].base_stat;
                    document.querySelector("#pkmnName").innerHTML = name;
                    document.querySelector("#pkmnHT").innerHTML = `HT: ${height} m`;
                    document.querySelector("#pkmnWT").innerHTML = `WT: ${weight} kg`;
                    if (Object.keys(data.types).length == 1) {
                        const type1 = data.types[0].type.name;
                        document.querySelector("#type1").innerHTML = type1;

                        document.querySelector("#type2").style.display = "none";
                    } else if (Object.keys(data.types).length == 2) {
                        const type1 = data.types[0].type.name;
                        const type2 = data.types[1].type.name;
                        document.querySelector("#type1").innerHTML = type1;
                        document.querySelector("#type2").style.display = "block";
                        document.querySelector("#type2").innerHTML = type2;
                    }
                    const abilities = data.abilities;
                    for (let i = 0; i < abilities.length; i++) {
                        const ability = abilities[i].ability.name;
                        const slot = abilities[i].slot;
                        let abilityType = "";
                        switch (slot) {
                            case 1:
                                abilityType = "P";
                                break;
                            case 2:
                                abilityType = "S";
                                break;
                            case 3:
                                abilityType = "H";
                                break;
                        }
                        document.querySelector(`#pkmn${abilityType}Ability`).innerHTML = ability;
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
                    const moves = data.moves;
                    const learnsetList = document.querySelector("#learnsetSubList");
                    learnsetList.innerHTML = "";
                    let index = 0;
                    let movesData = [];
                    for (let i = 0; i < moves.length; i++) {
                        const moveName = moves[i].move.name.replaceAll("-", " ");
                        const versionGroups = moves[i].version_group_details;
                        for (let j = 0; j < versionGroups.length; j++) {
                            const learnType = versionGroups[j].move_learn_method.name.replaceAll("-", " ");
                            const learnLevel = versionGroups[j].level_learned_at;
                            const moveGame = versionGroups[j].version_group.name;
                            if (versionGroupIn && moveGame != versionGroupIn) {
                                continue;
                            }
                            movesData[index] = new poke.MoveData(learnType, moveName, learnLevel, moveGame);;
                            index = index + 1;
                        }
                    }
                    movesData.sort((a, b) => {
                        if (a.learnType == b.learnType) {
                            return a.learnLevel - b.learnLevel;
                        }
                        let result = 0;
                        switch (a.learnType) {
                            case "level up":
                                result += 1;
                                break;
                            case "egg":
                                result += 2;
                                break;
                            case "tutor":
                                result += 3;
                                break;
                            case "machine":
                                result += 4;
                                break;
                        }
                        switch (b.learnType) {
                            case "level up":
                                result -= 1;
                                break;
                            case "egg":
                                result -= 2;
                                break;
                            case "tutor":
                                result -= 3;
                                break;
                            case "machine":
                                result -= 4;
                                break;
                        }
                        return result;
                    })
                    for (let x = 0; x < index; x++) {
                        const rowDiv = document.createElement("div");
                        rowDiv.classList.add("learnset-row");
                        rowDiv.classList.add(`learn-row-${x%2}`);
                        rowDiv.innerHTML = movesData[x].getMoveRow();
                        learnsetList.appendChild(rowDiv);
                    }
                });
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pid}`)
                .then(response => response.json())
                .then(data => {
                    fetch(data.evolution_chain.url)
                        .then(response => response.json())
                        .then(data => {
                            const evolutionList = document.querySelector("#evolutionContainer");
                            let stages = [];
                            let chain = [];
                            // Actually pull the evolutions!
                            chain.push({ "data": data.chain, "stage": 1 });
                            while (chain.length != 0) {
                                const current = chain.shift();
                                const evo = current.data;
                                const stage = current.stage;
                                const speciesURL = evo.species.url;
                                const speciesID = speciesURL.substring(42, speciesURL.length - 1);
                                const evolutionDetails = evo.evolution_details
                                const evolvesTo = evo.evolves_to;
                                for (let i = 0; i < evolvesTo.length; i++) {
                                    chain.push({ "data": evolvesTo[i], "stage": stage + 1 });
                                }
                                const evoDesc = poke.parseEvolutionType(evolutionDetails[evolutionDetails.length - 1], speciesID);
                                stages.push({ "stage": stage, "speciesID": speciesID, "evoDesc": evoDesc });
                            }
                            for (let i = 0; i < stages.length; i++) {
                                const stage = stages[i].stage;
                                const speciesID = stages[i].speciesID;
                                const evoDesc = stages[i].evoDesc;
                                const rowDiv = document.createElement("div");
                                rowDiv.classList.add("evo-icon");
                                rowDiv.style = `width: ${100/stages.length}%`;
                                rowDiv.innerHTML = `<h3>Stage ${stage}</h3>
                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesID}.png">
                                <div class="caps">${evoDesc}</div>`;
                                evolutionList.appendChild(rowDiv);
                            }
                        });
                    if (Object.keys(data.egg_groups).length == 1) {
                        const eggGroup1 = data.egg_groups[0].name;
                        document.querySelector("#eggGroup1").innerHTML = eggGroup1;
                        document.querySelector("#eggGroup2").style.display = "none";
                    } else if (Object.keys(data.egg_groups).length == 2) {
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
                        if (genera.language.name == "en") {
                            genus = genera.genus;
                        }
                    });
                    document.querySelector("#pkmnCategory").innerHTML = genus ? genus : "??? Pokémon";
                });
            fetch(`https://pokeapi.co/api/v2/pokemon/${pid}/encounters`)
                .then(response => response.json())
                .then(encounters => {
                    const encounterList = document.querySelector("#encounterList");
                    encounterList.innerHTML = "";
                    for (let i = 0; i < encounters.length; i++) {
                        const encounterLocation = encounters[i].location_area.name.replaceAll("-", " ").replace("area", "");
                        const versionDetails = encounters[i].version_details;
                        for (let j = 0; j < versionDetails.length; j++) {
                            const version = versionDetails[j].version.name;
                            if (versionIn && version != versionIn) {
                                continue;
                            }
                            const encounterDetails = versionDetails[j].encounter_details;
                            for (let l = 0; l < encounterDetails.length; l++) {
                                const method = encounterDetails[l].method.name;
                                let methodText = "";
                                let imgSrc = "./images/encounters/pokeball.png";
                                switch (method) {
                                    case "walk":
                                        methodText = "Walking";
                                        imgSrc = "./images/encounters/pokeball.png";
                                        break;
                                    case "old-rod":
                                        methodText = "Old Rod";
                                        imgSrc = "./images/encounters/netball.png";
                                        break;
                                    case "good-rod":
                                        methodText = "Good Rod";
                                        imgSrc = "./images/encounters/netball.png";
                                        break;
                                    case "super-rod":
                                        methodText = "Super Rod";
                                        imgSrc = "./images/encounters/netball.png";
                                        break;
                                    case "surf":
                                        methodText = "Surfing";
                                        imgSrc = "./images/encounters/diveball.png";
                                        break;
                                    case "rock-smash":
                                        methodText = "Rock Smash";
                                        imgSrc = "./images/encounters/duskball.png";
                                        break;
                                    case "headbutt":
                                        methodText = "Headbutt";
                                        imgSrc = "./images/encounters/safariball.png";
                                        break;
                                    case "dark-grass":
                                        methodText = "Dark Grass";
                                        imgSrc = "./images/encounters/safariball.png";
                                        break;
                                    case "grass-spots":
                                        methodText = "Grass Spot";
                                        imgSrc = "./images/encounters/quickball.png";
                                        break;
                                    case "cave-spots":
                                        methodText = "Cave Spot";
                                        imgSrc = "./images/encounters/quickball.png";
                                        break;
                                    case "bridge-spots":
                                        methodText = "Bridge Spot";
                                        imgSrc = "./images/encounters/quickball.png";
                                        break;
                                    case "super-rod-spots":
                                        methodText = "Fishing Spot";
                                        imgSrc = "./images/encounters/quickball.png";
                                        break;
                                    case "surf-spots":
                                        methodText = "Surfing Spot";
                                        imgSrc = "./images/encounters/quickball.png";
                                        break;
                                    case "yellow-flower":
                                        methodText = "Yellow Flowers";
                                        imgSrc = "./images/encounters/nestball.png";
                                        break;
                                    case "purple-flower":
                                        methodText = "Purple Flowers";
                                        imgSrc = "./images/encounters/nestball.png";
                                        break;
                                    case "red-flowers":
                                        methodText = "Red Flowers";
                                        imgSrc = "./images/encounters/nestball.png";
                                        break;
                                    case "rough-terrain":
                                        methodText = "Rough Terrain";
                                        imgSrc = "./images/encounters/duskball.png";
                                        break;
                                    case "gift":
                                        methodText = "Gift";
                                        imgSrc = "./images/encounters/premierball.png";
                                        break;
                                    case "gift-egg":
                                        methodText = "Gift Egg";
                                        imgSrc = "./images/encounters/healball.png";
                                        break;
                                }
                                const rowDiv = document.createElement("div");
                                rowDiv.classList.add("encounter-item");
                                rowDiv.innerHTML = `<img class="encounter-image" src="${imgSrc}">
                                <div class="encounter-type">${methodText}</div>
                                <div class="encounter-location caps">${encounterLocation}</div>`;
                                encounterList.appendChild(rowDiv);
                            }
                        }
                    }
                });
            document.querySelector("#pkmnID").innerHTML = `#${pid}`;
            document.querySelector("#pkmnSprite").src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pid}.png`;
        } else {
            pokemonDetailsPage.classList.add("pokedex-view");
        }


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

poke.gameToVersionGroup = function(game) {
    if (!game) {
        return null;
    }
    switch (game) {
        case "red":
        case "blue":
            return "red-blue";
        case "yellow":
            return "yellow";
        case "gold":
        case "silver":
            return "gold-silver";
        case "crystal":
            return "crystal";
        case "ruby":
        case "sapphire":
            return "ruby-sapphire";
        case "emerald":
            return "emerald";
        case "firered":
        case "leafgreen":
            return "firered-leafgreen";
        case "diamond":
        case "pearl":
            return "diamond-pearl";
        case "platinum":
            return "platinum";
        case "heartgold":
        case "soulsilver":
            return "heartgold-soulsilver";
        case "black":
        case "white":
            return "black-white";
        case "black-2":
        case "white-2":
            return "black-2-white-2";
        case "x":
        case "y":
            return "x-y";
        case "sun":
        case "moon":
            return "sun-moon"
        case "ultra-sun":
        case "ultra-moon":
            return "ultra-sun-ultra-moon";
    }
    return null;
}

poke.parseEvolutionType = function(evolution, speciesID) {
    if (evolution) {
        let evoDesc = "";
        const gender = (evolution.gender ? (evolution.gender == 1 ? "female" : "male") : null);
        const heldItem = (evolution.held_item ? evolution.held_item.name.replaceAll("-", " ") : null);
        const item = (evolution.item ? evolution.item.name.replaceAll("-", " ") : null);
        const knownMove = (evolution.known_move ? evolution.known_move.name.replaceAll("-", " ") : null);
        const knownMoveType = (evolution.known_move_type ? evolution.known_move_type.name.replaceAll("-", " ") : null);
        const location = (evolution.location ? evolution.location.name.replaceAll("-", " ") : null);
        const minAffection = (evolution.min_affection ? "Affection" : null);
        const minBeauty = (evolution.min_beauty ? "High beauty" : null);
        const happiness = evolution.min_happiness;
        const level = evolution.min_level;
        const rain = evolution.needs_overworld_rain;
        const partySpecies = (evolution.party_species ? evolution.party_species.name : null);
        const partyType = (evolution.party_type ? evolution.party_type.name : null);
        const relativePhysicalStats = (evolution.relative_physical_stats != null ? (evolution.relative_physical_stats == 0 ? "same stats" : (evolution.relative_physical_stats == 1 ? "higher attack" : "higher defense")) : null);
        const time = evolution.time_of_day;
        const tradeSpecies = (evolution.trade_species ? evolution.trade_species.name : null);
        switch (evolution.trigger.name) {
            case "level-up":
                if (gender) {
                    evoDesc += gender + " ";
                }
                evoDesc += "level";
                if (level) {
                    evoDesc += " " + level;
                }
                if (knownMove) {
                    evoDesc += " knowing " + knownMove;
                }
                if (minBeauty) {
                    evoDesc += " high beauty";
                }
                if (minAffection) {
                    evoDesc += " high affection";
                }
                if (knownMoveType) {
                    evoDesc += " knowing move of type " + knownMoveType;
                }
                if (relativePhysicalStats) {
                    evoDesc += relativePhysicalStats;
                }
                if (happiness) {
                    evoDesc += " high happiness";
                }
                if (location) {
                    evoDesc += " at " + location;
                }
                if (rain) {
                    evoDesc += " in rain";
                }
                if (partySpecies) {
                    evoDesc += " with a " + partySpecies;
                }
                if (partyType) {
                    evoDesc += " with a " + partyType + " type";
                }
                if (time) {
                    evoDesc += " at " + time;
                }
                if (heldItem) {
                    evoDesc += " holding " + heldItem;
                }
                return evoDesc;
            case "trade":
                evoDesc = "trade";
                if (heldItem) {
                    evoDesc += " with " + heldItem;
                }
                if (tradeSpecies) {
                    evoDesc += " with a " + tradeSpecies;
                }
                return evoDesc;
            case "use-item":
                if (item) {
                    return "use " + item;
                } else {
                    return "use something";
                }
            case "shed":
                return "evolve with an open space"
            case "other":
                switch (speciesID) {
                    case "865":
                        return "get 3 crits";
                    case "867":
                        return "take 49 damage";
                    case "869":
                        return "spin with sweet";
                    case "892":
                        return "complete a tower";
                }
                break;
        }
    }
    return "";
}

poke.initializePage = function() {
    const urlParams = new URLSearchParams(window.location.search);
    new poke.SideNavController();
    if (document.querySelector("#pokemonDetailsPage")) {
        const pid = urlParams.get("pid");
        const game = urlParams.get("game");
        poke.fbPokemonManager = new this.FbPokemonManager(pid);
        new poke.PokemonPageController(pid, poke.gameToVersionGroup(game), game);
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
            // console.log("Signed in", uid);
            // console.log('displayName :>> ', displayName);
            // console.log('email :>> ', email);
            // console.log('photoURL :>> ', photoURL);
            // console.log('isAnonymous :>> ', isAnonymous);
            // console.log('phoneNumber :>> ', phoneNumber);
            // console.log('uid :>> ', uid);
            console.log("The user signed in ", uid);
            // ...
        } else {
            // User is signed out
            // ...
            console.log("There is no user signed in");
        }
    });

    const inputEmailEl = document.querySelector("#inputEmail");
    const inputPasswordEl = document.querySelector("#inputPassword");

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

    // poke.startFirebaseAuthUi();
};

// poke.startFirebaseAuthUi = () => {
//     // Initialize the FirebaseUI Widget using Firebase.
//     var ui = new firebaseui.auth.AuthUI(firebase.auth());
//     ui.start('#firebaseui-auth-container', {
//         signInSuccessUrl: '/',
//         signInOptions: [
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//             firebase.auth.EmailAuthProvider.PROVIDER_ID,
//         ],
//         // Other config options...
//     });
// }

poke.main();