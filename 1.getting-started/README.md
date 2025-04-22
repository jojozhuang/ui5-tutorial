# UI5 Tutorial

## Getting Started

1. Initilize node app.

```sh
npm init --yes
```

File `package.json` will be created.

```json
{
  "name": "getting-started",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

2. Initialize ui5 app

Create `webapp` directory.

```sh
mkdir webapp
```

Create `manifest.json` manually.

```sh
cd webapp
touch manifest.json
```

With the following content.

```json
{
  "sap.app": {
    "id": "my.app.id",
    "type": "application",
    "i18n": "i18n/i18n.properties",
    "applicationVersion": {
      "version": "1.0.0"
    },
    "title": "{{appTitle}}"
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
      "viewName": "my.app.id.view.Main",
      "type": "XML",
      "id": "main"
    },
    "dependencies": {
      "minUI5Version": "1.108.0",
      "libs": {
        "sap.m": {},
        "sap.ui.core": {}
      }
    },
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "my.app.id.i18n.i18n"
        }
      }
    }
  }
}
```

Create UI5 configuration file.

```sh
ui5 init
```

File `ui5.yaml` will be created.

```yaml
specVersion: "4.0"
metadata:
  name: getting-started
type: application
```

Use `SAP UI5`.

```sh
ui5 use sapui5@latest

Updated configuration written to ui5.yaml
This project is now using SAPUI5 version 1.135.0
```

`ui5.yaml` will be updated with `framework` configuration.

```yaml
specVersion: "4.0"
metadata:
  name: getting-started
type: application
framework:
  name: SAPUI5
  version: "1.135.0"
```

You can also choose to use `Open UI5` instead of `SAP UI5`.

```sh
ui5 use openui5@latest
```

3. Create index.html

Create `index.html` under `webapp` directory with the following content.

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

4. Run UI5 app

```sh
ui5 serve

Server started
URL: http://localhost:8080
```

Access http://localhost:8080 in browser, you should all files under `webapp` directory. Access http://localhost:8081/index.html and you should see the content of `index.html`.

5. Reference
- https://www.youtube.com/watch?v=C9cK2Z2JDLg
- https://sapui5.hana.ondemand.com/#/topic/851bde42e4e1410c96abbe402fa9128c