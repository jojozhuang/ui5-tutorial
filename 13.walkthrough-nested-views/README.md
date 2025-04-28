# UI5 Tutorial

Copy all files from the last `12.walkthrough-custom-css`.

## Walkthrough - Nested Views

Our panel content is getting more and more complex and now it is time to move the panel content to a separate view. With that approach, the application structure is much easier to understand, and the individual parts of the app can be reused.

1. Create HelloPanel.view.xml

Create `webapp/view/HelloPanel.view.xml` with the following content. We move `Panel` tag from `App.view.xml` to this view.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.HelloPanel"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Panel
    headerText="{i18n>helloPanelTitle}"
    class="sapUiResponsiveMargin"
    width="auto">
    <content>
      <Button
        text="{i18n>showHelloButtonText}"
        press=".onShowHello"
        class="myCustomButton"/>
      <Input
        value="{/recipient/name}"
        valueLiveUpdate="true"
        width="60%"/>
      <FormattedText
        htmlText="Hello {/recipient/name}"
        class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/>
    </content>
  </Panel>
</mvc:View>
```

2. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. Use `HelloPanel` view to replace the `Panel` tag.

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
          </content>
        </Page>
      </pages>
    </App>
  </Shell>
</mvc:View>
```

3. Create HelloPanel.controller.js

Create `webapp/controller/HelloPanel.controller.js` with the following content. We move `onShowHello` function from `App.controller.js` to this controller.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], (Controller, MessageToast) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
    onShowHello() {
      // read msg from i18n model
      const oBundle = this.getView().getModel("i18n").getResourceBundle();
      const sRecipient = this.getView().getModel().getProperty("/recipient/name");
      const sMsg = oBundle.getText("helloMsg", [sRecipient]);

      // show message
      MessageToast.show(sMsg);
    }
  });
});
```

4. Update App.controller.js

Update `webapp/controller/App.controller.js` with the following content. We remove `onShowHello` function and `MessageToast`.

```js
sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.App", {
  });
});
```

5. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the same the content as before.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/df8c9c3d79b54c928855162bafcd88ee
