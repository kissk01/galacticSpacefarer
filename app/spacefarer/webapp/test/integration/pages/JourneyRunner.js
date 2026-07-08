sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"spacefarer/test/integration/pages/SpacefarersObjectPage.gen"
], function (JourneyRunner, SpacefarersObjectPageGenerated) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('spacefarer') + '/test/flp.html#app-preview',
        pages: {
			onTheSpacefarersObjectPageGenerated: SpacefarersObjectPageGenerated
        },
        async: true
    });

    return runner;
});

