# UI5 Tutorial

## Bootstrap

Ask ChatGPT for `hello world of UI5 app`.

1. Project structure

```sh
webapp/
├── index.html
├── Component.js
├── manifest.json
├── view/
│   └── Main.view.xml
├── controller/
│   └── Main.controller.js
```

2. index.html

Update `webapp/index.html` with the following content.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>UI5 Hello World</title>
  <script
    id="sap-ui-bootstrap"
    src="https://sdk.openui5.org/resources/sap-ui-core.js"
    data-sap-ui-theme="sap_fiori_3"
    data-sap-ui-libs="sap.m"
    data-sap-ui-async="true"
    data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"
    data-sap-ui-resourceroots='{
      "my.app": "./"
    }'>
  </script>
</head>
<body class="sapUiBody" id="content">
  <div data-sap-ui-component data-name="my.app" data-id="container" data-settings='{"id" : "myApp"}'></div>
</body>
</html>
```

3. Component.js

Create `Component.js` under `webapp` directory.

```javascript
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("my.app.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
    }
  });
});
```

4. manifest.json

Update `manifest.json` under `webapp` directory.

```json
{
  "sap.app": {
    "id": "my.app",
    "type": "application",
    "title": "UI5 Hello World",
    "applicationVersion": {
      "version": "1.0.0"
    }
  },
  "sap.ui": {
    "technology": "UI5",
    "deviceTypes": {
      "desktop": true,
      "tablet": true,
      "phone": true
    }
  },
  "sap.ui5": {
    "rootView": {
      "viewName": "my.app.view.Main",
      "type": "XML",
      "id": "mainView"
    },
    "dependencies": {
      "minUI5Version": "1.108.0",
      "libs": {
        "sap.m": {},
        "sap.ui.core": {}
      }
    },
    "routing": {},
    "models": {}
  }
}
```

5. view/Main.view.xml

Create `Main.view.xml` under `webapp/view` directory.

```xml
<mvc:View
  xmlns:mvc="sap.ui.core.mvc"
  xmlns="sap.m"
  controllerName="my.app.controller.Main">
  <Page title="Hello UI5">
    <content>
      <Text text="Hello World!" />
    </content>
  </Page>
</mvc:View>
```

6. controller/Main.controller.js

Create `Main.controller.js` under `webapp/controller` directory.

```javascript
sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("my.app.controller.Main", {
    onInit: function () {
      // Optional: do something on init
    }
  });
});
```

7. Test

Start the app with `npm start` and open `index.html` in a browser, and you’ll see “Hello World!” inside a UI5 `sap.m.Page`.

8. Reference

- https://www.youtube.com/watch?v=C9cK2Z2JDLg
- https://sapui5.hana.ondemand.com/#/topic/851bde42e4e1410c96abbe402fa9128c