var newWord = (function() {

debugger

    /** # Priavate properties **/

    /** # Priavate methods **/
     /**
     * Creates the newWord html (needed by the application) and adds it
     * before the closing body tag
     */
     var setDocEditorId = function( docEditorId ) {
       newWord.docEditorId = docEditorId || "newword-editor";
       //return docEditorId;
     };

    var generateHtml = function() {
      //var setDocEditorId = setDocEditorId();

      // # See readme: Document.createElement():
      // create a new div element
      var newDiv = document.createElement("div");

      // # See readme: Add string of HTML inside another element
      newDiv.classList.add("newword-container");

      // # See readme: Add string of HTML inside another element
      newDiv.innerHTML += '<div class="toolbar--" id="' + newWord.docEditorId+ '-toolbar"><button id="bold-' + newWord.docEditorId + '-toolbar"  class="toolbar-buttons">Bold</button><button id="underline' + newWord.docEditorId + '-toolbar" class="toolbar-buttons">Underline</button></div><div id="' + newWord.docEditorId +  '" contenteditable="true"></div>';

      // Add the newWord html just before the closing body tag
      var currentDiv = document.getElementById("body");
      document.body.appendChild(newDiv, currentDiv);
    };

    var saveToLocalStorage = function() {

      /**
       * Word processor tutorial: BEGIN
       * tutorial @ https://enlight.nyc/text-editor
       */

       // add new content to each dedicated editor
       // -
      var content = document.getElementById( newWord.docEditorId );
      content.innerHTML = localStorage[ newWord.docEditorId] || 'Just Write';

      setInterval(function() {
        localStorage[ content.id ] = content.innerHTML;
      }, 1000);
      /* // Word processor tutorial: END */
    };

    var setToolbar = function() {
      // debugger
      // See readme: Get child elements (buttons) in the toolbar
      for(var i=0; i<document.getElementById( newWord.docEditorId+'-toolbar' ).children.length; i++) {
        // debugger
        document.getElementById( newWord.docEditorId+'-toolbar' ).children[i].addEventListener('click', function(ev) {
          debugger
          if( this.id === ev.srcElement.id ) {
            document.execCommand(this.innerText.toLowerCase(), false, null);
          }
        });
      }
    };


    return {
      init: function( docEditorId ) {
        setDocEditorId( docEditorId );
        generateHtml();
        saveToLocalStorage();
        setToolbar();
        console.log("Initialised app");
      }
    };    

})();

var doc1 = newWord.init();
var doc2 = newWord.init("jctest");
