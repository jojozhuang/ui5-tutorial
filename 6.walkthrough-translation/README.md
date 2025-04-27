# UI5 Tutorial

Copy all files from the last `5.walkthrough-mvc`.

## Walkthrough - Translation

1. Create App4.view.xml

Create `webapp/view/App3.view.xml` with the following content. We add a button with text "Say Hello". The button triggers the `.onShowHello` event handler function when being pressed. We also have to set `controllerName` attribute of the view. The controllerName is a combination of the namespace of your application followed by the actual name of the controller, it's actually pointing to `App4.controller.js`.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App4"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Button
    text="Say Hello"
    press=".onShowHello"/>
</mvc:View>
```

2. Create App4.controller.js

Create `webapp/controller/App4.controller.js` with the following content. We extend the array of required modules with the fully qualified path to `sap/m/MessageToast`. Once both modules, Controller and MessageToast, are loaded, the callback function is called, and we can make use of both objects by accessing the parameters passed to the function.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], (Controller, MessageToast) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App4", {
     onShowHello() {
        MessageToast.show("Hello World from MessageToast");
     }
  });
});
```

3. Create index4.js

Create `webapp/index4.js` with the following content. We create a new view with our new `App4.view.xml` file. The view name is prefixed with the namespace `ui5.walkthrough.view` in order to uniquely identify this resource.

```js
sap.ui.define([
  "sap/ui/core/mvc/XMLView"
], (XMLView) => {
  "use strict";

  XMLView.create({
    viewName: "ui5.walkthrough.view.App4"
  }).then((oView) => oView.placeAt("content"));
});
```

4. Create index4.html

Create `webapp/index4.html` by copying `webapp/index.html`, update `data-sap-ui-on-init` with the new index file `index4`.

```html
data-sap-ui-on-init="module:ui5/walkthrough/index4"
```

5. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index4.html. You should see `Say Hello` button in the home page. Click on it, and you should see a toast message `Hello World from MessageToast`.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/df86bfbeab0645e5b764ffa488ed57dc
