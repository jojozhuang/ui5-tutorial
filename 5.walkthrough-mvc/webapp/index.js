sap.ui.define([
  "sap/m/Text"
], (Text) => {
  "use strict";

  new Text({
    text: "Hello World With Text Control"
  }).placeAt("content");
});