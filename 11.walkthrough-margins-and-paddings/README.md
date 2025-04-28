# UI5 Tutorial

Copy all files from the last `10.walkthrough-shell`.

## Walkthrough - Margins and Paddings

Instead of manually adding CSS to the controls, we will use the standard classes provided by SAPUI5. These classes take care of consistent sizing steps, left-to-right support, and responsiveness.

1. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. To layout the panel, we add the CSS class `sapUiResponsiveMargin` that will add some space around the panel. We have to set the width of the panel to `auto` since the margin would otherwise be added to the default width of 100% and exceed the page size.

If you decrease the screen size, then you can actually see that the margin also decreases. As the name suggests, the margin is responsive and adapts to the screen size of the device. Tablets will get a smaller margin and phones in portrait mode will not get a margin to save space on these small screens.

Margins can be added to all kinds of controls and are available in many different options. We can even add space between the button and the input field by adding class `sapUiSmallMarginEnd` to the button.

To format the output text individually, we remove the description from the input field and add a new `Text` control with the same value. Here we also use a small margin to align it with the other content. Similarly, we could add the standard padding classes to layout the inner parts of container controls such as our panel, but as it already brings a padding by default, this is not needed here.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc"
  displayBlock="true">
  <Shell>
    <App>
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
                  class="sapUiSmallMarginEnd"/>
                <Input
                  value="{/recipient/name}"
                  description="Hello {/recipient/name}"
                  valueLiveUpdate="true"
                  width="60%"/>
                <Text
                  text="Hello {/recipient/name}"
                  class="sapUiSmallMargin"/>
              </content>
            </Panel>
          </content>
        </Page>
      </pages>
    </App>
  </Shell>
</mvc:View>
```

2. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the layout of the panel and its content now has margins and padding.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/17b87fbafb5a4474982760d2a3a73e69
