import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {


    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        return browser.url(`${path}`)
    }

    /**
     * Wait until the given button is clickable and then click on it
     * @param button element
     */
    public async clickOnButton(button: ChainablePromiseElement){
        await button.waitForClickable();
        await button.click();
    }

    /**
     * Wait until the given input is displayed and then set the text value on it (delete the current value and set the new one)
     * @param element input element
     * @param text to set
     */
    public async typeOnInput(element: ChainablePromiseElement, text: string){
        await element.waitForDisplayed();
        await element.setValue(text);
    }

    /**
     * Wait until the given input is displayed and then append the text value on it (it does NOT delete the current value)
     * @param element input element
     * @param text to append
     */
    public async addValuedOnInput(element: ChainablePromiseElement, text: string){
        await element.waitForDisplayed();
        await element.addValue(text);
    }

    /**
     * Wait until the given element is displayed, then get and return the text
     * @param element to get the text from
     */
    public async getTextOfElement(element: ChainablePromiseElement){
        await element.waitForDisplayed();
        return await element.getText();
    }

    /**
     * Wait until the given element is displayed, then get and return the value
     * @param element to get the value from
     */
    public async getValueOfElement(element: ChainablePromiseElement){
        await element.waitForDisplayed();
        return await element.getValue();
    }
}
