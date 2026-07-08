const cds = require("@sap/cds");

// The Fiori preview shell requests app assets from /spacefarer/*
// while cds-plugin-ui5 serves this app from /spacefarer/webapp/*.
// Redirect the few root-level asset requests the preview needs.
cds.on("bootstrap", (app) => {
  app.get(/^\/spacefarer\/(Component\.js|manifest\.json)$/, (req, res) => {
    res.redirect(302, `/spacefarer/webapp/${req.params[0]}`);
  });

  app.get(/^\/spacefarer\/i18n\/(.+)$/, (req, res) => {
    res.redirect(302, `/spacefarer/webapp/i18n/${req.params[0]}`);
  });
});

module.exports = cds.server;
