# UI5 Tutorial

Copy all files from the last `8.walkthrough-descriptor`.

## Walkthrough - Pages and Panels

We will use two controls from the `sap.m` library to add a bit more "bling" to our UI. You will also learn about control aggregations in this step.

1. Update App.view.xml

Update `webapp/view/App.view.xml` with the following content. We put both the input field and the button inside a containing control called `sap/m/Page`. The page provides an aggregation to `0..N` other controls called content. It also displays the title attribute in a header section on top of the content. The page itself is placed into the pages aggregation of another control called `sap/m/App` which does the following important things for us:

- It writes a bunch of properties into the header of the index.html that are necessary for proper display on mobile devices.
- It offers functionality to navigate between pages with animations. We will use this soon.

In order to make the fullscreen height of the view work properly, we add the `displayBlock` attribute with the value true to the view. The actual content is wrapped inside a Panel control, in order to group related content.

```xml
<mvc:View
  controllerName="ui5.walkthrough.controller.App"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc"
  displayBlock="true">
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
</mvc:View>
```

2. Update i18n.properties

Update `webapp/i18n/i18n.properties` with the following content. Add `homePageTitle` and `helloPanelTitle` for page and panel.

```sh
# App Descriptor
appTitle=Hello World
appDescription=A simple walkthrough app that explains the most important concepts of SAPUI5

# Hello Panel
showHelloButtonText=Say Hello
helloMsg=Hello {0}
homePageTitle=Walkthrough
helloPanelTitle=Hello World
```

3. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see `Walkthrough` and `Hello World` above the line of "Say Hello" button.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/3b9d9f84930d43df90ad0789d99bd4a3
