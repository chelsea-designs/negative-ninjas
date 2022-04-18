# Testing

## Code Validation

### HTML 
The HTML code for the site was checked using the main validator services of w3.org for HTML. [View Report](https://validator.w3.org/nu/?doc=https%3A%2F%2Fchelsea-designs.github.io%2Fnegative-ninjas%2F). There were no errors or warnings.

### CSS
The CSS code for the site was checked using the w3.org jigsaw validator service for CSS. [View Report](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fchelsea-designs.github.io%2Fnegative-ninjas%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en#warnings). The report contains no errors, however it does flag 45 warnings which relate to the use of CSS variables and -webkit- or -moz- prefixes. The use of CSS variables were checked on caniuse.com and returned a compatibility of 93.3% across all browsers with all browsers reporting compatibility except Internet Explorer, Opera Mini, QQ and Baidu.

### JavaScript
The JavaScript was checked in the JSHint validator. [View Image of Report](assets/readme-images/jshintReport.png). In order to achieve no issues the validator needs to be configured to allow ES6 through the configuration options. One undefined variable was found, this is the introJS package I'm using, this error was disregarded. An additional warning was seen "Expected an assignment or function call and instead saw an expression.", this is due to my use of ternary instead of if/else statement, and can be disregarded.

## Accessibility
The site was also checked for accessibility by using the WAVE web accessibility evaluation tool from web aim. [View Report](https://wave.webaim.org/report#/https://chelsea-designs.github.io/negative-ninjas/). The report returns 6 errors relating to contrast errors for the text colour in the footer. The WAVE checker suggested solution is to ensure there is appropriate contrast between foreground and background colours. As the colour contrast was tested with the [Contrast Grid](https://contrast-grid.eightshapes.com/?version=1.1.0&background-colors=&foreground-colors=%23fffff%2C%20White%0D%0A%23E7E2DB%2C%20White%0D%0A%23f8f8f8%2C%20White%0D%0A%23b3b3b3%2C%20%20Light%20Grey%0D%0A%23F8BA50%2C%20%20Light%20Orange%0D%0A%23FB940A%2C%20%20Mid%20Orange%0D%0A%23EA7607%2C%20%20Dark%20Orange%0D%0A%23020101%2C%20Black%0D%0A&es-color-form__tile-size=compact&es-color-form__show-contrast=aaa&es-color-form__show-contrast=aa&es-color-form__show-contrast=aa18&es-color-form__show-contrast=dnp), these errors were disregarded.

The site was also checked overall through the Lighthouse system built into the Google Chrome Browser. The lighthouse report gave an almost perfect score of 99, 98, 100, 100. Repeated running of the report deviates between a perfect score and the almost perfect score initially achieved suggesting that the difference is extremely minor. The suggested options to achieve an improved score on the initial report related to the colour contrast of the footer, previously mentioned in WAVE report, however, as before this warning was disregarded. [View Image of Report](assets/readme-images/lighthouseReport.png)

The site accessibility was also checked through the use of a screen reader. By installing a screen reader extension into Google Chrome, available from the Chrome extensions store, I was able to navigate the site based on the instructions of the screen reader. This allowed me to test that each element was able to be correctly read by the screen reader and that the questions and progress bars could be read by the screen reader.

## Responsive Testing

The site was checked for responsiveness and behaviour of animations across Google Chrome, Firefox and Safari. I also tested the site on an iPhoneSE, an iPad Mini and an Redmi Note 9 Pro. Within the developer tools of each browser, or by resizing the browser window manually, the site was checked for the following devices: 
* iPhone SE
* iPhone XR
* iPhone 12 Pro
* Pixel 5
* Samsung Galaxy S8+
* Samsung Galaxy S20 Ultra
* iPad Air
* iPad Mini
* Surface Duo

This site was checked for conformity to design in both portrait and landscape orientations. Whilst the site is designed for a portrait orientation on handheld devices it was important that it did not break the site design if the user prefers a landscape orientation.

One issue identified was the overlapping of the battle scene with the question area on landscape handheld devices. I added a max-height of 25vh to the ninja and dragon images and a max-width of 25vh to the progress bars to match. I also removed the padding on the h2 heading to avoid wrapping to next line. I have also added an alert for the user to choose portrait mode for a better experience.


## In game testing
* The site was checked for users who have JavaScript disabled within their browsers. It successfully displays a warning message along with instructions on how to access the site to the user.
No issues were discovered.

* The user has the option to change the difficulty level. The changes made within the level selector were checked through out the site to ensure that the desired changes occured correctly. 
No issues were discovered.

* The in game modals were checked to ensure the game operated correctly with the final resolution to the level successfully being accessed at the appropriate times.
No issues were discovered.

* The ability for the user to change the colour scheme was extensively tested across multiple browsers to ensure full compatibility. All elements of the game were checked to ensure that the appropriate colour changes occured.
No issues were discovered.

* The ability for the user to access a How to Play tutorial was extensively tested across multiple browsers to ensure full compatibility. 
No issues were discovered.

* The ability for the user to toggle sound for the game was extensively tested across multiple browsers to ensure full compatibility. 
No issues were discovered.

* The ability for the user to toggle between English and Welsh language for the game was extensively tested through-out all screens of the game.
No issues were discovered.

* Accessibility was one of the main goals for the project. Being able to navigate the site, access all elements and control the game with a keyboard was important. Therefore all elements were tested to be fully compliant. One issue was discovered during the testing process in that users were unable to navigate all elements with the tab button. This issue was rectified by adding a tabindex to the modal content which allows a keyboard user to navigate the content.