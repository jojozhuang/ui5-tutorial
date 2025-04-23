# UI5 Tutorial

## Walkthrough - Bootstrap

1. Use `Open UI5`.

```sh
ui5 use openui5@latest

Updated configuration written to ui5.yaml
This project is now using OpenUI5 version 1.135.0
```

`ui5.yaml` will be updated with `framework` configuration.

```yaml
specVersion: "4.0"
metadata:
  name: ui5.walkthrough
type: application
framework:
  name: OpenUI5
  version: "1.135.0"
```

2. Add UI5 libraries.

Add `libraries` to UI5 configuraiton file.

```sh
ui5 add sap.ui.core sap.m themelib_sap_horizon

Updated configuration written to ui5.yaml
Added framework libraries sap.ui.core sap.m themelib_sap_horizon as dependencies
```

`ui5.yaml` will be updated with `libraries` configuration.

```yaml
specVersion: "4.0"
metadata:
  name: ui5.walkthrough
type: application
framework:
  name: OpenUI5
  version: "1.135.0"
  libraries:
    - name: sap.m
    - name: sap.ui.core
    - name: themelib_sap_horizon
```

3. Update index.html

Update `webapp/index.html` with the following content, adding `<script>` tag.

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
<body>
  <div>Hello World</div>
</body>
</html>
```

4. Create index.js

Create `webapp/index.js` with the following content.

```js
sap.ui.define([], () => {
  "use strict";
  alert("UI5 is ready");
});
```

5. Run UI5 app

Execute `ui5 serve` to start the app. We will see UI5 installs the themes and libraries we have configured.

```sh
ui5 serve
info graph:helpers:ui5Framework Using OpenUI5 version: 1.135.0
info ui5Framework:npm:Installer Installing missing package @openui5/themelib_sap_horizon...
info ui5Framework:npm:Installer Installing missing package @openui5/sap.ui.core...
info ui5Framework:npm:Installer Installing missing package @openui5/sap.m...
info ui5Framework:npm:Installer Installing missing package @openui5/sap.ui.layout...
info ui5Framework:npm:Installer Installing missing package @openui5/sap.ui.unified...
Server started
URL: http://localhost:8080
```

Open a new browser window to access http://localhost:8080/index.html. You should see `Hello World` in the home page and a popup with message `UI5 is ready`.

6. Reference

- https://sapui5.hana.ondemand.com/#/topic/fe12df2e338e43598977d09f3d191b7b