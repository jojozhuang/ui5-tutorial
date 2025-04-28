# UI5 Tutorial

## Walkthrough - Helloworld

1. Initilize node app.

Create file `package.json` in the root directory(`ui5-tutorial/3.walkthrough`).

```json
{
  "name": "ui5.walkthrough",
  "version": "1.0.0",
  "description": "The UI5 walkthrough application",
  "scripts": {
      "start": "ui5 serve -o index.html"
  }
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
  "_version": "1.65.0",
  "sap.app": {
    "id": "ui5.walkthrough"
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
  name: ui5.walkthrough
type: application
```

3. Create index.html

Create `index.html` under `webapp` directory with the following content.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>UI5 Walkthrough</title>
</head>
<body>
  <div>Hello World</div>
</body>
</html>
```

4. Run UI5 app

Execute `npm start` to start the web server and open a new browser window to access http://localhost:8080/index.html. You should see `Hello World` in the page.

5. Reference

- https://sapui5.hana.ondemand.com/#/topic/2680aa9b16c14a00b01261d04babbb39