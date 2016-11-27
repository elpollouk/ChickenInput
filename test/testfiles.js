(function () {
	"use strict";

	// External libs
	Test.addScripts(
		"https://elpollouk.github.io/libs/ChickenFW.js"
	);

	//              System under test                   Test script
    Test.addScripts("../js/pointer.js",                 "pointer.tests.js");
})();
