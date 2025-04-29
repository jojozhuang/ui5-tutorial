# UI5 Tutorial

Copy all files from the last `20.walkthrough-mock-server`.

## Walkthrough - Routing and Navigation

In this step, we will split the content and put it on separate pages. We will have two pages. The first is the invoice list page and the second is the invoice detail page. We will add navigation between these two pages.

1. Update manifest.json

Update `webapp/manifest.json` with the following content. We add a new `routing` section to the `sap.ui5` part of the descriptor. There are three subsections that define the routing and navigation structure of the app:

- config: This section contains the global router configuration and default values that apply for all routes and targets. We define the router class that we want to use and where our views are located in the app. To load and display views automatically, we also specify which control is used to display the pages and what aggregation should be filled when a new page is displayed.

- routes: Each route defines a name, a pattern, and one or more targets to navigate to when the route has been hit. The pattern is basically the URL part that matches to the route, we define two routes for our app. The first one is a default route that will show the overview page with the content from the previous steps, and the second is the detail route with the URL pattern detail that will show a new page.

- targets: A target defines a view, or even another component, that is displayed; it is associated with one or more routes, and it can also be displayed manually from within the app. Whenever a target is displayed, the corresponding view is loaded and shown in the app. In our app we simply define two targets with a view name that corresponds to the target name.

```json
{
  ...
  "sap.ui5": {
    ...
    "routing": {
      "config": {
        "routerClass": "sap.m.routing.Router",
        "type": "View",
        "viewType": "XML",
        "path": "ui5.walkthrough.view",
        "controlId": "app",
        "controlAggregation": "pages"
      },
      "routes": [
        {
          "pattern": "",
          "name": "overview",
          "target": "overview"
        },
        {
          "pattern": "detail",
          "name": "detail",
          "target": "detail"
        }
      ],
      "targets": {
        "overview": {
          "id": "overview",
          "name": "Overview"
        },
        "detail": {
          "id": "detail",
          "name": "Detail"
        }
      }
    }
  }
}
```

2. Update Component.js

Update `webapp/Component.js` with the following content. In the component `init` method, we now add a call to initialize the `router`. We do not need to instantiate the router manually, it is automatically instantiated based on our AppDescriptor configuration and assigned to the component.

Initializing the router will evaluate the current URL and load the corresponding view automatically. This is done with the help of the routes and targets that have been configured in the manifest.json. If a route has been hit, the view of its corresponding target is loaded and displayed.

```js
sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], (UIComponent, JSONModel) => {
  "use strict";

  return UIComponent.extend("ui5.walkthrough.Component", {
   ...

    init() {
      ...

      // create the views based on the url/hash
      this.getRouter().initialize();
    }
  });
});
```

3. Create Overview.view.xml

Create `webapp/view/Overview.view.xml` with the following content. We move the content of `Shell` from `App.view.xml` to a new `Overview` view. For simplicity, we do not change the controller as it only contains our helper method to open the dialog, that means we reuse the controller `ui5.walkthrough.controller.App` for two different views (for the new overview and for the app view). However, two instances of that controller are instantiated at runtime. In general, one instance of a controller is instantiated for each view that references the controller.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc"
  displayBlock="true">
  <Page title="{i18n>homePageTitle}">
    <content>
      <mvc:XMLView viewName="ui5.walkthrough.view.HelloPanel" />
      <mvc:XMLView viewName="ui5.walkthrough.view.InvoiceList" />
    </content>
  </Page>
</mvc:View>
```

4. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. Our App view is now only containing the empty app tag. The router will automatically add the view that corresponds to the current URL into the app control. The router identifies the app control with the ID that corresponds to the property `controlId`: `app` in the AppDescriptor.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc"
  displayBlock="true">
  <Shell>
    <App class="myAppDemoWT" id="app"/>
  </Shell>
</mvc:View>
```

5. Create Detail.view.xml

Create `webapp/view/Detail.view.xml` with the following content. We add a second view for the detail view. It only contains a page and an `ObjectHeader` control that displays the static text Invoice for now.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.Detail"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Page
    title="{i18n>detailPageTitle}"
    showNavButton="true"
    navButtonPress=".onNavBack">
    <ObjectHeader intro="{invoice>ShipperName}" title="{invoice>ProductName}"/>
  </Page>
</mvc:View>
```

5. Update i18n.properties

Update `webapp/i18n/i18n.properties` with the following content. We add a new string to the resource bundle for the detail page title.

```sh
# Detail Page
detailPageTitle=Walkthrough - Details
```

6. Update InvoiceList.view.xml

Update `webapp/view/InvoiceList.view.xml` with the following content. In the invoice list view we add a `press` event to the list item and set the item `type` to `Navigation` so that the item can actually be clicked.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.InvoiceList"
  xmlns="sap.m"
  xmlns:core="sap.ui.core"
  xmlns:mvc="sap.ui.core.mvc">
  <List>
    ...
    <items>
      <ObjectListItem
        ...
        type="Navigation"
        press=".onPress">
        ...
      </ObjectListItem>
    </items>
  </List>
</mvc:View>
```

7. Update InvoiceList.controller.js

Update `webapp/controller/InvoiceList.controller.js` with the following content. We add the event handler function `onPress` to the controller of our invoices list. We access the router instance for our app by calling the helper method `getOwnerComponent().getRouter()`. On the router we call the `navTo` method to navigate to the detail route that we specified in the routing configuration.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
    ...

    onPress(oEvent) {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("detail");
    }
  });
});
```

8. Run UI5 app

Execute `npm run start-mock` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the detail page when you click an item in the list of invoices.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/e5200ee755f344c8aef8efcbab3308fb
- https://sapui5.hana.ondemand.com/#/topic/2366345a94f64ec1a80f9d9ce50a59ef
- https://sapui5.hana.ondemand.com/#/topic/8ef57cfd37b44f089f7e3b52d56597eb
