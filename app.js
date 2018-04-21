
(function( global ) {

  debugger

  var newWord = function() {
    return new newWord.Init();
  };

  newWord.prototype = {
     /**
     * Creates the newWord html (needed by the application) and adds it
     * before the closing body tag
     */
    generateHtml: function() {
      // # See readme: Document.createElement():
      // create a new div element
      var newDiv = document.createElement("div");

      // # See readme: Add string of HTML inside another element
      newDiv.classList.add("newword-container");

      // # See readme: Add string of HTML inside another element
      newDiv.innerHTML += '<div id="toolbar"><button id="bold" class="toolbar-buttons">Bold</button><button id="underline" class="toolbar-buttons">Underline</button></div><div id="content" contenteditable="true"></div>';

      // Add the newWord html just before the closing body tag
      var currentDiv = document.getElementById("body");
      document.body.appendChild(newDiv, currentDiv);
    }
  }; // end newWord.prototype

  newWord.Init = function() {
  var self = this;
    self.generateHtml();

    /**
     * Word processor tutorial: BEGIN
     * tutorial @ https://enlight.nyc/text-editor
     */
    var content = document.getElementById('content');
    content.innerHTML = localStorage['content'] || 'Just Write';

    setInterval(function() {
      localStorage['content'] = content.innerHTML;
    }, 1000);
    /* // Word processor tutorial: END */

    // See readme: Get child elements (buttons) in the toolbar
    for(var i=0; i<document.getElementById('toolbar').children.length; i++) {
      // debugger
      document.getElementById('toolbar').children[i].addEventListener('click', function(ev) {
        // debugger
        document.execCommand(ev.srcElement.id, false, null);
      });
    }
  }

//   /**
//    * Creates the newWord html (needed by the application) and adds it
//    * before the closing body tag
//    */
//   newWord.generateHtml = function() {
//     // create a new div element
//     var newDiv = document.createElement("div");
//     newDiv.classList.add("newword-container");
//     newDiv.innerHTML += '<div id="toolbar"><button id="bold" class="toolbar-buttons">Bold</button><button id="underline" class="toolbar-buttons">Underline</button></div><div id="content" contenteditable="true"></div>';

//     // Add the newWord html just before the closing body tag
//     var currentDiv = document.getElementById("body");
//     document.body.appendChild(newDiv, currentDiv);
//   };


  // this is all to do with setting up a clean prototype chain
	newWord.Init.prototype = newWord.prototype;

  global.newWord = newWord;



}( window ));

/**
 * Implementation:
 * Not sure what to add here
 */

	// create a new greetr object without the need to use the new keyword (due to Greetr.js' architecture)
	var g = newWord();

// -- Unused code ------------------------------------------ //

  // generic function to operate on the text
  // function modifyText(formatOption) {
  //   document.execCommand(formatOption, false, null);
  // }
