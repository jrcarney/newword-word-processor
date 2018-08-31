var newWord = (function() {

//debugger

    /** # Priavate properties **/
    var commands = [
      {
        "name": "Highlight",
        "cmd": "backColor",
        "title": "Add the selected colour to the selected text",
        "value": "yellow",
        "enableprompt": "true"
      },
      {
        "name": "bold",
        "cmd": "bold",
        "title": "Make the selected text emboldened",
        "value": "",
        "enableprompt": ""

      },
      {
        "name": "Remove Highlight",
        "cmd": "backColor",
        "title": "Remove background colour from the selected text",
        "value": "transparent",
        "enableprompt": ""
      },
      {
        "name": "under-line",
        "cmd": "underline",
        "title": "",
        "value": "",
        "enableprompt": ""
      }
    ];

    /** # Private methods **/

     /**
     * Creates the newWord html (needed by the application) and adds it
     * before the closing body tag
     */
     var setDocEditorId = function( docEditorId ) {
       newWord.docEditorId = docEditorId;
       newWord.docEditorToolbar = docEditorId+"-toolbar";
       newWord.docEditorContent = docEditorId+"-content";
     };

     /**
      * START: Create the word processor html
      */
    var generateHtml = function() {
      // @JC 31/8/18:
      // create new elemtn
      var createDocument = document.createElement('button');
      createDocument.id = 'new-document';
      createDocument.textContent = 'Create new document';
      // Append the new document button to the root application element
      newWord.rootElement.appendChild(createDocument);

      // @JC 31/8/18:
      // create delete element
      var deleteDocument = document.createElement('button');
      deleteDocument.id = 'delete-document';
      deleteDocument.textContent = 'Delete document';
      // Append the new document button to the root application element
      newWord.rootElement.appendChild(deleteDocument);

      // @JC 31/8/18:
      // create delete element
      var deleteDocument = document.createElement('div');
      deleteDocument.id = 'create-doc-msg';
      deleteDocument.textContent = 'Select or create a new document';
      // Append the new document button to the root application element
      newWord.rootElement.appendChild(deleteDocument);

      // # See readme: Document.createElement():
      // create a new div element
      var newDiv = document.createElement("div");

      // See https://developer.mozilla.org/en-US/docs/Web/API/Element/id for how to use the id property directly
      newDiv.id = 'newword-container';
      newDiv.style.display = 'none';

      // # See readme: Add string of HTML inside another element
      newDiv.innerHTML += `<div id="${newWord.docEditorToolbar}"></div><div id="${newWord.docEditorContent}" contenteditable="true"></div>`;

      // Append the text area to the root application element
      newWord.rootElement.appendChild(newDiv);

      createToolbarButtons();
    };

    /**
     * @TODO
     * - high priority: add some more buttons.
     * - low priority: enable the implementation to enable / disable buttons.
     */
    var createToolbarButtons = function() {
      var buttons = "";
      for(i=0; i<commands.length; i++) {
        console.log(commands[i]);
        var command = commands[i];
        buttons += `<button id="${command.cmd}-${newWord.docEditorToolbar}" class="toolbar-buttons" name="${command.cmd}" title="${command.title}" value="${command.value}" data-enableprompt="${command.enableprompt}">${command.name}</button>`;
      }

      var editor = document.getElementById( newWord.docEditorToolbar );
      editor.innerHTML += buttons;

      setToolbar();
    };

    var setToolbar = function() {
      var toolbar = document.getElementById( newWord.docEditorToolbar );

      // See readme: Get child elements (buttons) in the toolbar
      for(var i=0; i<toolbar.children.length; i++) {
        toolbar.children[i].addEventListener('click', function(ev) {
          var val = "";
          if( this.dataset.enableprompt === "true" ) {
            val = prompt("Value for " + this.name + "?", val);
            val = val || "";
          } else {
            val = this.value;
          }
          document.execCommand(this.name, false, ( val || ""));
        });
      }
    };

    /**
     * END: Create the word processor html
     */

    /**
     * @JC 10/08/18:
     *
     * Display a list of the currently save documents, ie,
     * everything stored in localStorage
     */
    var selectDocument = function() {
      // get the localStorage object then call newDocumentLocalStorage and
      // pass the user selected document

      // @JC 10/08/18: create a container for the docuent lsit to reside in
      var docSelectorContainer = document.createElement("div");
      docSelectorContainer.setAttribute('class','doc-selector-container');

      // @JC 10/08/18: loop through localStorage, add a click handler to each item,
      // then dsiaply the documents contents in the editor
      for(var i=0; i<localStorage.length; i++) {
      	console.log("prnt localStorage items and add click handler");

        var loopedItem = Object.keys(localStorage)[i];
        var localStorageItem = document.createElement("p");

        localStorageItem.innerHTML += loopedItem;
        docSelectorContainer.appendChild( localStorageItem );

        localStorageItem.addEventListener('click', function(ev) {

          clearInterval( newWord.timer );

          console.log("// ev.srcElement.innerHTML is "+ev.srcElement.innerHTML);
          newWord.documentName = ev.srcElement.innerHTML;
          newDocumentLocalStorage( newWord.documentName );

          // @JC 26/8/18:  Display the text editor area
          var a = document.getElementById("newword-container");
          a.style.display = "block";

          // @JC 26/8/18: remove selet or create document message
          var b = document.getElementById('create-doc-msg');
          b.style.display = 'none';

          debugger

          // @JC 31/8/18: Remove any previous highlighted classes
          var docSelectorContainer = document.querySelector('.doc-selector-container');
          for(var i=0; i<docSelectorContainer.children.length; i++) {
          	var child = docSelectorContainer.children[ i ];
          	child.classList = [];
          }
          // Add highlighted class to the currently selected item
          ev.srcElement.className = 'selected-docuement';
        });

        // Append the document selector to the root element
        newWord.rootElement.append(docSelectorContainer);
      }
    };

    /**
     *  @JC 10/08/18:
     *
     * - Once a document has been selected, regularly save it to local storage
     * - If no document has been selected, then dont display any document
     */
    var newDocumentLocalStorage = function( docName ) {
      /**
       * Word processor tutorial: BEGIN
       * tutorial @ https://enlight.nyc/text-editor
       */
       // add new content to each dedicated editor
       // -
       if( !docName ) {
         var docName = newWord.docEditorContent;
       }
      var content = document.getElementById( newWord.docEditorContent );
      content.innerHTML = localStorage.getItem( docName ) || 'Just Write';
      newWord.newDocumentTimer = setInterval(function() {
        if( !newWord.documentName ) {
          return;
        }

        if( newWord.documentDeleted !== 1 ) {
          localStorage.setItem( newWord.documentName, document.getElementById( newWord.docEditorContent ).innerHTML);
        }
      }, 500);
      /* // Word processor tutorial: END */
    };

    /**
     * Change the theme of the editor
     */
    var changeTheme = function( theme ) {
      if( theme === 'dark' ) {
        var editor = document.getElementById( newWord.docEditorContent );
        editor.style.backgroundColor = '#383737';
        editor.style.color = '#fff';
        document.getElementById('body').style.backgroundColor = 'grey';
      }
    };

    /** # Async methods **/

    /**
     * @JC 10/08/18:
     *
     * Creates a new document when the user clicks the 'new document' button
     */
    var newDocument = function() {
      document.querySelector( '#new-document' ).addEventListener('click', function(ev) {

        // @JC 13/08/18: set flag so we can save documents after one has been deleted
        newWord.documentDeleted = 0;

        console.log("clled newDocument");
        newWord.documentName = prompt("Name of document","");

        // @JC 10/08/18: clear the timer so we are not createing multuple timers
        clearInterval( newWord.timer );

        // @JC 10/08/18: addthe new docuemtn to localStorageItem
        newDocumentLocalStorage( newWord.documentName );

        // @JC 10/08/18: remove the previous docuemtn list as now want to create a
        // new one with the newly added doc. To use our rootElement property, we must use the id DOM property
        var bodyp = document.getElementById(newWord.rootElement.id);
        var s = document.querySelector( '.doc-selector-container' );
        bodyp.removeChild( s );

        // Display the text editor area
        var a = document.getElementById("newword-container");
        a.style.display = "block"

        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(function() {
          selectDocument();
        }, 600);
      } );
    };

    /**
     * Delete the currently selected document
     */
    var deleteDocument = function() {
      document.getElementById('delete-document').addEventListener('click', function() {
        console.log('delete-document reached');

        localStorage.removeItem( newWord.documentName );
        document.getElementById( newWord.docEditorContent ).innerHTML = "No document selected";

        newWord.documentDeleted = 1;

        // @JC 10/08/18: remove the previous document list as now want to create a
        // new one with the newly added doc
        var rootEl = document.getElementById(newWord.rootElement.id);
        var s = document.querySelector( '.doc-selector-container' );
        rootEl.removeChild( s );

        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(function() {
          selectDocument();
        }, 600);
      });
    };


    // old - not used
    /**
     * @JC 1/05/18: may not need this method keep just in case if tings start to mess up
     * Alternatively jsut use chrome private mode which seesm to work better.
     * its possible that extensions are cuasing the issue?
     *
     * To avoid any weird chrome / browser issues with not writing new content
     * to local storage, save() clears the timer, sets editor to nothing and
     * writes the new content to it
     *
     */
    // var save = function() {
    //   // debugger
    //   clearInterval(newWord.timer);
    //   // newWord.timer = 0;
    //   localStorage.setItem( newWord.docEditorId, "");
    //   localStorage.setItem( newWord.docEditorId, document.getElementById( newWord.docEditorId ).innerHTML);
    // };


    /**
     * @JC 30/8/18:
     *
     * Get a reference to newword-wrapper.
     * The root element must have an ID attribute for things to work.
     */
   var getRootElement = function() {
     var rootEl = document.getElementById('newword-wrapper');
     newWord.rootElement = rootEl;
   };


    // # public methods # //

    return {

      init: function( params ) {

        // set defaults
        if( !params ) {
          params = {};
          params.editorName = "newword";
          params.themeColor = "light";
        }

        setDocEditorId( params.editorName || "newword" );
        // newWord.docEditorId = params.editorName || "newword-editor";

        // @JC 30/8/18: setup a reference to the root application element
        getRootElement();

        generateHtml();

        // @JC 10/08/18: prpmpt user after page load to select a document from
        // localStorage
        selectDocument();

        // @JC 10/08/18: commened out so to try and use a refactored localStorage
        // saveToLocalStorage();
        newDocumentLocalStorage();

        changeTheme( params.themeColor );



        /** # Async method calls **/
        newDocument();
        deleteDocument();

        console.log("Initialised app");
      },

      //},
      // just beofre
      // exitApp: window.onbeforeunload = function(event) {
      //  save();
      // }
    }

})();

// use default values
// newWord.init();

// customise
newWord.init({
  themeColor: "dark"
});
