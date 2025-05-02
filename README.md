Stranger List Automation
----------------------------------------------------
The main goal of the project is to validate the Strange List page located at http://immense-hollows-74271.herokuapp.com/ running automated tests using Webdriverio / Mocha / Chai and Typescript.

Steps to run the proyect locally on multiples browsers / platforms. 
---------------------------------------------------------
1 - Download the Node.js installer from Node.js official site. https://nodejs.org/en latest version.

2 - Clone the project to your local machine using "git clone https://github.com/German89/stranger-list-automation.git" via https

3 - Run "npm install" command on the source root folder to install all the dependencies

4 - To run automated tests run the following command on the source root folder of the project "npx wdio run wdio.conf.ts --browser=chrome,firefox,android"
You can choose wich browser or platform to use using the --browser flag and specifying either chrome, firefox or android (chrome in android), or multiples browsers separated by a ','. If none is specified by default the framework will pick chrome.

Firefox or Chrome tests will run in headless mode, if you want to see the browser running remove the headless flag from the capabilities located in ./wdio.conf.ts file

For Firefox remove --headless from the args on the following command  :return "{ browserName: "firefox", "moz:firefoxOptions":{prefs:{"security.mixed_content.block_active_content": false},args: ["--headless"]} }" 

For Chrome line 70 remove --headless from the args on the following command "return { browserName: "chrome", "goog:chromeOptions": { args: ["--headless","--start-maximized","--allow-running-insecure-content"] }}"


Steps to run tests in Android Chrome.
-----------------------------------------------------------
To run on Android chrome we need to use Appium and a real device connected to the PC or an emulator

1 - Install Appium running the following command "npm install -g appium"

2 - Install ui-automator-2 driver running "npm install -g appium-uiautomator2-driver"

3 - If you want to use a real android device to run the tests, you will need to first enable the developper mode on your device (navigate to Settings > About phone > Build number and tap the Build number field seven times),
Then enable USB debugging (navigate to Settings > System > Advanced > Developer options and toggle the USB debugging option to on).
This will allow appium to etablish a connection with the device.

4 - Plug the device to your computer

5 - Check that the plugged in device is recognized by running the command "adb devices" this should list at least 1 device.

6 - Start the appium server running the "appium" command, by default the port 4723 will be used, if this port is busy please change to a different port by running
"appium --port 5000" (e.g: for port 5000) and change the port used by the framework on the capabilities located in the file wdio.conf.ts line 64
return {port: 4723,platformName: "android", browserName: "Chrome","appium:automationName" ... by the port of your choise

7 - In order to run the tests pointing to the android device, run the following command on the root folder of the project "npx wdio run wdio.conf.ts --browser=android"
You should see the command passing through the appium server adn the chrome browser running on the device.
