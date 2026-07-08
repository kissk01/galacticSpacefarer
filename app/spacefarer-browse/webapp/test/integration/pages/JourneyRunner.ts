import JourneyRunner from "sap/fe/test/JourneyRunner";
import ListReport from "sap/fe/test/ListReport";
import ObjectPage from "sap/fe/test/ObjectPage";
import CustomSpacefarersListGenerated from "./SpacefarersList.gen";
import CustomSpacefarersObjectPageGenerated from "./SpacefarersObjectPage.gen";

const runner = new JourneyRunner({
    launchUrl: sap.ui.require.toUrl("spacefarerbrowse") + "/test/flp.html#app-preview",
    pages: {
        onTheSpacefarersListGenerated: new ListReport(
            {
                appId: "spacefarerbrowse",
                componentId: "SpacefarersList",
                contextPath: "/Spacefarers"
            },
            CustomSpacefarersListGenerated
        ),
        onTheSpacefarersObjectPageGenerated: new ObjectPage(
            {
                appId: "spacefarerbrowse",
                componentId: "SpacefarersObjectPage",
                contextPath: "/Spacefarers"
            },
            CustomSpacefarersObjectPageGenerated
        )
    },
    async: true
});

export default runner;
