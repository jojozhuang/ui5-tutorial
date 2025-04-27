sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App3", {
    onShowHello() {
      // show a native JavaScript alert
      alert("Hello World from Controller");
    }
  });
});