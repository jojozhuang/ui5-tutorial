# UI5 Tutorial

## Walkthrough - MVC Controls

Copy all files from `4.walkthrough-bootstrap`.

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

Create `webapp/index2.js` with the following content. We create a new with our new `App2.view.xml` file. The view name is prefixed with the namespace `ui5.walkthrough.view` in order to uniquely identify this resource.

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

Create `webapp/index3.js` with the following content. We create a new with our new `App3.view.xml` file. The view name is prefixed with the namespace `ui5.walkthrough.view` in order to uniquely identify this resource.

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

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see `Say Hello` button in the home page. Click on it, and you should see a popup with `Hello World from Controller` message.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/ddbceecd7d3d42eea9cf78a820a238fb
- https://sapui5.hana.ondemand.com/#/topic/1409791afe4747319a3b23a1e2fc7064
- https://sapui5.hana.ondemand.com/#/topic/50579ddf2c934ce789e056cfffe9efa9