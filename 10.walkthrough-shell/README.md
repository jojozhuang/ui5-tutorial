# UI5 Tutorial

Copy all files from the last `8.walkthrough-pages-and-panels`.

## Walkthrough - Shell Control as Container

We will use a `shell` control as container for our app and use it as our new root element. The shell takes care of visual adaptation of the application to the device's screen size by introducing a so-called `letterbox` on desktop screens.

1. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. We use `shell` control to wrap `app` control so it will automatically display a so-called letterbox, if the screen size is larger than a certain width.

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
              headerText="{i18n>helloPanelTitle}">
              <content>
                <Button
                  text="{i18n>showHelloButtonText}"
                  press=".onShowHello"/>
                <Input
                  value="{/recipient/name}"
                  description="Hello {/recipient/name}"
                  valueLiveUpdate="true"
                  width="60%"/>
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

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see the page content is centered.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/4df1d914e52d4b1aa0805eb01522537e
