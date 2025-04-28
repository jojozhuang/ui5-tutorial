# UI5 Tutorial

Copy all files from the last `11.walkthrough-margins-and-paddings`.

## Walkthrough - Custom CSS and Theme Colors

Sometimes we need to define some more fine-granular layouts and this is when we can use the flexibility of CSS by adding custom style classes to controls and style them as we like.

1. Create style.css

Create `webapp/css/style.css` with the following content.

```css
html[dir="ltr"] .myAppDemoWT .myCustomButton.sapMBtn {
  margin-right: 0.125rem
}

html[dir="rtl"] .myAppDemoWT .myCustomButton.sapMBtn {
  margin-left: 0.125rem
}

.myAppDemoWT .myCustomText {
  display: inline-block;
  font-weight: bold;
}
```

2. Update manifest.json

Add the following `resources` section into `webapp/manifest.json`. In the `resources` section of the sap.ui5 namespace, additional resources for the app can be loaded. We load the CSS styles by defining a URI relative to the component. SAPUI5 then adds this file to the header of the HTML page as a `<link>` tag, just like in plain Web pages, and the browser loads it automatically.

```json
    "resources": {
      "css": [
        {
          "uri": "css/style.css"
        }
      ]
    }
```

3. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. The app control is configured with our custom namespace class `myAppDemoWT`. This class has `no` styling rules set and is used in the definition of the CSS rules to define CSS selectors that are only valid for this app. We add our custom CSS class to the button to precisely define the space between the button and the input field. Now we have a pixel-perfect design for the panel content.

To highlight the output text, we use a `FormattedText` control which can be styled individually, either by using custom CSS or with HTML code. We add our custom CSS class (`myCustomText`) and add a theme-dependent CSS class to set the highlight color that is defined in the theme. The actual color now depends on the selected theme which ensures that the color always fits to the theme and is semantically clear.

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
                  description="Hello {/recipient/name}"
                  valueLiveUpdate="true"
                  width="60%"/>
                <FormattedText
                  htmlText="Hello {/recipient/name}"
                  class="sapUiSmallMargin sapThemeHighlight-asColor myCustomText"/>
              </content>
            </Panel>
          </content>
        </Page>
      </pages>
    </App>
  </Shell>
</mvc:View>
```

4. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the space between the button and the input field is now smaller and the output text is bold.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/723f4b2334e344c08269159797f6f796
