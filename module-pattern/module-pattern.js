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
      },
      {
        "name": "remove-format",
        "cmd": "removeFormat",
        "title": "",
        "value": "",
        "enableprompt": ""
      },
      {
        "name": "change-color",
        "cmd": "foreColor",
        "title": "",
        "value": "rgba(0,0,0,.5)",
        "enableprompt": "true"
      }
    ];

    // Module object for containing private properties
    var newWord = {};
    newWord.documentList = [];
    newWord.sortOrder = 1;

    /** # Private functions **/

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

      // @JC 17/9/18:
      var sortButton = document.createElement('button');
      sortButton.id = 'cheap';
      sortButton.textContent = 'Sort';
      // Append the new document button to the root application element
      newWord.rootElement.appendChild(sortButton);

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

     // @JC 16/9/18: attempt to sort document list
     var getLocalStorageItems = function( reverse ) {
       newWord.documentList = [];

       // @JC 10/08/18: loop through localStorage, add a click handler to each item,
       // then dsiaply the documents contents in the editor
       for(var i=0; i<localStorage.length; i++) {
         console.log("prnt localStorage items and add click handler");
         newWord.documentList.push( Object.keys(localStorage)[i] );
       }

      //  if( newWord.sortOrder === 0 ) {
      //    newWord.documentList = newWord.documentList.reverse();
      //    newWord.sortOrder = 1;
      //    console.log(newWord.documentList);
      //    // debugger
      //
      // } else {
      //   // debugger
      //   newWord.documentList.sort();
      //   newWord.sortOrder = 0;
      // }

      // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
      // setTimeout(function() {
      //   selectDocument();
      // }, 10);
     };

     // @JC 17/9/18: Sort the documents in ascending or descending order
     var sortTheDocuments = function() {
       // reverse the list
       if( newWord.sortOrder === 0 ) {
         // old way of reversing: note - it dosnt account for uppercase words which isnt good
         // newWord.documentList = newWord.documentList.reverse();
         //
         newWord.documentList.sort(function(a, b) {
           //debugger
          var a = a.toLowerCase();
           var b = b.toLowerCase();

           var comparison = 0;
           if (a < b) {
             comparison = -1;
             // return -1;
           }
           if (a > b) {
             comparison = 1;
             // return 1;
           }

           // names must be equal
           return comparison * -1;
         } );
         newWord.sortOrder = 1;
         console.log(newWord.documentList);
         // debugger

      } else {
        // old way of reversing: note - it dosnt account for uppercase words which isnt good
        // newWord.documentList.sort();

        // sort list alphabeticaly
        newWord.documentList.sort(function(a, b) {
          //debugger
         var a = a.toLowerCase();
          var b = b.toLowerCase();

          var comparison = 0;
          if (a < b) {
            comparison =  -1;
          }
          if (a > b) {
            comparison = 1;
          }

          // names must be equal
          return comparison;
        } );

        newWord.sortOrder = 0;
        console.log(newWord.documentList);
      }
     };

    /**
     * @JC 10/08/18:
     *
     * Display a list of the currently save documents, ie,
     * everything stored in localStorage
     */
    var selectDocument = function() {
      // get the localStorage object then call newDocumentLocalStorage and
      // pass the user selected document

      // @JC 16/9/18: rmeove the previous docuemt container

      var bodyp = document.getElementById(newWord.rootElement.id);
      var s = document.querySelector( '.doc-selector-container' );
      if (s) {
        bodyp.removeChild( s );
      }

      // @JC 10/08/18: create a container for the docuent lsit to reside in
      var docSelectorContainer = document.createElement("div");
      docSelectorContainer.setAttribute('class','doc-selector-container');

      // @JC 10/08/18: loop through localStorage, add a click handler to each item,
      // then dsiaply the documents contents in the editor
      for(var i=0; i<newWord.documentList.length; i++) {
      	console.log("prnt localStorage items and add click handler");

        //var loopedItem = Object.keys(localStorage)[i];
        var localStorageItem = document.createElement("p");

        localStorageItem.innerHTML += newWord.documentList[ i ];
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

          // @JC 31/8/18: Remove any previous highlighted classes
          // NOTE: this logic is pretty much doing the same as the code below
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

      // @JC 12/9/18: Highlight the newly created document
      // NOTE: this logic is pretty much doing the same as the code in selectd
      // click handler so refactor to one functon
      if( newWord.newlyCreatedDoc  ) {

        var docSelectorContainer = document.querySelector('.doc-selector-container');
        for(var i=0; i<docSelectorContainer.children.length; i++) {
          var child = docSelectorContainer.children[ i ];

          if( newWord.documentName === child.innerHTML ) {
            child.setAttribute('class', 'selected-docuement');
          }
        }
      }
    };

    /**
     *  @JC 10/08/18:
     *
     * - Once a document has been selected, regularly save it to local storage
     * - If no document has been selected, then dont display any document
     */
    var newDocumentLocalStorage = function( docName ) {
      // debugger
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

          // @JC 12/9/18
          newWord.newlyCreatedDoc = 1;
        }
      }, 5);
      /* // Word processor tutorial: END */
    };

    /**
     * Change the theme of the editor
     */
    var theme = function( params ) {
      if( params && params.themeColor === '' ) {
        return;
      }
      if( params && params.themeColor === 'dark' ) {
        var editor = document.getElementById( newWord.docEditorContent );
        editor.style.backgroundColor = '#383737';
        editor.style.color = '#fff';
        document.getElementById('body').style.backgroundColor = 'grey';
      }

      if( params && params.themeColor === 'camo' ) {
        var editor = document.getElementById( newWord.docEditorContent );
        // editor.style.backgroundColor = 'rgb(96, 117, 91)';
        editor.style.backgroundColor = '#748475';
        // document.getElementById('body').style.backgroundColor = '#dedede';
        document.getElementById('body').style.backgroundColor = 'rgb(96, 117, 91)';
        document.getElementById('body').style.color = '#dedede';
      }

      if( params && params.themeColor === 'homebrew' ) {
        // content editor
        var editor = document.getElementById( newWord.docEditorContent );
        editor.style.backgroundColor = 'black';
        editor.style.color = '#01ff01';
        editor.style.fontFamily = 'monospace';
        editor.style.fontSize = '18px';

        // document.getElementById('body').style.backgroundColor = '#dedede';
        document.getElementById('body').style.backgroundColor = '#272727';
        document.getElementById('body').style.color = '#dedede';

        // document list
        var themeDocList = document.getElementsByClassName('doc-selector-container')[0].children
        for(var i=0; i<themeDocList.length; i++) {
        	// console.log(a[ i ]);
        	themeDocList[ i ].style.color = '#9f9fff';
        }
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
        //debugger
        // @JC 13/08/18: set flag so we can save documents after one has been deleted
        newWord.documentDeleted = 0;

        console.log("clled newDocument");
        newWord.documentName = prompt("Name of document","");

        // @JC 10/08/18: clear the timer so we are not createing multuple timers
        clearInterval( newWord.timer );

        // @JC 10/08/18: addthe new docuemtn to localStorageItem
        newDocumentLocalStorage( newWord.documentName );
//debugger
        // @JC 10/08/18: remove the previous docuemtn list as now want to create a
        // new one with the newly added doc. To use our rootElement property, we must use the id DOM property
        // var bodyp = document.getElementById(newWord.rootElement.id);
        // var s = document.querySelector( '.doc-selector-container' );
        // bodyp.removeChild( s );

        // Display the text editor area
        var a = document.getElementById("newword-container");
        a.style.display = "block";

        // Add highlighted class to the currently selected item
        //ev.srcElement.className = 'selected-docuement';

        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(function() {
          // debugger

          getLocalStorageItems();
          newWord.sortOrder = 1; // Sort alphabeticaly when we create an item
          sortTheDocuments();
          selectDocument();

        }, 100);
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

        getLocalStorageItems();

        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(function() {
          // selectDocument();

          getLocalStorageItems();
          newWord.sortOrder = 1; // Sort alphabeticaly when we delete an item
          sortTheDocuments();
          selectDocument();


        }, 10);
      });
    };

    var sortDocList = function() {
        document.getElementById('cheap').addEventListener('click', function(ev) {
          //newWord.sortOrder = 0;
          getLocalStorageItems( newWord.sortOrder );
          sortTheDocuments();
          selectDocument();
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

   /**
    * This is where we create our application
    * @param  {[type]} params [description]
    * @return {[type]}        [description]
    */

    var init = function( params ) {

        // set defaults
        if( !params ) {
          params = {};
          params.editorName = "newword";
        }

        setDocEditorId( params.editorName || "newword" );
        // newWord.docEditorId = params.editorName || "newword-editor";

        // @JC 30/8/18: setup a reference to the root application element
        getRootElement();

        generateHtml();

        // @JC 10/08/18: prpmpt user after page load to select a document from
        // localStorage
        // selectDocument();
        getLocalStorageItems();
        sortTheDocuments();
        selectDocument();

        // @JC 10/08/18: commened out so to try and use a refactored localStorage
        // saveToLocalStorage();
        newDocumentLocalStorage();

        /** # Async method calls **/
        newDocument();
        deleteDocument();
        sortDocList();

        console.log("Initialised app");
      };

      // Fire up the application
      init();

      /** ## PUBLIC API  ## **/
      return {
        // Allows user to change color of the application
        changeTheme: function( params ) {
          theme( params );
        }
      }

      //},
      // just beofre
      // exitApp: window.onbeforeunload = function(event) {
      //  save();
      // }
})();

// public API usage

// ** note: we dont need to call init as its done privately inside the iife / module
//newWord.changeTheme();

/**
 * THeme options
 * - vanilla ( default - no param value for themeColor)
 * - dark
 * - camo
 */
newWord.changeTheme({
  themeColor: "homebrew"
});
