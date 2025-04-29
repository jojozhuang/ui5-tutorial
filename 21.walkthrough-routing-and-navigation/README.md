# UI5 Tutorial

Copy all files from the last `20.walkthrough-mock-server`.

## Walkthrough - Routing and Navigation

In this step, we will set up mock server for local development.

1. Create mockServer.html

Create `webapp/test/mockServer.html` with the following content. We copy the `index.html` to a separate file in the `webapp/test` folder and name it `mockServer.html`. We will now use this file to run our app in test mode with mock data loaded from a JSON file. Test pages should not be placed in the application root folder but in a subfolder called `test` to clearly separate productive and test coding.

From this point on, you have two different entry pages: One for the real "connected" app (index.html) and one for local testing (mockServer.html). You can freely decide if you want to do the next steps on the real service data or on the local data within the app.

We modify the mockServer.html file and change the page title to distinguish it from the productive start page. In the bootstrap, the `data-sap-ui-resource-roots` property is also changed. The namespace now points to the folder above ("../"), because the mockServer.html file is now in a subfolder of the webapp folder. Instead of loading the app component directly, we now call a script `initMockServer.js`.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SAPUI5 UI5 Walkthrough - Mockserver Test Page</title>
  <script
    id="sap-ui-bootstrap"
    src="../resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon"
    data-sap-ui-compat-version="edge"
    data-sap-ui-async="true"
    data-sap-ui-on-init="module:ui5/walkthrough/test/initMockServer"
    data-sap-ui-resource-roots='{
      "ui5.walkthrough": "../"
    }'>
  </script>
</head>
<body class="sapUiBody" id="content">
  <div data-sap-ui-component data-name="ui5.walkthrough" data-id="container" data-settings='{"id" : "walkthrough"}'></div>
