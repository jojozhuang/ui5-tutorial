# UI5 Tutorial

Copy all files from the last `16.walkthrough-data-binding`.

## Walkthrough - Custom Formatters

In this step, we will add a localized status with a custom formatter, because the status in our data model is in a rather technical format.

1. Create formatter.js

Create `webapp/model/formatter.js` with the following content. We do not extend from any base object but just return a JavaScript object with our formatter functions inside the `sap.ui.define` call.

The `statusText` function gets the technical status from the data model as input parameter and returns the correct human-readable text from the `resourceBundle` file.

```js
sap.ui.define([], () => {
  "use strict";

  return {
    statusText(sStatus) {
      const oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
      switch (sStatus) {
        case "A":
          return oResourceBundle.getText("invoiceStatusA");
        case "B":
          return oResourceBundle.getText("invoiceStatusB");
        case "C":
          return oResourceBundle.getText("invoiceStatusC");
        default:
          return sStatus;
      }
    }
  };
});
```

2. Update InvoiceList.view.xml

Update `webapp/view/InvoiceList.view.xml` with the following content. To load our formatter functions, we use the `require` attribute with the `sap.ui.core` namespace URI, for which the core prefix is already defined in our XML view. This allows us to write the attribute as `core:require`. We then add our custom formatter module to the list of required modules and assign it the Formatter alias, making it available for use within the view.

We add a status using the `firstStatus` aggregation to our ObjectListItem that will display the status of our invoice. The custom formatter function is specified with the reserved formatter property of the binding syntax. There, we use our Formatter alias that holds our formatter functions in order to access the desired function via Formatter.statusText. When called, we want the this context to be set to the current view controller's context. To achieve this, we use `.bind($controller)`.

```xml
<mvc:View>
  <List>
    <items>
      <ObjectListItem
        ...
        numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }">
        <firstStatus>
          <ObjectStatus
            core:require="{
              Formatter: 'ui5/walkthrough/model/formatter'
            }"
            text="{
              path: 'invoice>Status',
              formatter: 'Formatter.statusText.bind($controller)'
            }"/>
        </firstStatus>
      </ObjectListItem>
    </items>
  </List>
</mvc:View>
```

3. Update i18n.properties

Update `webapp/i18n/i18n.properties` with the following content. We add three new entries to the resource bundle that reflect our translated status texts `invoiceStatusA`, `invoiceStatusB` and `invoiceStatusC`. These texts are now displayed below the number attribute of the ObjectListItem dependent on the status of the invoice.

```sh
# Invoice List
invoiceListTitle=Invoices
invoiceStatusA=New
invoiceStatusB=In Progress
invoiceStatusC=Done
```

4. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the list of invoices with prices and number units. A status is now displayed with a custom formatter(New, In Progress and Done).

## Reference

- https://sapui5.hana.ondemand.com/#/topic/0f8626ed7b7542ffaa44601828db20de
