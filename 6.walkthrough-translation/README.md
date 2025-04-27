# UI5 Tutorial

Copy all files from the last `5.walkthrough-mvc`.

## Walkthrough - Translation

In this step we move the texts of our UI to a separate resource file so it can be easily translated into other languages. `i18n` is achieved in SAPUI5 by using a special resource model and the standard data binding syntax.

1. Create i18n.properties

Create `webapp/i18n/i18n.properties` with the following content. The properties file for texts contains name-value pairs for each element. You can add any number of parameters to the texts by adding numbers in curly brackets to them. These numbers correspond to the sequence in which the parameters are accessed (starting with 0).  You can create separate files for each supported language with a suffix for the locale, for example `i18n_de.properties` for German, `i18n_en.properties` for English, and so on.

```sh
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```

2. Update App.view.xml

In the XML view `App.view.xml`, we use data binding to connect the button text to the `showHelloButtonText` property in the i18n model. A resource bundle is a flat structure, therefore the preceding slash (/) can be omitted for the path.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Button
    text="{i18n>showHelloButtonText}"
    press=".onShowHello"/>
  <Input
    value="{/recipient/name}"
    description="Hello {/recipient/name}"
    valueLiveUpdate="true"
    width="60%"/>
</mvc:View>
```

3. Update App.controller.js

Update `webapp/controller/App4.controller.js` with the following content. In the `onInit` function we instantiate the ResourceModel that points to the new message bundle file where our texts are now located (i18n.properties file). The bundle name `ui5.walkthrough.i18n.i18n` consists of the application namespace `ui5.walkthrough` (the application root as defined in the index.html), the folder name `i18n` and finally the file name `i18n without extension`.

In the `onShowHello` event handler function we access the i18n model to get the text from the message bundle file and replace the placeholder {0} with the recipient from our data model. The `getProperty` method can be called in any model and takes the data path as an argument. In addition, the resource bundle has a specific getText method that takes an array of strings as second argument.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/resource/ResourceModel"
], (Controller, MessageToast, JSONModel, ResourceModel) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App", {
    onInit() {
      // set data model on view
      const oData = {
        recipient : {
          name : "World"
        }
      };
      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);

      // set i18n model on view
      const i18nModel = new ResourceModel({
        bundleName: "ui5.walkthrough.i18n.i18n"
      });
      this.getView().setModel(i18nModel, "i18n");
    },
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

4. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see an input box at right side of "Say Hello" button with content "World". If you change the value of `showHelloButtonText` and `helloMsg` in `i18n.properties` file, you should see the new text in browser.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/df86bfbeab0645e5b764ffa488ed57dc
