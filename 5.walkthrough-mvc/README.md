# UI5 Tutorial

Copy all files from `4.walkthrough-bootstrap`.

## Walkthrough - MVC Controls

We will replace the "Hello World" text in the HTML body by the SAPUI5 control `sap/m/Text`. In the beginning, we will use the JavaScript control API to set up the UI, the control instance is then placed into the HTML body.

1. Update index.html

Edit `body` tag in `webapp/index.html`, adding `class` and `id` attributes.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>UI5 Walkthrough</title>
  <script
    id="sap-ui-bootstrap"
    src="resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-libs="sap.m"
    data-sap-ui-compat-version="edge"
    data-sap-ui-async="true"
    data-sap-ui-on-init="module:ui5/walkthrough/index"
    data-sap-ui-resource-roots='{
      "ui5.walkthrough": "./"
    }'>
  </script>
</head>
<body class="sapUiBody" id="content">
</body>
</html>
```

2. Edit index.js

Edit `webapp/index.js`, show "Hello World With Text Control" with a simple SAPUI5 `Text` control.

```js
sap.ui.define([
  "sap/m/Text"
], (Text) => {
  "use strict";

  new Text({
    text: "Hello World With Text Control"
  }).placeAt("content");
});
```

3. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see `Hello World With Text Control` in the home page.

## Walkthrough - MVC Views

Putting all our UI into the index.js file will very soon result in a messy setup, and there is quite a bit of work ahead of us. So let's do a first modularization by putting the `sap/m/Text` control into a dedicated view.

1. Create App2.view.xml

Create `webapp/view/App2.view.xml` with the following content. Inside the `View` tag, we add the declarative definition of our `Text` control.

```xml
<mvc:View
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Text text="Hello World from MVC View"/>
</mvc:View>
```

2. Create index2.js

Create `webapp/index2.js` with the following content. We create a new view with our new `App2.view.xml` file. The view name is prefixed with the namespace `ui5.walkthrough.view` in order to uniquely identify this resource.

```js
sap.ui.define([
  "sap/ui/core/mvc/XMLView"
], (XMLView) => {
  "use strict";

  XMLView.create({
    viewName: "ui5.walkthrough.view.App2"
  }).then((oView) => oView.placeAt("content"));
});
```

3. Create index2.html

Create `webapp/index2.html` by copying `webapp/index.html`, update `data-sap-ui-on-init` with the new index file `index2`.

```html
data-sap-ui-on-init="module:ui5/walkthrough/index2"
```

4. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index2.html. You should see `Hello World from MVC View` in the home page.

## Walkthrough - MVC Controllers

In this step, we replace the text with a button and show the "Hello World" message when the button is pressed. The handling of the button's press event is implemented in the `controller` of the view.

1. Create App3.view.xml

Create `webapp/view/App3.view.xml` with the following content. We add a button with text "Say Hello". The button triggers the `.onShowHello` event handler function when being pressed. We also have to set `controllerName` attribute of the view. The controllerName is a combination of the namespace of your application followed by the actual name of the controller, it's actually pointing to `App3.controller.js`.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App3"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Button
    text="Say Hello"
    press=".onShowHello"/>
</mvc:View>
```

2. Create App3.controller.js

Create `webapp/controller/App3.controller.js` with the following content. We define the app controller in its own file by extending the UI5-provided `sap/ui/core/mvc/Controller`. In the beginning, it holds only a single function called `onShowHello` that handles the button's press event by showing an alert.

```js
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
```

3. Create index3.js

Create `webapp/index3.js` with the following content. We create a new view with our new `App3.view.xml` file. The view name is prefixed with the namespace `ui5.walkthrough.view` in order to uniquely identify this resource.

```js
sap.ui.define([
  "sap/ui/core/mvc/XMLView"
], (XMLView) => {
  "use strict";

  XMLView.create({
    viewName: "ui5.walkthrough.view.App3"
  }).then((oView) => oView.placeAt("content"));
});
```

4. Create index3.html

Create `webapp/index3.html` by copying `webapp/index.html`, update `data-sap-ui-on-init` with the new index file `index3`.

```html
data-sap-ui-on-init="module:ui5/walkthrough/index3"
```

5. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index3.html. You should see `Say Hello` button in the home page. Click on it, and you should see a popup with `Hello World from Controller` message.

## Walkthrough - MVC Modules

In SAPUI5, resources are often referred to as modules. In this step, we replace the alert from the last exercise with a proper Message Toast from the sap.m library.

1. Create App4.view.xml

Create `webapp/view/App4.view.xml` with the following content. We add a button with text "Say Hello". The button triggers the `.onShowHello` event handler function when being pressed. We also have to set `controllerName` attribute of the view. The controllerName is a combination of the namespace of your application followed by the actual name of the controller, it's actually pointing to `App4.controller.js`.

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

## Walkthrough - MVC Model

We will add an input field to our app, bind its value to the model, and bind the same value to the description of the input field. The description will be directly updated as the user types.

1. Create App5.view.xml

Create `webapp/view/App5.view.xml` with the following content. We add an `sap/m/Input` control to the view. With this, the user can enter a recipient for the greetings. We bind its value to a SAPUI5 model by using the declarative binding syntax for XML views.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App5"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Button
    text="Say Hello"
    press=".onShowHello"/>
  <Input
    value="{/recipient/name}"
    description="Hello {/recipient/name}"
    valueLiveUpdate="true"
    width="60%"/>
</mvc:View>
```

2. Create App5.controller.js

Create `webapp/controller/App5.controller.js` with the following content. We add an `onInit` function to the controller and we instantiate a JSON model with a single property `recipient`, it contains one additional property for the `name`. To be able to use this model from within the XML view, we call the `setModel` function on the view and pass on our newly created model.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App5", {
    onInit() {
      // set data model on view
      const oData = {
        recipient : {
          name : "World"
        }
      };
      const oModel = new JSONModel(oData);
      this.getView().setModel(oModel);
    },
    onShowHello() {
      MessageToast.show("Hello World from MessageToast5");
    }
  });
});
```

3. Create index5.js

Create `webapp/index5.js` with the following content.

```js
sap.ui.define([
  "sap/ui/core/mvc/XMLView"
], (XMLView) => {
  "use strict";

  XMLView.create({
    viewName: "ui5.walkthrough.view.App5"
  }).then((oView) => oView.placeAt("content"));
});
```

4. Create index5.html

Create `webapp/index5.html` by copying `webapp/index.html`, update `data-sap-ui-on-init` with the new index file `index5`.

```html
data-sap-ui-on-init="module:ui5/walkthrough/index5"
```

5. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index5.html. You should see an input box at right side of "Say Hello" button with content "World". Type anything in the box, you should see the description at right is being updated accordingly.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/ddbceecd7d3d42eea9cf78a820a238fb
- https://sapui5.hana.ondemand.com/#/topic/1409791afe4747319a3b23a1e2fc7064
- https://sapui5.hana.ondemand.com/#/topic/50579ddf2c934ce789e056cfffe9efa9
- https://sapui5.hana.ondemand.com/#/topic/f665d0de4dba405f9af4294de824b03b