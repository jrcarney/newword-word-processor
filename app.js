
(function( global ) {



  var newWord = function( customVar ) {
    return new newWord.Init( customVar );
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
      newDiv.innerHTML += '<div class="toolbar--" id="' + this.customVar + '-toolbar"><button id="bold-' + this.customVar + '-toolbar"  class="toolbar-buttons">Bold</button><button id="underline' + this.customVar + '-toolbar" class="toolbar-buttons">Underline</button></div><div id="' + this.customVar +  '" contenteditable="true"></div>';

      // Add the newWord html just before the closing body tag
      var currentDiv = document.getElementById("body");
      document.body.appendChild(newDiv, currentDiv);
    },

    saveToLocalStorage: function() {

      /**
       * Word processor tutorial: BEGIN
       * tutorial @ https://enlight.nyc/text-editor
       */

       // add new content to each dedicated editor
       // -
      var content = document.getElementById( this.customVar );
      content.innerHTML = localStorage[ this.customVar ] || 'Just Write';

      setInterval(function() {
        localStorage[ content.id ] = content.innerHTML;
      }, 1000);
      /* // Word processor tutorial: END */
    },

    setToolbar: function() {
      // debugger
      // See readme: Get child elements (buttons) in the toolbar
      for(var i=0; i<document.getElementById( this.customVar+'-toolbar' ).children.length; i++) {
        // debugger
        document.getElementById( this.customVar+'-toolbar' ).children[i].addEventListener('click', function(ev) {
          debugger
          if( this.id === ev.srcElement.id ) {
            document.execCommand(this.innerText.toLowerCase(), false, null);
          }
        });
      }
    }


  }; // end newWord.prototype

  newWord.Init = function( customVar ) {
    var self = this;

    self.customVar = customVar || "content";

    self.generateHtml();

    self.saveToLocalStorage();

    self.setToolbar();


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
	var doc1 = newWord("word-doc-1");

  var doc2 = newWord("word-doc-2");

// -- Unused code ------------------------------------------ //

  // generic function to operate on the text
  // function modifyText(formatOption) {
  //   document.execCommand(formatOption, false, null);
  // }
