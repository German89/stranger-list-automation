import Page from "./page.ts";
import {browser} from "@wdio/globals";

class HomePage extends Page{
    private editButtonXpath = "//div/button[text()='Edit']";
    private deleteButtonXpath = "//div/button[text()='Delete']";

    public get uploadImageNewItem(){
        return $('#inputImage');
    }

    public get warningModalSubmit(){
        let text = "//button[text()='Yes, delete it!']"
        return $(text);
    }

    public getListOfItems(){
        return $$('.media-list li');
    }

    public get textAreaInput(){
        return $('[name="text"]')
    }

    public get createItemButton(){
        return $('.btn.pull-right.btn-success');
    }

    public get updateItemButton(){
        const path = "//button[text()='Update Item']";
        return $(path);
    }

    /**
     * Find and return item card with the corresponding description, if the item is not found return undefined
     * @param itemText description text of the item card to find
     */
    public async findItemWithDescription(itemText: string) {
       const element =  browser.$("//p[text()='"+ itemText +"']/parent::div/parent::div/parent::div");
       try{
           await element.waitForExist({timeout:1000});
       }catch (e) {
           console.log("Element still does not exist after timeout");
       }
       return await element.isExisting() ? element: undefined;
    }

    /**
     * Click on the Edit button of a given item card
     * @param item element
     */
    public async clickOnEditButtonOfItem(item: ChainablePromiseElement){
        await item.$(this.editButtonXpath).click();
    }

    /**
     * Click on the Delete button of a given item card
     * @param item element
     */
    public async clickDeleteButtonOfItem(item: ChainablePromiseElement){
        await item.$(this.deleteButtonXpath).click();
    }

    /**
     * Get and return the src attribute text of the given item card, used to validate the name of the image uploaded
     * @param item element
     */
    public async getSourceOfImage(item: ChainablePromiseElement){
        await item.waitForDisplayed();
        return await item.$('img').getAttribute('src');
    }

    /**
     * Get and return the description text of the item card
     * @param element card
     */
    public async getTextOfItemCard(element: ChainablePromiseElement){
        return this.getTextOfElement(await element.$('.story'));
    }

    /**
     * Click on the Yes, delete it! button and wait until the button and modal disappear from the screen
     */
    public async clickConfirmDeleteItemButton(){
        await this.warningModalSubmit.click();
        await this.warningModalSubmit.waitForExist({reverse:true, timeout:2000});
        await browser.pause(500);
    }
}
export default new HomePage();