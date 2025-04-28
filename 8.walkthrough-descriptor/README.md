# UI5 Tutorial

Copy all files from the last `7.walkthrough-component`.

## Walkthrough - Descriptor for Applications

All application-specific configuration settings will now further be put in a separate descriptor file called `manifest.json`. This clearly separates the application coding from the configuration settings and makes our app even more flexible.

Our project will look like below structure.

```sh
webapp/
├── index.html
├── Component.js
├── manifest.json
├── view/
│   └── App.view.xml
├── controller/
│   └── App.controller.js
├── i18n/
│   └── i18n.properties
```

1. Update manifest.js

Create `webapp/manifest.json` with the following content. The content of the manifest.json file is a configuration object in JSON format that contains all global application settings and parameters. The manifest file is called the descriptor for applications, components, and libraries and is also referred to as `descriptor` or "app descriptor" when used for applications. It is stored in the webapp folder and read by SAPUI5 to instantiate the component. There are three important sections defined by namespaces in the manifest.json file:

- sap.app
- sap.ui
- sap.ui5

```json
{
  "_version": "1.65.0",
  "sap.app": {
    "id": "ui5.walkthrough",
    "i18n": "i18n/i18n.properties",
    "title": "{{appTitle}}",
    "description": "{{appDescription}}",
    "type": "application",
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
    "dependencies": {
      "minUI5Version": "1.135.0",
      "libs": {
        "sap.ui.core": {},
        "sap.m": {}
      }
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "ui5.walkthrough.i18n.i18n",
          "supportedLocales": [""],
          "fallbackLocale": ""
        }
      }
    },
    "rootView": {
      "viewName": "ui5.walkthrough.view.App",
      "type": "XML",
      "id": "app"
    }
  }
}
```

2. Update index.html

Update `webapp/index.html` with the following content. We declare our component in the body of our `index.html`. In the bootstrapping script of our index.html, we enable the `ComponentSupport` module. Then, we declare our component in the body via a `div` tag. This will instantiate the component when the `onInit` event is executed. 

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
    data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
    data-sap-ui-resource-roots='{
      "ui5.walkthrough": "./"
    }'>
  </script>
</head>
<body class="sapUiBody" id="content">
  <div data-sap-ui-component data-name="ui5.walkthrough" data-id="container" data-settings='{"id" : "walkthrough"}'></div>
</body>
</html>
```

3. Delete index.js

We can delete `index.js`, because the descriptor now takes care of everything.

4. Update i18n.properties

Update `webapp/i18n/i18n.properties` with the following content. In the resource bundle we simply add the texts `appTitle` and `appDescription` for the app. They are used in `manifest.js`.

```sh
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of SAPUI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
```

5. Update Component.js

Update `webapp/Component.js` with the following content. In the component's metadata section, we now replace the rootView property with the property key `manifest` and the value `json`. This defines a reference to the descriptor that will be loaded and parsed automatically when the component is instantiated. We can now completely remove the lines of code containing the model instantiation for our resource bundle. It is done automatically by SAPUI5 with the help of the configuration entries in the descriptor. We can also remove the dependency to `sap/ui/model/resource/ResourceModel` and the corresponding formal parameter `ResourceModel` because we will not use this inside our anonymous callback function.

```js
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], (UIComponent, JSONModel) => {
  "use strict";

  return UIComponent.extend("ui5.walkthrough.Component", {
    metadata : {
      "interfaces": ["sap.ui.core.IAsyncContentCreation"],
      "manifest": "json"
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
    }
  });
});
```

6. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see an input box at right side of "Say Hello" button with content "World".

## Reference

- https://sapui5.hana.ondemand.com/#/topic/8f93bf2b2b13402e9f035128ce8b495f
