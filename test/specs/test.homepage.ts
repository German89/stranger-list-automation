import HomePage from "../pageobjects/homePage.ts";
import {generateRandomString, resolvePath} from "../pageobjects/helper.ts";
import { expect } from 'chai';

describe('Validate Stranger List Home page', () => {
    let description =  generateRandomString(15);

    before('Navigate to Home Page',async()=>{
        await HomePage.open('');
    });

    it('Create an item and validate its added on the list',async()=>{
        //Generate a random string to pass as a text of item description
        await HomePage.typeOnInput(HomePage.textAreaInput, description);
        //Upload an image into the image field
        let path = await resolvePath('./test/testdata/images/newImage.jpg');
        await HomePage.typeOnInput(HomePage.uploadImageNewItem, path);
        //Click the Create button
        await HomePage.clickOnButton(HomePage.createItemButton);

        //Find the item card of the created element
        let item = await HomePage.findItemWithDescription(description);

        //Validate if the item has been created
        expect(await HomePage.getTextOfItemCard(item))
            .to.equals(description,'The item with given text has not been created');

        //Validate if the image has been uploaded
       expect(await HomePage.getSourceOfImage(item)).to.contains('newImage.jpg','The image has not been uploaded');
    });

    it('Edit the first existing item in the list and validate the edition',async()=>{
        //Get the first item in the list
        let item = HomePage.getListOfItems()[0];
        //Click Edit Button of the first item in the list
        await HomePage.clickOnEditButtonOfItem(item);

        //Validate that the text has been loaded on the right text box
        expect(await HomePage.getTextOfItemCard(item))
            .to.equals(await HomePage.getValueOfElement(HomePage.textAreaInput),'The text has not been copied to the right edit box');

        //Generate a random text to replace the one on the item and type it
        let text = generateRandomString(25);
        await HomePage.typeOnInput(HomePage.textAreaInput, text);

        //Click on Update item button and validate the item has been updated
        await HomePage.clickOnButton(HomePage.updateItemButton);
        expect(await HomePage.getTextOfItemCard(HomePage.getListOfItems()[0])).to.be.equals(text,'The item has not been updated');
    });

    it("Remove the item created and validate it has been removed from the list",async()=>{
        //Find the created item, click on the Delete button and confirm deletion
        await HomePage.clickDeleteButtonOfItem(await HomePage.findItemWithDescription(description));
        await HomePage.clickConfirmDeleteItemButton();

        //Validate the item has been deleted
        expect(await HomePage.findItemWithDescription(description)).to.equals(undefined,'The item has not been deleted');
    });

    it('Check max long in description',async()=>{
        //Type 300 characters into the text area input and validate that the create button is still enabled
        await HomePage.typeOnInput(HomePage.textAreaInput, generateRandomString(300));
        expect(await HomePage.createItemButton.isEnabled()).to.equals(true,'The Create item button is not enabled with 300 characters');

        //Add one more character and validate it becomes disabled
        await HomePage.addValuedOnInput(HomePage.textAreaInput,'a');
        expect(await HomePage.createItemButton.isEnabled()).to.equals(false,'The Create item button should be disabled with 301 characters');
    });

    it('Check if exist in the list the item with text Creators Matt Duffer, Ross Duffer',async()=>{
        expect(await HomePage.findItemWithDescription('Creators: Matt Duffer, Ross Duffer')).to.not.be.undefined;
    });
});

