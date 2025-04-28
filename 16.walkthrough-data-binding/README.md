# UI5 Tutorial

Copy all files from the last `15.walkthrough-icon`.

## Walkthrough - Aggregation Binding

In this step, we will explore data binding by adding some invoice data in JSON format that we display in a list below the panel.

1. Create Invoices.json

Create `webapp/Invoices.json` with the following content. The `Invoices.json` file simply contains five invoices in a JSON format that we can use to bind controls against them in the app.

```json
{
  "Invoices": [
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
}
```

2. Update manifest.json

Update `webapp/manifest.json` with the following content. We add a new model `invoice` to the `sap.ui5` section of the descriptor under `models` section. This time we want a JSONModel, so we set the type to `sap.ui.model.json.JSONModel`. The uri key is the path to our data relative to the component. With this little configuration our component will automatically instantiate a new JSONModel which loads the invoice data from the Invoices.json file. Finally, the instantiated JSONModel is put onto the component as a named model invoice. **The named model is then visible throughout our app.**

```json
  ...
  "sap.ui5": {
    ...
    "models": {
      "i18n": {
        ...
      },
      "invoice": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "Invoices.json"
      }
    },
  }
```

3. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. In the app view we add a second view to display our invoices `InvoiceList` below the panel.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc"
  displayBlock="true">
  <Shell>
    <App class="myAppDemoWT">
      <pages>
        <Page title="{i18n>homePageTitle}">
          <content>
            <mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel"/>
            <mvc:XMLView viewName="ui5.walkthrough.view.InvoiceList"/>
          </content>
        </Page>
      </pages>
    </App>
  </Shell>
</mvc:View>
```

4. Create InvoiceList.view.xml

Create `webapp/view/InvoiceList.view.xml` with the following content. The new view is displaying a `List` control with a custom header text. The item aggregation of the list is bound to the root path `Invoices` of the JSON data. And since we defined a named model, we have to prefix each binding definition with the identifier invoice.

In the `items` aggregation, we define the template for the list that will be automatically repeated for each invoice of our test data. More precisely, we use an `sap/m/ObjectListItem` to create a control for each aggregated child of the items aggregation. The `title` property of the list item is bound to properties of a single invoice. This is achieved by defining a relative path (without `/` in the beginning). This works because we have bound the items aggregation via items={invoice>/Invoices} to the invoices.

```xml
<mvc:View
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <List
    headerText="{i18n>invoiceListTitle}"
    class="sapUiResponsiveMargin"
    width="auto"
    items="{invoice>/Invoices}" >
    <items>
      <ObjectListItem
        title="{invoice>Quantity} x {invoice>ProductName}"/>
    </items>
  </List>
</mvc:View>
```

5. Update i18n.properties

Update `webapp/i18n/i18n.properties` by adding a new key `invoiceListTitle`.

```sh
# Invoice List
invoiceListTitle=Invoices
```

6. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see a list of invoices below the panel.

## Walkthrough - Data Types

In this step, we will use the SAPUI5 data types to format the price properly, with a locale-dependent decimal separator and two digits after the separator.

1. Update InvoiceList.view.xml

Update `webapp/view/InvoiceList.view.xml` with the following content. We add a `price` to our invoices list in the view by adding the `number` and `numberUnit` attributes to the `ObjectListItem` control. To apply the currency data type, we use the require attribute with the namespace URI `sap.ui.core`, for which the core prefix is already defined in our XML view. This allows us to write the attribute as core:require. We then add the currency data type module to the list of required modules and assign it the alias Currency, making it available for use within the view. Finally, we set the type attribute of the binding syntax to the alias `Currency`.

We are using a special binding syntax for the number property of the ObjectListItem. This binding syntax makes use of so-called "Calculated Fields", which allows the binding of multiple properties from different models to a single property of a control. The properties bound from different models are called "parts". In the example, the property of the control is number and the bound properties ("parts") retrieved from two different models are `invoice>ExtendedPrice` and `view>/currency`.

We want to display the price in Euro, and typically the currency is part of our data model on the back end. In our case this is not the case, so we need to define it directly in the app. We therefore add a controller for the invoice list, and use the currency property as the second part of our binding syntax. The Currency type will handle the formatting of the price for us, based on the currency code. In our case, the price is displayed with 2 decimals.

Additionally, we set the formatting option showMeasure to false. This hides the currency code in the property number, because it is passed on to the ObjectListItem control as a separate property numberUnit.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.InvoiceList"
  xmlns="sap.m"
  xmlns:core="sap.ui.core"
  xmlns:mvc="sap.ui.core.mvc">
  <List
    headerText="{i18n>invoiceListTitle}"
    class="sapUiResponsiveMargin"
    width="auto"
    items="{invoice>/Invoices}">
    <items>
      <ObjectListItem
        core:require="{
          Currency: 'sap/ui/model/type/Currency'
        }"
        title="{invoice>Quantity} x {invoice>ProductName}"
        number="{
          parts: [
            'invoice>ExtendedPrice',
            'view>/currency'
          ],
          type: 'Currency',
          formatOptions: {
            showMeasure: false
          }
        }"
        numberUnit="{view>/currency}"/>
    </items>
  </List>
</mvc:View>
```

2. Create InvoiceList.controller.js

Create `webapp/controller/InvoiceList.controller.js` with the following content. To be able to access the currency code that is not part of our data model, we define a view model in the controller of the invoice list. It is a simple JSON model with just one key currency and the value EUR. This can be bound to the formatter of the number field.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
    onInit() {
      const oViewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView().setModel(oViewModel, "view");
    }
  });
});
```

3. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the list of invoices with prices and number units.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/bf71375454654b44af01379a3c3a6273
- https://sapui5.hana.ondemand.com/#/topic/dfe04650afc046e0802abb1a1a90d2d9
- https://sapui5.hana.ondemand.com/#/topic/c98d57347ba444c6945f596584d2db45
