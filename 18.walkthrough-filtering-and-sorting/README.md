# UI5 Tutorial

Copy all files from the last `17.walkthrough-formatting`.

## Walkthrough - Filtering

In this step, we add a `search field` for our product list and define a `filter` that represents the search term. When searching, the list is automatically updated to show only the items that match the search term.

1. Update InvoiceList.view.xml

Update `webapp/view/InvoiceList.view.xml` with the following content. We add the `headerToolbar` aggregation replaces the simple title property that we used before for our list header. A toolbar control is way more flexible and can be adjusted as you like. We are now displaying the title on the left side with a `sap.m.Title` control, a `spacer`, and the `sap.m.SearchField` on the right. We also need to specify an `ID` invoiceList for the list control to be able to identify the list from the event handler function `onFilterInvoices` that we add to the search field.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.InvoiceList"
  xmlns="sap.m"
  xmlns:core="sap.ui.core"
  xmlns:mvc="sap.ui.core.mvc">
  <List
    id="invoiceList"
    class="sapUiResponsiveMargin"
    width="auto"
    items="{invoice>/Invoices}" >
    <headerToolbar>
      <Toolbar>
        <Title text="{i18n>invoiceListTitle}"/>
        <ToolbarSpacer/>
        <SearchField
          width="50%"
          search=".onFilterInvoices"/>
      </Toolbar>
    </headerToolbar>
    ...
</mvc:View>
```

2. Update InvoiceList.controller.js

Update `webapp/controller/InvoiceList.controller.js` with the following content. We load two new dependencies for the filtering. The `filter` object will hold our configuration for the filter action and the `FilterOperator` is a helper type that we need in order to specify the filter.

In the `onFilterInvoices` function we construct a filter object from the search string that the user has typed in the search field. Event handlers always receive an event argument that can be used to access the parameters that the event provides. In our case the search field defines a parameter `query` that we access by calling getParameter("query") on the oEvent parameter.

If the query is not empty, we add a new filter object to the still empty array of filters. However, if the query is empty, we filter the binding with an empty array. This makes sure that we see all list elements again. We could also add more filters to the array, if we wanted to search more than one data field. In our example, we just search in the `ProductName` path and specify a filter operator that will search for the given query string.

The list is accessed with the ID that we have specified in the view, because the control is automatically prefixed by the view ID, we need to ask the view for the control with the helper function byId. On the list control we access the binding of the aggregation items to filter it with our newly constructed filter object. This will automatically filter the list by our search string so that only the matching items are shown when the search is triggered. The filter operator `FilterOperator.Contains` is not case-sensitive.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
    onInit() {
      const oViewModel = new JSONModel({
        currency: "EUR"
      });
      this.getView().setModel(oViewModel, "view");
    },

    onFilterInvoices(oEvent) {
      // build filter array
      const aFilter = [];
      const sQuery = oEvent.getParameter("query");
      if (sQuery) {
        aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
      }

      // filter binding
      const oList = this.byId("invoiceList");
      const oBinding = oList.getBinding("items");
      oBinding.filter(aFilter);
    }
  });
});
```

3. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see a search field above the list. Type anything and click the search icon, the list should be refreshed accordingly.

## Walkthrough - Sorting and Grouping

In this step, we sort the list alphabetically instead of just showing the order from the data model. Additionally, we introduce groups and add the company that ships the products so that the data is easier to consume.

1. Update InvoiceList.view.xml

Update `webapp/view/InvoiceList.view.xml` with the following content. We add a declarative `sorter` to our binding syntax. As usual, we transform the simple binding syntax to the object notation, specify the path to the data, and now add an additional sorter property. We specify the data path by which the invoice items should be sorted, and UI5 will take care of the rest. By default, the sorting is ascending, but you could also add a property `descending` with the value true inside the sorter property to change the sorting order.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.InvoiceList"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <List
    id="invoiceList"
    class="sapUiResponsiveMargin"
    width="auto"
    items="{
      path : 'invoice>/Invoices',
      sorter : {
        path : 'ProductName' 
      }
    }" >
    ...
   </List>
</mvc:View>
```

If we run the app now we can see a list of invoices sorted by the name of the products.

2. Update InvoiceList.view.xml

Update `webapp/view/InvoiceList.view.xml` with the following content. We modify the view and add a different sorter, or better; we change the sorter and set the attribute `group` to true. We also specify the path to the `ShipperName` data field. This groups the invoice items by the shipping company.

As with the sorter, no further action is required. The list and the data binding features of SAPUI5 will do the trick to display group headers automatically and categorize the items in the groups. We could define a custom group header factory if we wanted by setting the `groupHeaderFactory` property, but the result looks already fine.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.InvoiceList"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <List
    id="invoiceList"
    class="sapUiResponsiveMargin"
    width="auto"
    items="{
      path : 'invoice>/Invoices',
      sorter : {
        path : 'ShipperName',
        group : true
      }
    }" >
    ...
   </List>
</mvc:View>
```

The list is now sorted and grouped by the shipping company.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/5295470d7eee46c1898ee46c1b9ad763
- https://sapui5.hana.ondemand.com/#/topic/c4b2a32bb72f483faa173e890e48d812
