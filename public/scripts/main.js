var poke = poke || {};

poke.NUM_POKEMON = 898;

poke.FB_COLLECTION_USERS = "User";
poke.FB_USERS_KEY_NAME = "name";
poke.FB_USERS_KEY_CONTACT = "contactEmail";
poke.FB_USERS_KEY_GAMES = "gameOwned";
poke.FB_USERS_KEY_POKEMON = "pokemonOwned";

poke.FB_COLLECTION_TRADE = "TradeRequest";
poke.FB_TRADE_KEY_AUTHOR = "author";
poke.FB_TRADE_KEY_POKEMON = "pokemonId";
poke.FB_TRADE_KEY_DESCRIPTION = "requestText";
poke.FB_TRADE_KEY_TIMESTAMP = "lastEdit";

poke.fbAuthManager = null;
poke.fbProfileManager = null;
poke.fbPokemonManager = null;
poke.fbTradesManager = null;


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
            if(!poke.fbAuthManager.isSignedIn) {
                menuProfileItem.style.display = "none";
            }
            menuProfileItem.addEventListener("click", (event) => {
                window.location.href = "/profile.html";
            });
        }
        const menuShowAllItem = document.querySelector("#menuShowAll");
        if (menuShowAllItem) {
            menuShowAllItem.addEventListener("click", (event) => {
                window.location.href = "/pokemon.html";
            });
        }
        const menuShowTrades = document.querySelector("#menuShowTrades");
        if (menuShowTrades) {
            menuShowTrades.addEventListener("click", (event) => {
                window.location.href = "/trades.html";
            });
        }
        const menuSignInItem = document.querySelector("#menuSignIn");
        if(menuSignInItem) {
            if(poke.fbAuthManager.isSignedIn) {
                menuSignInItem.style.display = "none";
            }
            menuSignInItem.addEventListener("click", (event) => {
                window.location.href = "/";
            });
        }
        const menuSignOutItem = document.querySelector("#menuSignOut");
        if (menuSignOutItem) {
            if(!poke.fbAuthManager.isSignedIn) {
                menuSignOutItem.style.display = "none";
            }
            menuSignOutItem.addEventListener("click", (event) => {
                poke.fbAuthManager.signOut();
                if(menuProfileItem) menuProfileItem.style.display = "none";
                if(menuSignInItem) menuSignInItem.style.display = "flex";
                menuSignOutItem.style.display = "none";
            });
        }
    }
}
poke.LoginPageController = class {
    constructor() {
        const inputEmailEl = document.querySelector("#inputEmail");
        const inputPasswordEl = document.querySelector("#inputPassword");

        document.querySelector("#createAccountButton").onclick = (event) => {
            poke.fbAuthManager.createAccount(inputEmailEl.value, inputPasswordEl.value);
        };

        document.querySelector("#logInButton").onclick = (event) => {
            poke.fbAuthManager.signIn(inputEmailEl.value, inputPasswordEl.value);
        };

        document.querySelector("#anonymousAuthButton").onclick = (event) => {
            window.location.href = "/pokemon.html";
        };
    }
}
poke.ProfilePageController = class {
    constructor() {
        document.querySelector("#eMailDisplay").innerHTML = poke.fbAuthManager.email;
        poke.fbProfileManager.getUserByUid(poke.fbAuthManager.uid).then((name) => {
            document.querySelector("#inputDisplayName").value = name;
        });
        document.querySelector("#updateDisplayName").onclick = (event) => {
            poke.fbProfileManager.updateName(document.querySelector("#inputDisplayName").value);
        };
        document.querySelector("#viewPokedexButton").onclick = (event) => {
            window.location.href = "/pokemon.html";
        };
        document.querySelector("#viewTradesButton").onclick = (event) => {
            window.location.href = "/trades.html";
        };
        poke.fbPokemonManager.beginListening(this.updatePage.bind(this));
    }
    updatePage() {
        const num = poke.fbPokemonManager.getNumPokemon();
        document.querySelector("#completionRatio").innerHTML = `${num}/${poke.NUM_POKEMON} [${Math.floor(num/poke.NUM_POKEMON*100)}%]`;
    }
}
poke.PokemonPageController = class {
    constructor(pid = null, versionGroupIn = null, versionIn = null) {
        this._pid = pid;
        const pokemonDetailsPage = document.querySelector("#pokemonDetailsPage");
        const pokedexList = document.querySelector("#pokedexList");
        pokedexList.innerHTML = "";
        for (let id = 1; id <= poke.NUM_POKEMON; id++) {
            const idstay = id;
            const pokeIcon = document.createElement("div")
            pokeIcon.classList.add("dex-icon");
            pokeIcon.innerHTML = `<img id="pkmn${id}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idstay}.png">`;
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

        document.querySelector("#addPokeButton").onclick = (event) => {
            poke.fbPokemonManager.addOwned(pid);
        };
        document.querySelector("#removePokeButton").onclick = (event) => {
            poke.fbPokemonManager.removeOwned(pid);
        };
        document.querySelector("#addPokeButton").style.display = "none";
        document.querySelector("#removePokeButton").style.display = "none";
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
                                rowDiv.onclick = (event) => {
                                    if (versionIn) {
                                        window.location.href = `/pokemon.html?pid=${speciesID}&game=${versionIn}`;
                                    } else {
                                        window.location.href = `/pokemon.html?pid=${speciesID}`;
                                    }
                                };
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

        poke.fbPokemonManager.beginListening(this.updatePage.bind(this));

        if (pid) {
            const iconHeight = document.querySelector(".dex-icon").offsetHeight;
            const scrollHeight = iconHeight * (Math.floor(pid / 3) - 2);
            pokedexList.scrollTop = scrollHeight;
        }
    }
    updatePage() {
        for (let id = 1; id <= poke.NUM_POKEMON; id++) {
            const pokeIcon = document.querySelector(`#pkmn${id}`);
            if (poke.fbPokemonManager.ownsPokemon(id)) {
                pokeIcon.classList.remove("not-owned-poke");
            } else {
                pokeIcon.classList.add("not-owned-poke");
            }
        }
        if (poke.fbPokemonManager.ownsPokemon(this._pid)) {
            document.querySelector("#addPokeButton").style.display = "none";
            document.querySelector("#removePokeButton").style.display = "block";
        } else {
            document.querySelector("#addPokeButton").style.display = "block";
            document.querySelector("#removePokeButton").style.display = "none";
        }
    }
}
poke.TradesPageController = class {
    constructor(tradeDisplayed) {
        if(!poke.fbAuthManager.isSignedIn) {
            document.querySelector("#addFab").style.display = "none";
        }
        this._tradesListElement = document.querySelector("#tradesList");
        this._tradeDisplayIcon = document.querySelector("#tradeDisplayIcon");
        this._tradeDisplayUser = document.querySelector("#tradeDisplayUser");
        this._tradeDisplayMessage = document.querySelector("#tradeDisplayMessage");
        this._tradeDisplayOptions = document.querySelector("#tradeDisplayOptions");
        poke.fbTradesManager.beginListening(this.updatePage.bind(this));
        if (tradeDisplayed != undefined)
            this._tradeDisplayed = tradeDisplayed;
        else
            this._tradeDisplayed = 0;
        $("#addTradeModal").on("show.bs.modal", (event) => {
            document.querySelector("#inputPokemonAdd").value = "";
            document.querySelector("#inputDescriptionAdd").value = "";
        });
        $("#addTradeModal").on("shown.bs.modal", (event) => {
            document.querySelector("#inputPokemonAdd").focus();
        });
        document.querySelector("#submitAddTrade").onclick = (event) => {
            const pokemon = document.querySelector("#inputPokemonAdd").value;
            const description = document.querySelector("#inputDescriptionAdd").value;
            poke.fbTradesManager.createTrade(pokemon, description);
        };
        $("#editTradeModal").on("show.bs.modal", (event) => {
            const trade = poke.fbTradesManager.getTradeAtIndex(this._tradeDisplayed);
            document.querySelector("#inputDescriptionEdit").value = trade.description;
        });
        $("#editTradeModal").on("shown.bs.modal", (event) => {
            document.querySelector("#inputDescriptionEdit").focus();
        });
        document.querySelector("#submitEditTrade").addEventListener("click", (event) => {
            const description = document.querySelector("#inputDescriptionEdit").value;
            poke.fbTradesManager.updateTrade(this._tradeDisplayed, description);
        });
        document.querySelector("#submitDeleteTrade").addEventListener("click", (event) => {
            poke.fbTradesManager.deleteTrade(this._tradeDisplayed);
        });
    }
    updatePage() {
        this._tradesListElement.innerHTML = "";
        for (let i = 0; i < poke.fbTradesManager.length; i++) {
            const index = i;
            const trade = poke.fbTradesManager.getTradeAtIndex(index);
            const newTrade = document.createElement("div");
            newTrade.onclick = (event) => {
                window.location.href = `/trades.html?trade=${index}`;
            }
            newTrade.classList.add("trade-item");
            trade.getName().then((name) => {
                newTrade.innerHTML = `<div class="trade-icon-holder">
                <img class="trade-icon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${trade.pokemon}.png">
                </div>
                <h1 class="trade-user">${name}</h1>
                <div class="trade-message">${trade.description}</div>`;
            });
            this._tradesListElement.appendChild(newTrade);
        }
        if (poke.fbTradesManager.length > this._tradeDisplayed) {
            const trade = poke.fbTradesManager.getTradeAtIndex(this._tradeDisplayed);
            this._tradeDisplayIcon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${trade.pokemon}.png`;
            trade.getName().then((name) => {
                this._tradeDisplayUser.innerHTML = name;
            });
            this._tradeDisplayMessage.innerHTML = trade.description;
            if (poke.fbAuthManager.isSignedIn && poke.fbAuthManager.uid == trade.uid) {
                this._tradeDisplayOptions.style.display = "block";
            } else {
                this._tradeDisplayOptions.style.display = "none";
            }
        }
    }
}

poke.FbAuthManager = class {
    constructor() {
        this._user = null;
        this._name = "";
    }
    beginListening(changeListener) {
        firebase.auth().onAuthStateChanged((user) => {
            this._user = user;
            changeListener();
        });
    }
    signIn(email, pass) {
        firebase.auth().signInWithEmailAndPassword(email, pass);
    }
    createAccount(email, pass) {
        firebase.auth().createUserWithEmailAndPassword(email, pass);
    }
    signOut() {
        firebase.auth().signOut();
    }
    get isSignedIn() {
        return !!this._user;
    }
    get uid() {
        return this._user.uid;
    }
    get email() {
        return this._user.email;
    }
    get name() {
        return this._name || this._user.displayName;
    }
}
poke.FbProfileManager = class {
    constructor() {
        this._usersRef = firebase.firestore().collection(poke.FB_COLLECTION_USERS);
        this._user = null;
        this._unsubscribe = null;
    }
    tryCreateNewUser(uid, name) {
        const userRef = this._usersRef.doc(uid);
        return userRef.get().then((doc) => {
            if(!doc.exists) {
                return userRef.set({
                    [poke.FB_USERS_KEY_NAME]: name,
                    [poke.FB_USERS_KEY_GAMES]: {},
                    [poke.FB_USERS_KEY_POKEMON]: {}
                }).then(() => {
                    return true;
                }).catch((err) => {
                    return false;
                });
            }else {
                return false;
            }
        });
    }
    beginListening(uid, changeListener) {
        const userRef = this._usersRef.doc(uid);
        this._unsubscribe = userRef.onSnapshot((doc) => {
            if(doc.exists) {
                this._user = doc;
                if(changeListener) changeListener();
            }
        });
    }
    getUserByUid(uid) {
        const userRef = this._usersRef.doc(uid);
        return userRef.get().then((doc) => {
            if(doc) {
                return doc.data().name;
            }
            return "";
        });
    }
    stopListening() {
        if(this._unsubscribe) this._unsubscribe();
    }
    updateName(name) {
        const userRef = this._usersRef.doc(poke.fbAuthManager.uid);
        return userRef.update({
            [poke.FB_USERS_KEY_NAME]: name
        });
    }
    addGame(game) {

    }
    removeGame(game) {

    }
}
poke.FbPokemonManager = class {
    constructor(pid) {
        if(poke.fbAuthManager.isSignedIn) {
            this._pid = pid;
            this._pokedex = {};
            this._unsubscribe = null;
            this._pokedexRef = firebase.firestore().collection(poke.FB_COLLECTION_USERS).doc(poke.fbAuthManager.uid);
        }
    }
    addOwned(pid) {
        if(poke.fbAuthManager.isSignedIn) {
            this._pokedex[pid] = true;
            this._pokedexRef.update({
                [poke.FB_USERS_KEY_POKEMON]: this._pokedex
            });
        }
    }
    beginListening(changeListener) {
        if(poke.fbAuthManager.isSignedIn) {
            this._unsubscribe = this._pokedexRef.onSnapshot((doc) => {
                if (doc.exists) {
                    this._pokedex = doc.get(poke.FB_USERS_KEY_POKEMON);
                    if (changeListener) changeListener();
                }
            });
        }
    }
    stopListening() {
        if(poke.fbAuthManager.isSignedIn) {
            if (this._unsubscribe) this._unsubscribe();
        }
    }
    removeOwned(pid) {
        if(poke.fbAuthManager.isSignedIn) {
            this._pokedex[pid] = false;
            this._pokedexRef.update({
                [poke.FB_USERS_KEY_POKEMON]: this._pokedex
            });
        }
    }
    ownsPokemon(pid) {
        if(poke.fbAuthManager.isSignedIn) {
            return !!this._pokedex[pid];
        }
    }
    getNumPokemon() {
        if(poke.fbAuthManager.isSignedIn) {
            let count = 0;
            for(let i = 0; i < poke.NUM_POKEMON; i++) {
                if(!!this._pokedex[i]) {
                    count++;
                }
            }
            return count;
        }
        return 0;
    }
}
poke.FbTradesManager = class {
    constructor() {
        this._tradesList = [];
        this._unsubscribe = null;
        this._tradesRef = firebase.firestore().collection(poke.FB_COLLECTION_TRADE);
    }
    createTrade(pokemon, description) {
        this._tradesRef.add({
            [poke.FB_TRADE_KEY_AUTHOR]: poke.fbAuthManager.uid,
            [poke.FB_TRADE_KEY_POKEMON]: pokemon,
            [poke.FB_TRADE_KEY_DESCRIPTION]: description,
            [poke.FB_TRADE_KEY_TIMESTAMP]: firebase.firestore.Timestamp.now()
        });
    }
    beginListening(changeListener) {
        this._unsubscribe = this._tradesRef.orderBy(poke.FB_TRADE_KEY_TIMESTAMP, "desc").limit(50).onSnapshot((snapshot) => {
            this._tradesList = snapshot.docs;
            if (changeListener) changeListener();
        });
    }
    stopListening() {
        if (this._unsubscribe) this._unsubscribe();
    }
    get length() {
        return this._tradesList.length;
    }
    getTradeAtIndex(index) {
        const trade = this._tradesList[index];
        return new poke.Trade(
            trade.id,
            trade.get(poke.FB_TRADE_KEY_AUTHOR),
            trade.get(poke.FB_TRADE_KEY_POKEMON),
            trade.get(poke.FB_TRADE_KEY_DESCRIPTION)
        );
    }
    updateTrade(index, description) {
        const trade = this.getTradeAtIndex(index);
        this._tradesRef.doc(trade.id).update({
            [poke.FB_TRADE_KEY_DESCRIPTION]: description,
            [poke.FB_TRADE_KEY_TIMESTAMP]: firebase.firestore.Timestamp.now()
        });
    }
    deleteTrade(index) {
        const trade = this.getTradeAtIndex(index);
        this._tradesRef.doc(trade.id).delete();
    }
}

poke.Trade = class {
    constructor(id, uid, pokemon, description) {
        this.id = id;
        this.uid = uid;
        this.pokemon = pokemon;
        this.description = description;
    }
    getName() {
        return poke.fbProfileManager.getUserByUid(this.uid).then((value) => {
            return value;
        })
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

poke.checkForRedirects = function() {
    if(document.querySelector("#loginPage") && poke.fbAuthManager.isSignedIn) {
        window.location.href = "/pokemon.html";
    }
    if(document.querySelector("#profilePage") && !poke.fbAuthManager.isSignedIn) {
        window.location.href = "/";
    }
}
poke.initializePage = function() {
    const urlParams = new URLSearchParams(window.location.search);
    new poke.SideNavController();
    const pid = urlParams.get("pid");
    poke.fbPokemonManager = new poke.FbPokemonManager(pid);
    if (document.querySelector("#loginPage")) {
        new poke.LoginPageController();
    }
    if (document.querySelector("#profilePage")) {
        new poke.ProfilePageController();
    }
    if (document.querySelector("#pokemonDetailsPage")) {
        const game = urlParams.get("game");
        new poke.PokemonPageController(pid, poke.gameToVersionGroup(game), game);
    }
    if (document.querySelector("#tradesPage")) {
        const tradeID = urlParams.get("trade");
        poke.fbTradesManager = new poke.FbTradesManager();
        new poke.TradesPageController(tradeID);
    }
}
poke.createUserObjectIfNeeded = function() {
    return new Promise((resolve, reject) => {
        if(!poke.fbAuthManager.isSignedIn) {
            resolve(false);
            return;
        }
        if(!document.querySelector("#loginPage")) {
            resolve(false);
            return;
        }
        poke.fbProfileManager.tryCreateNewUser(poke.fbAuthManager.uid, poke.fbAuthManager.name).then((isUserNew) => {
            resolve(isUserNew);
        });
    });
}

poke.main = function() {
    poke.fbAuthManager = new poke.FbAuthManager();
    poke.fbProfileManager = new poke.FbProfileManager();
    poke.fbAuthManager.beginListening(() => {
        poke.createUserObjectIfNeeded().then((isUserNew) => {
            if(isUserNew) {
                window.location.href = "/profile.html";
                return;
            }
            poke.checkForRedirects();
            poke.initializePage();
        })
    });
};

poke.main();