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
		if(menuProfileItem) {
			menuProfileItem.addEventListener("click", (event) => {
				window.location.href = "/profile.html";
			});
		}
		const menuShowAllItem = document.querySelector("#menuShowAll");
		if(menuShowAllItem) {
			menuShowAllItem.addEventListener("click", (event) => {
				window.location.href = "/dex.html"; 
			});
		}
		const menuShowMyItem = document.querySelector("#menuShowMy");
		if(menuShowMyItem) {
			menuShowMyItem.addEventListener("click", (event) => {
				window.location.href = `/dex.html?uid=${rhit.fbAuthManager.uid}`;
			});
		}
		const menuSignOutItem = document.querySelector("#menuSignOut");
		if(menuSignOutItem) {
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
		fetch(`https://pokeapi.co/api/v2/pokemon/${pid}`)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			let name = data.name;
			document.querySelector("#pkmnName").innerHTML = name;
			document.querySelector("#pkmnHT").innerHTML = `HT: ${data.weight/10} m`;
			document.querySelector("#pkmnWT").innerHTML = `WT: ${data.height/10} kg`;
			const hpStat = data.stats[0].base_stat;
			const atkStat = data.stats[1].base_stat;
			const defStat = data.stats[2].base_stat;
			const spatkStat = data.stats[3].base_stat;
			const spdefStat = data.stats[4].base_stat;
			const spdStat = data.stats[5].base_stat;
			document.querySelector("#hpValue").innerHTML = hpStat;
			document.querySelector("#atkValue").innerHTML = atkStat;
			document.querySelector("#defValue").innerHTML = defStat;
			document.querySelector("#spatkValue").innerHTML = spatkStat;
			document.querySelector("#spdefValue").innerHTML = spdefStat;
			document.querySelector("#spdValue").innerHTML = spdStat;
			document.querySelector(".hp-bar").style = `width:${100*hpStat/255}%;`;
			document.querySelector(".atk-bar").style = `width:${100*atkStat/255}%;`;
			document.querySelector(".def-bar").style = `width:${100*defStat/255}%;`;
			document.querySelector(".spatk-bar").style = `width:${100*spatkStat/255}%;`;
			document.querySelector(".spdef-bar").style = `width:${100*spdefStat/255}%;`;
			document.querySelector(".spd-bar").style = `width:${100*spdStat/255}%;`;
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
poke.TradeDetailPageController = class{
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
	tryCreateNewUser(uid,name) {

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
	createTrade(pokemon,description) {

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
	constructor(id,name,owned) {

	}
}
poke.Trade = class {
	constructor(id,uid,pokemon,description) {

	}
}

poke.initializePage = function() {
	const urlParams = new URLSearchParams(window.location.search);
	new poke.SideNavController();
	if(document.querySelector("#pokemonDetailsPage")) {
		const pid = urlParams.get("pid");
		if(!pid) {
			window.location.href = "/pokemon.html?pid=1";
		} else {
			poke.fbPokemonManager = new this.FbPokemonManager(pid);
			new poke.PokemonPageController(pid);
		}
	}
}

poke.main = function () {
	poke.fbAuthManager = new poke.FbAuthManager();
	poke.initializePage();
};

poke.main();
