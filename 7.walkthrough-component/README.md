# UI5 Tutorial

Copy all files from the last `6.walkthrough-translation`.

## Walkthrough - Component Configuration

After we have introduced all three parts of the Model-View-Controller (MVC) concept, we now come to another important structural aspect of SAPUI5, `component`.

1. Create Component.js

Create `webapp/Component.js` with the following content. It will hold our application setup. This file consists of two parts: The new `metadata` section and the `init` function that is called when the component is initialized. Our component inherits from the base class `sap/ui/core/UIComponent`. The metadata section defines a reference to the root view, so that instead of displaying the root view directly in the `index.js` file as we did previously, the component now manages the display of the app view. It also implements the `sap.ui.core.IAsyncContentCreation` interface, which allows the component to be created fully asynchronously.

```js
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/resource/ResourceModel"
], (UIComponent, JSONModel, ResourceModel) => {
  "use strict";

  return UIComponent.extend("ui5.walkthrough.Component", {
    metadata : {
      "interfaces": ["sap.ui.core.IAsyncContentCreation"],
      "rootView": {
        "viewName": "ui5.walkthrough.view.App",
        "type": "XML",
        "id": "app"
      }
    },

    init() {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments);
      // set data model
      const oData = {
        recipient : {
          name : "World"
        }
      };
      const oModel = new JSONModel(oData);
      this.setModel(oModel);

      // set i18n model
      const i18nModel = new ResourceModel({
        bundleName: "ui5.walkthrough.i18n.i18n"
      });
      this.setModel(i18nModel, "i18n");
    }
  });
});
```

2. Update App.controller.js

Update `webapp/controller/App.controller.js` with the following content. We delete the `onInit` function and the required modules; this is now done in the component.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], (Controller, MessageToast) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App", {
    onShowHello() {
      // read msg from i18n model
      const oBundle = this.getView().getModel("i18n").getResourceBundle();
      const sRecipient = this.getView().getModel().getProperty("/recipient/name");
      const sMsg = oBundle.getText("helloMsg", [sRecipient]);

      // show message
      MessageToast.show(sMsg);
    }
  });
});
```

3. Update index.js

Update `webapp/index.js` with the following content. We now create a component container instead of the view in `index.js` that instantiates the view for us according to the component configuration.

```js
sap.ui.define([
  "sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
  "use strict";

  new ComponentContainer({
    name: "ui5.walkthrough",
    settings : {
      id : "walkthrough"
    },
    async: true
  }).placeAt("content");
});
```

4. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see an input box at right side of "Say Hello" button with content "World". If you change the value of `showHelloButtonText` and `helloMsg` in `i18n.properties` file, you should see the new text in browser.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/df86bfbeab0645e5b764ffa488ed57dc
