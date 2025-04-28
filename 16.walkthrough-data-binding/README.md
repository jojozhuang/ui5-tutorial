# UI5 Tutorial

Copy all files from the last `15.walkthrough-icon`.

## Walkthrough - Data Binding

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

- https://sapui5.hana.ondemand.com/#/topic/bf71375454654b44af01379a3c3a6273
- https://sapui5.hana.ondemand.com/#/topic/dfe04650afc046e0802abb1a1a90d2d9
- https://sapui5.hana.ondemand.com/#/topic/c98d57347ba444c6945f596584d2db45
