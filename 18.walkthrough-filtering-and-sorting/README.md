# UI5 Tutorial

Copy all files from the last `18.walkthrough-filtering-and-sorting`.

## Walkthrough - Filtering and Sorting

In this step, we will add an icon to greet our users when the dialog is opened.

1. Update HelloPanel.view.xml

Add a new button into `webapp/view/HelloPanel.view.xml` with the following content. Add `icon="sap-icon://world"` to the button with id `helloDialogButton`.

```xml
      <Button
        id="helloDialogButton"
        icon="sap-icon://world"
        text="{i18n>openDialogButtonText}"
        press=".onOpenDialog"
        class="sapUiSmallMarginEnd"/>
```

2. Update HelloDialog.fragment.xml

Update `webapp/view/HelloDialog.fragment.xml` with the following content. In the dialog fragment, we add an `icon` control to the content aggregation of the dialog. Luckily, the icon font also comes with a "Hello World" icon that is perfect for us here. We also define the size of the icon and set a medium margin on it.

```xml
<core:FragmentDefinition
  xmlns="sap.m"
  xmlns:core="sap.ui.core">
  <Dialog
    id="helloDialog"
    title ="Hello {/recipient/name}">
    <content>
      <core:Icon
        src="sap-icon://hello-world"
        size="8rem"
        class="sapUiMediumMargin"/>
   </content>
    <beginButton>
      <Button
        text="{i18n>dialogCloseButtonText}"
        press=".onCloseDialog"/>
    </beginButton>
  </Dialog>
</core:FragmentDefinition>
```

3. Run UI5 app

Execute `ui5 serve` to start the app and open a new browser window to access http://localhost:8080/index.html. You should see an icon at left side of button "Say Hello With Dialog". Click on it, we should see an icon in the dialog box.

## Reference

- https://sapui5.hana.ondemand.com/#/topic/5295470d7eee46c1898ee46c1b9ad763
- https://sapui5.hana.ondemand.com/#/topic/c4b2a32bb72f483faa173e890e48d812
