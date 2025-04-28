# UI5 Tutorial

Copy all files from the last `18.walkthrough-filtering-and-sorting`.

## Walkthrough - Remote OData Service

In this step, we will access a real OData service to visualize remote data.

1. Install Proxy Server

In app root folder and execute the following command to install this package as a new development dependency in `package.json`.

```sh
npm i -D ui5-middleware-simpleproxy
```

2. Update ui5.yaml

Update `ui5.yaml` with the following content to configure our proxy. The `mountPath` property configures which URLs will be caught by the proxy. The configuration/baseUri property stores the real server address.

```yaml
server:
  customMiddleware:
  - name: ui5-middleware-simpleproxy
    afterMiddleware: compression
    mountPath: /V2
    configuration:
      baseUri: "https://services.odata.org"
```

3. Update manifest.json

Update `webapp/manifest.json` with the following content. In the `sap.app` section of the descriptor file, we add a `data source` configuration. With the `invoiceRemote` key, we specify a configuration object that allows automatic model instantiation. We specify the type of the service (OData) and the model version (2.0).

In the models section, we replace the content of the `invoice` model. This key is still used as model name when the model is automatically instantiated during the component initialization. However, the `invoiceRemote` value of the dataSource key is a reference to the data source section that we specified above. This configuration allows the component to retrieve the technical information for this model during the start-up of the app.

Our component now automatically creates an instance of `sap.ui.model.odata.v2.ODataModel` according to the settings we specified above, and makes it available as a model named invoice. When you use the invoiceRemote data source, the ODataModel fetches the data from the real Northwind OData service. The invoices we receive from the Northwind OData service have identical properties as the JSON data we used previously (except for the status property, which is not available in the Northwind OData service).

```json
{
  "sap.app": {
    ...
    "dataSources": {
      "invoiceRemote": {
        "uri": "V2/Northwind/Northwind.svc/",
        "type": "OData",
        "settings": {
          "odataVersion": "2.0"
        }
      }
    }
  },
  "sap.ui5": {
    ...
    "models": {
      ...
      "invoice": {
        "dataSource": "invoiceRemote"
      }
    },
    ...
  }
}
```

4. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see products from the OData invoices test service.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/44062441f3bd4c67a4f665ae362d1109
