## Project requirements

- We are going to build a word processor application called NewWord.

- NewWord will enable a user to create a text document and apply various forms of formatting, all within the web browser.

- We are going to focus one at a time on building each part of the application.

- We are going then going to focus on building a clean structure

- NewWord will be a reusable application. Not only will it work as a stand alone application, but it can be added to any other web application.

## Resources

- Add any useful resources here

## Progress

### 13/08/18
- Added document deletion functionality

### 10/08/18
- New document functionality added
- Document selection functionality added
- Default parameters adde to init()

### 28/04/18
- Added some more formatting options.
- Created commands object to hold settings for each formatting button.
  - borrowed idea form https://codepen.io/jrc16/pen/ELjeMV?editors=0010
- Added some validation to setToolbar, enabling window prompt for backgroundColor formatter.
  - borrowed idea form https://codepen.io/jrc16/pen/ELjeMV?editors=0010
- Added custom `data-enableprompt` data attribute which checks whether a formatter should allow the prompt to display.
  - see [JavaScript access](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) for getting hold of the attribute in the script.

---

### 27/04/18

- Broke up the project into separate module pattern and psuedo classical pattern folders, to distinctly separate the 2.
- Added createToolbarButtons() function which takes care of adding formatting buttons to the toolbar.
  - Made use of template literals: https://css-tricks.com/template-literals/

---

### 22/04/18

- progress:
  - 'Separated Init() functionality into to separate methods.
  - Toolbars control separate areas however, which needs to rectified
    - Not sure if i can isolate the execCommand() to operate on a specific part of the text that is selected
    - NOTE: I will probably have to enable only one editor on screen, perhaps use singleton pattern?

- Switching over to the Module Pattern:
  - Addy Design Patterns: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
  - 4 JavaScript Design Patterns You Should Know: https://www.evernote.com/shard/s424/nl/68042563/290946cb-175c-4f56-9841-2211880bc881/

---

### 21/04/18

  - Structure based on:
    - https://github.com/jrcarney/greetr-custom-library/blob/added-jquery-support/Greetr.js

  - Document.createElement():
    - https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    - https://codepen.io/pen/?editors=1010

  - Add string of HTML inside another element
    - https://stackoverflow.com/questions/15741006/adding-div-element-to-body-or-document-in-javascript
    - Add class to element - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

---

### 20/04/18
- Editor formatting:
  - Document.execCommand():
  - https://www.youtube.com/watch?v=mysAB7NAjDk
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand

- Codepen: Use execCommands to edit HTML content in your browser
  - https://codepen.io/jrc16/pen/ELjeMV?editors=0010

- addEventListener():
  - https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

- document.querySelectorAll():
  - https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll

- get child elements (buttons) in the toolbar:
  - Finding child element of parent pure javascript - https://stackoverflow.com/questions/16302045/finding-child-element-of-parent-pure-javascript
  - How do I loop through children objects in javascript? - https://stackoverflow.com/questions/17094230/how-do-i-loop-through-children-objects-in-javascript
  - Add Event Listener to Collection of HTML Elements - https://stackoverflow.com/questions/27834226/add-event-listener-to-collection-of-html-elements ( see comment 2 for what i used )
