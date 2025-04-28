# UI5 Tutorial

Copy all files from the last `13.walkthrough-nested-views`.

## Walkthrough - Dialogs and Fragments

In this step, we will take a closer look at another element which can be used to assemble views: the fragment.

1. Update HelloPanel.view.xml

Add a new button into `webapp/view/HelloPanel.view.xml` with the following content. We add a new button to the view to open the dialog. It simply calls an event handler function in the controller of the panel's content view.

```xml
      <Button
        id="helloDialogButton"
        text="{i18n>openDialogButtonText}"
        press=".onOpenDialog"
        class="sapUiSmallMarginEnd"/>
```

2. Create HelloDialog.fragment.xml

Create `webapp/view/HelloDialog.fragment.xml` with the following content. We add a new XML file to declaratively define our dialog in a fragment. The fragment assets are located in the core namespace, so we add an xml namespace for it inside the `FragmentDefinition` tag.

```xml
<core:FragmentDefinition
  xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <Dialog
    id="helloDialog"
    title="Hello {/recipient/name}"/>
</core:FragmentDefinition>
```

3. Update HelloPanel.controller.js

Add a new function `onOpenDialog` into `webapp/controller/HelloPanel.controller.js`. Using `async/await`, we handle the opening of the dialog asynchronously every time the event is triggered. If the dialog fragment does not exist yet, the fragment is instantiated by calling the `loadFragment` API. We then store the dialog on the controller instance. This allows us to reuse the dialog every time the event is triggered.

```js
    async onOpenDialog() {
      // create dialog lazily
      this.oDialog ??= await this.loadFragment({
        name: "ui5.walkthrough.view.HelloDialog"
      });
  
      this.oDialog.open();
    }
```

4. Update i18n.properties

Update `webapp/i18n/i18n.properties` with the following content. We add a new key `openDialogButtonText` for the dialog.

```sh
openDialogButtonText=Say Hello With Dialog
```

5. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. Click on the button "Say Hello With Dialog", we should see a dialog with title "Hello World".

## Reference

- https://sapui5.hana.ondemand.com/#/topic/4da72985139b4b83b5f1c1e0c0d2ed5a
