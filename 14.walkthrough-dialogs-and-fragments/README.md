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

Create `webapp/view/HelloDialog.fragment.xml` with the following content. We add a new XML file to declaratively define our dialog in a fragment. The fragment assets are located in the core namespace, so we add an xml namespace for it inside the `FragmentDefinition` tag. In the fragment definition, we add a button to the `beginButton` aggregation of the dialog. The press handler refers to an event handler called `.onCloseDialog`.

```xml
<core:FragmentDefinition
  xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <Dialog
    id="helloDialog"
    title ="Hello {/recipient/name}">
    <beginButton>
      <Button
        text="{i18n>dialogCloseButtonText}"
        press=".onCloseDialog"/>
    </beginButton>
  </Dialog>
</core:FragmentDefinition>
```

3. Update HelloPanel.controller.js

Add a new function `onOpenDialog` into `webapp/controller/HelloPanel.controller.js`. Using `async/await`, we handle the opening of the dialog asynchronously every time the event is triggered. If the dialog fragment does not exist yet, the fragment is instantiated by calling the `loadFragment` API. We then store the dialog on the controller instance. This allows us to reuse the dialog every time the event is triggered.

Add another function `onCloseDialog` to close the dialog by using the byId function to get the dialog instance and the `close` function to close the dialog.

```js
    async onOpenDialog() {
      // create dialog lazily
      this.oDialog ??= await this.loadFragment({
        name: "ui5.walkthrough.view.HelloDialog"
      });
  
      this.oDialog.open();
    },

    onCloseDialog() {
      // note: We don't need to chain to the Dialog promise, since this event handler
      // is only called from within the loaded dialog itself.
      this.byId("helloDialog").close();
    }
```

4. Update i18n.properties

Update `webapp/i18n/i18n.properties` with the following content. We add a new key `openDialogButtonText` and `dialogCloseButtonText` for the dialog.

```sh
openDialogButtonText=Say Hello With Dialog
dialogCloseButtonText=Ok
```

5. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. Click on the button "Say Hello With Dialog", we should see a dialog with title "Hello World". Click on the "Ok" button, dialog should be closed.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/4da72985139b4b83b5f1c1e0c0d2ed5a
- https://sapui5.hana.ondemand.com/#/topic/354f98ed2b514ba9960556333428d35e