</body>
</html>
```

2. Create initMockServer.js

Create `webapp/test/initMockServer.js` with the following content. The first dependency is a file called mockserver.js that will be located in the localService folder later.

The mockserver depencency that we are about to implement is our local test server. Its init method is immediately called before we load the component. This way we can catch all requests that would go to the "real" service and process them locally by our test server when launching the app with the mockServer.html file. The component itself does not "know" that it will now run in test mode.

```js
sap.ui.define([
  "../localService/mockserver"
], (mockserver) => {
  "use strict";

  // initialize the mock server
  mockserver.init();

  // initialize the embedded component on the HTML page
  sap.ui.require(["sap/ui/core/ComponentSupport"]);
});
```

3. Create Invoices.json

Create `webapp/localService/mockdata/Invoices.json` with the following content.

```json
[
  {
    "ProductName": "Pineapple",
    "Quantity": 21,
    "ExtendedPrice": 87.2,
    "ShipperName": "Fun Inc.",
    "ShippedDate": "2015-04-01T00:00:00",
    "Status": "A"
  },
  {
    "ProductName": "Milk",
    "Quantity": 4,
    "ExtendedPrice": 10,
    "ShipperName": "ACME",
    "ShippedDate": "2015-02-18T00:00:00",
    "Status": "B"
  },
  {
    "ProductName": "Canned Beans",
    "Quantity": 3,
    "ExtendedPrice": 6.85,
    "ShipperName": "ACME",
    "ShippedDate": "2015-03-02T00:00:00",
    "Status": "B"
  },
  {
    "ProductName": "Salad",
    "Quantity": 2,
    "ExtendedPrice": 8.8,
    "ShipperName": "ACME",
    "ShippedDate": "2015-04-12T00:00:00",
    "Status": "C"
  },
  {
    "ProductName": "Bread",
    "Quantity": 1,
    "ExtendedPrice": 2.71,
    "ShipperName": "Fun Inc.",
    "ShippedDate": "2015-01-27T00:00:00",
    "Status": "A"
  }
]
```

4. Create metadata.xml

Create `webapp/localService/metadata.xml` with the following content. The metadata file contains information about the service interface and does not need to be written manually. It can be accessed directly from the "real" service by calling the service URL and adding $metadata at the end (e.g. in our case http://services.odata.org/V2/Northwind/Northwind.svc/$metadata). The mock server will read this file to simulate the real OData service, and will return the results from our local source files in the proper format so that it can be consumed by the app (either in XML or in JSON format).

For simplicity, we have removed all content from the original Northwind OData metadata document that we do not need in our scenario. We have also added the status field to the metadata since it is not available in the real Northwind service.

```xml
<edmx:Edmx Version="1.0" xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx">
  <edmx:DataServices m:DataServiceVersion="1.0" m:MaxDataServiceVersion="3.0"
    xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">
    <Schema Namespace="NorthwindModel" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
      <EntityType Name="Invoice">
        <Key>
          <PropertyRef Name="ProductName"/>
          <PropertyRef Name="Quantity"/>
          <PropertyRef Name="ShipperName"/>
        </Key>
        <Property Name="ShipperName" Type="Edm.String" Nullable="false" MaxLength="40" FixedLength="false"
          Unicode="true"/>
        <Property Name="ProductName" Type="Edm.String" Nullable="false" MaxLength="40" FixedLength="false"
          Unicode="true"/>
        <Property Name="Quantity" Type="Edm.Int16" Nullable="false"/>
        <Property Name="ExtendedPrice" Type="Edm.Decimal" Precision="19" Scale="4"/>
        <Property Name="Status" Type="Edm.String" Nullable="false" MaxLength="1" FixedLength="false"
          Unicode="true"/>
      </EntityType>
    </Schema>
    <Schema Namespace="ODataWebV2.Northwind.Model" xmlns="http://schemas.microsoft.com/ado/2008/09/edm">
      <EntityContainer Name="NorthwindEntities" m:IsDefaultEntityContainer="true" p6:LazyLoadingEnabled="true"
        xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation">
        <EntitySet Name="Invoices" EntityType="NorthwindModel.Invoice"/>
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>
```

5. Create mockserver.js

Create `webapp/localService/mockserver.js` with the following content. We load the standard SAPUI5 MockServer module as a dependency and create a helper object that defines an init method to start the server. This method is called before the component initialization in the mockServer.html file above. The init method creates a MockServer instance with the same URL as the real service calls.

The URL in the `rootUri` configuration parameter has to point to the same URL as defined in the uri property of the data source in the manifest.json descriptor file. In the manifest.json, UI5 automatically interprets a relative URL as being relative to the application namespace. In the JavaScript code, you can ensure this by using the `sap.ui.require.toUrl` method. The sap/ui/core/util/MockServer then catches every request to the real service and returns a response. Next, we set two global configuration settings that tell the server to respond automatically and introduce a delay of 500 ms to imitate a typical server response time. Otherwise, we would have to call the respond method on the MockServer manually to simulate the call.

To simulate a service, we can simply call the simulate method on the MockServer instance with the path to our newly created metadata.xml. This will read the test data from our local file system and set up the URL patterns that will mimic the real service.

Finally, we call start on oMockServer. From this point, each request to the URL pattern rootUri will be processed by the MockServer. If you switch from the index.html file to the mockServer.html file in the browser, you can now see that the test data is displayed from the local sources again, but with a short delay. The delay can be specified with the URI parameter serverDelay.

This approach is perfect for local testing, even without any network connection. This way your development does not depend on the availability of a remote server, i.e. to run your tests.

Try calling the app with the index.html file and the mockServer.html file to see the difference. If the real service connection cannot be made, for example when there is no network connection, you can always fall back to the local test page.

```js
sap.ui.define([
  "sap/ui/core/util/MockServer"
], (MockServer) => {
  "use strict";

  return {
    init() {
      // create
      const oMockServer = new MockServer({
        rootUri: sap.ui.require.toUrl("ui5/walkthrough") + "/V2/Northwind/Northwind.svc/"
      });

      const oUrlParams = new URLSearchParams(window.location.search);

      // configure mock server with a delay
      MockServer.config({
        autoRespond: true,
        autoRespondAfter: oUrlParams.get("serverDelay") || 500
      });

      // simulate
      const sPath = sap.ui.require.toUrl("ui5/walkthrough/localService");
      oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");

      // start
      oMockServer.start();
    }
  };
});
```

6. Update package.json

Add a new script into `package.json` to start the app with mock server.

```js
"start-mock": "ui5 serve -o test/mockServer.html"
```

7. Run UI5 app

Execute `npm run start-mock` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the list of invoices served by the Mock Server.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/e5200ee755f344c8aef8efcbab3308fb
- https://sapui5.hana.ondemand.com/#/topic/2366345a94f64ec1a80f9d9ce50a59ef
- https://sapui5.hana.ondemand.com/#/topic/8ef57cfd37b44f089f7e3b52d56597eb
