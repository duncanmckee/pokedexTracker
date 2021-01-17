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


poke.LoginPageController = class {
	constructor();
}
poke.ProfilePageController = class {
	constructor();
	updatePage();
}
poke.PokedexPageController = class {
	constructor();
	updatePage();
}
poke.PokemonPageController = class {
	constructor();
	updatePage();
}
poke.TradesListPageController = class {
	constructor();
	updatePage();
}
poke.TradeDetailPageController = class{
	constructor();
	updatePage();
}

poke.FbAuthManager = class {
	constructor();
	beginListening(changeListener);
	signIn();
	signOut();
}
poke.FbProfileManager = class {
	constructor();
	tryCreateNewUser(uid,name);
	beginListening(changeListener);
	stopListening();
	updateName(name);
	addGame(game);
	removeGame(game);
}
poke.FbPokedexManager = class {
	constructor(uid);
	beginListening(changeListener);
	stopListening();
	getPokemonAtIndex(index);
}
poke.FbPokemonManager = class {
	constructor();
	addOwned();
	beginListening(changeListener);
	stopListening();
	removeOwned();
}
poke.FbTradesListManager = class {
	constructor(uid);
	createTrade(pokemon,description);
	beginListening(changeListener);
	stopListening();
	getTradeAtIndex(index);
}
poke.FbTradeDetailManager = class {
	constructor();
	beginListening(changeListener);
	stopListening();
	updateTrade(description);
	deleteTrade();
}

poke.Pokemon = class {
	constructor(id,name,owned);
}
poke.Trade = class {
	constructor(id,uid,pokemon,description);
}

poke.main = function () {
	console.log("Ready");
};

poke.main();
