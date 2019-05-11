let newWord = (() => {

  //debugger

    /** # Private variables **/
    let commands = [
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

    /** Module object which contains private properties **/
    let newWord = {};
    newWord.documentList; 
    newWord.sortOrder = 1;

    /** # Private functions **/

    /**
     * Creates the newWord html (needed by the application) and adds it
     * before the closing body tag
     */
    let setDocEditorId = (docEditorId) => {      
      newWord.docEditorId = docEditorId;
      newWord.docEditorToolbar = docEditorId+"-toolbar";
      newWord.docEditorContent = docEditorId+"-content";
    };

     /********************************************************************************************************************
      * START: Create the word processor html
      *******************************************************************************************************************/
    let generateHtml = () => {    
      // Message area: prompts the user to select or create a ne document
      let createDocumentMessage = document.createElement('div');
      createDocumentMessage.id = `${newWord.docEditorId}-create-doc-msg`;
      createDocumentMessage.textContent = 'Select or create a new document';
      // Append the messages to the root application element
      newWord.rootElement.appendChild(createDocumentMessage);

      // pseaduo code: 
      // goal) when a doc has been created, display a message that is dispalyed for 5 seconds
      // 1) create the html but hide it by default
      // 2) when doc has been renamed, display the "renamed messgage"
      let renamedDocumentMessage = document.createElement('div');
      renamedDocumentMessage.id = `${newWord.docEditorId}-rename-doc-msg`;
      renamedDocumentMessage.textContent = 'Document has been renamed';
      renamedDocumentMessage.style.display = 'none';
      // Append the messages to the root application element
      newWord.rootElement.appendChild(renamedDocumentMessage);
      
      // Create document button: enables the user to create a document
      let createDocument = document.createElement('button');
      createDocument.id = `${newWord.docEditorId}-create-document`;
      createDocument.textContent = 'Create new document';
      // Append the new document button to the root application element
      newWord.rootElement.appendChild(createDocument);
            
      // Delete document button: enables the user to delete a document
      let deleteDocumentButton = document.createElement('button');
      deleteDocumentButton.id = `${newWord.docEditorId}-delete-document`;
      deleteDocumentButton.textContent = 'Delete document';
      // Append the delete document button to the root application element
      newWord.rootElement.appendChild(deleteDocumentButton);

      // Rename document button: enables the user to delete a document
      let renameDocumentButton = document.createElement('button');
      renameDocumentButton.id = `${newWord.docEditorId}-rename-document`;
      renameDocumentButton.textContent = 'Rename document';
      // Append the delete document button to the root application element
      newWord.rootElement.appendChild(renameDocumentButton);

      // Sort documents button: enables the user to sort documents
      let sortButton = document.createElement('button');
      sortButton.id = `${newWord.docEditorId}-sort-documents`;
      sortButton.textContent = 'Sort';
      // Append the new document button to the root application element
      newWord.rootElement.appendChild(sortButton);

      // create a new div element
      let documentContainer = document.createElement("div");

      // See https://developer.mozilla.org/en-US/docs/Web/API/Element/id for how to use the id property directly
      //documentContainer.id = 'document-container';
      documentContainer.setAttribute('id',`${newWord.docEditorId}-document-container`)
      documentContainer.style.display = 'none';

      // # See readme: Add string of HTML inside another element
      documentContainer.innerHTML += `<div id="${newWord.docEditorToolbar}"></div><div id="${newWord.docEditorContent}" contenteditable="true"></div>`;

      // Append the text area to the root application element
      newWord.rootElement.appendChild(documentContainer);

      createToolbarButtons();
    };

    /**
     * @TODO
     * - high priority: add some more buttons.
     * - low priority: enable the implementation to enable / disable buttons.
     */
    let createToolbarButtons = () => {
      let buttons = "";
      for(i=0; i<commands.length; i++) {
        // console.log(commands[i]);
        let command = commands[i];
        buttons += `<button id="${command.cmd}-${newWord.docEditorToolbar}" class="toolbar-buttons" name="${command.cmd}" title="${command.title}" value="${command.value}" data-enableprompt="${command.enableprompt}">${command.name}</button>`;
      }

      let editor = document.getElementById( newWord.docEditorToolbar );
      editor.innerHTML += buttons;

      setToolbar();
    };

    let setToolbar = () => {
      let toolbar = document.getElementById( newWord.docEditorToolbar );

      // See readme: Get child elements (buttons) in the toolbar
      for(let i=0; i<toolbar.children.length; i++) {
        // ** not able to use fat arrow function for some reason
        toolbar.children[i].addEventListener('click', function(ev) {
          let val = "";
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

    /******************************************************************************************************************
     * END: Create the word processor html
     ******************************************************************************************************************/

     /**
      * Gets items from local storage for use in the application
      */
     let getLocalStorageItems = ( reverse ) => {
       newWord.documentList = [];

       // @JC 10/08/18: loop through localStorage, add a click handler to each item,
       // then dsiaply the documents contents in the editor
       for(let i=0; i<localStorage.length; i++) {
         // debugger
         let removeNewword = Object.keys(localStorage)[i];
         removeNewword = removeNewword.replace('newword-', '')
         // console.log("prnt localStorage items and add click handler");
         newWord.documentList.push(removeNewword);
       }
     };
     
     /**
      * Sort the document list in ascending and descending order
      */
     let sortTheDocuments = () => {
      let firstWord;
      let secondWord;
      let comparison;
       
       if( newWord.sortOrder === 0 ) {                 
         newWord.documentList.sort((a, b) => {           
          firstWord = a.toLowerCase();
          secondWord = b.toLowerCase();
           
           if (firstWord < secondWord) {
             comparison = -1;
             // return -1;
           }
           if (firstWord > secondWord) {
             comparison = 1;
             // return 1;
           }

           // names must be equal
           return comparison * -1;
         } );
         newWord.sortOrder = 1;
         // console.log(newWord.documentList);        

      } else {       

        newWord.documentList.sort((a, b) => {          
          firstWord = a.toLowerCase();
          secondWord = b.toLowerCase();          

          if (firstWord < secondWord) {
            comparison =  -1;
          }
          if (firstWord > secondWord) {
            comparison = 1;
          }

          // names must be equal
          return comparison;
        } );

        newWord.sortOrder = 0;
        // console.log(newWord.documentList);
      }
     };

    /**
     * @JC 10/08/18:
     *
     * Display a list of the currently save documents, ie,
     * everything stored in localStorage
     */
    let selectDocument = () => {
      
      // get the localStorage object then call newDocumentLocalStorage and
      // pass the user selected document

      // JC: 7/4/19
      removeDocumentSelectContainer();

      // @JC 10/08/18: create a container for the docuent lsit to reside in
      let docSelectorContainer = document.createElement("div");
      docSelectorContainer.setAttribute('class',`${newWord.docEditorId}-doc-selector-container`);

      // @JC 10/08/18: loop through localStorage, add a click handler to each item,
      // then dsiaply the documents contents in the editor
      for(let i=0; i<newWord.documentList.length; i++) {
      	// console.log("prnt localStorage items and add click handler");

        //let loopedItem = Object.keys(localStorage)[i];
        let localStorageItem = document.createElement("p");

        localStorageItem.innerHTML += newWord.documentList[ i ];
        docSelectorContainer.appendChild( localStorageItem );

        localStorageItem.addEventListener('click', (ev) => {        
          newWord.documentDeleted=0;
          clearInterval( newWord.timer );

          // console.log("// ev.srcElement.innerHTML is "+ev.srcElement.innerHTML);
          newWord.documentName = ev.srcElement.innerHTML;
          newDocumentLocalStorage( newWord.documentName );

          // @JC 26/8/18:  Display the text editor area
          let documentContainer = document.querySelector(`#${newWord.docEditorId}-document-container`);
          documentContainer.style.display = "block";

          // @JC 26/8/18: remove selet or create document message
          let createDocMsg = document.querySelector(`#${newWord.docEditorId}-create-doc-msg`);
          createDocMsg.style.display = 'none';

          // @JC 31/8/18: Remove any previous highlighted classes
          // NOTE: this logic is pretty much doing the same as the code below
          let docSelectorContainer = document.querySelector(`.${newWord.docEditorId}-doc-selector-container`);
          for(let i=0; i<docSelectorContainer.children.length; i++) {
          	let child = docSelectorContainer.children[ i ];
          	child.classList = [];
          }
          // Add highlighted class to the currently selected item
          ev.srcElement.className = `${newWord.docEditorId}-selected-document`;
        });

        // Append the document selector to the root element
        newWord.rootElement.append(docSelectorContainer);
      }

      // @JC 12/9/18: Highlight the newly created document
      // NOTE: this logic is pretty much doing the same as the code in selectd
      // click handler so refactor to one functon
      if( newWord.newlyCreatedDoc  ) {

        let docSelectorContainer = document.querySelector(`.${newWord.docEditorId}-doc-selector-container`);
        for(let i=0; i<docSelectorContainer.children.length; i++) {
          let child = docSelectorContainer.children[ i ];

          if( newWord.documentName === child.innerHTML ) {
            child.setAttribute('class', `${newWord.docEditorId}-selected-document`);
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
    let newDocumentLocalStorage = ( docName ) => {
      // debugger
      /**
       * Word processor tutorial: BEGIN
       * tutorial @ https://enlight.nyc/text-editor
       */
       // add new content to each dedicated editor
       // -
       if( !docName ) {
         let docName = newWord.docEditorContent;
       }

      let content = document.getElementById( newWord.docEditorContent );
      content.innerHTML = localStorage.getItem( `${newWord.docEditorId}-${docName}` ) || 'Just Write';
      newWord.newDocumentTimer = setInterval(() => {
        if( !newWord.documentName ) {
          return;
        }

        if( newWord.documentDeleted !== 1 ) {
          localStorage.setItem( `${newWord.docEditorId}-${newWord.documentName}`, document.getElementById( newWord.docEditorContent ).innerHTML);

          // @JC 12/9/18
          newWord.newlyCreatedDoc = 1;
        }
      }, 5);
      /* // Word processor tutorial: END */
    };

    /**
     * Change the theme of the editor
     */
    let theme = ( params ) => {
      if( params && params.themeColor === '' ) {
        return;
      }
      if( params && params.themeColor === 'dark' ) {
        let editor = document.getElementById( newWord.docEditorContent );
        editor.style.backgroundColor = '#383737';
        editor.style.color = '#fff';
        document.getElementById('body').style.backgroundColor = 'grey';
      }

      if( params && params.themeColor === 'camo' ) {
        let editor = document.getElementById( newWord.docEditorContent );
        // editor.style.backgroundColor = 'rgb(96, 117, 91)';
        editor.style.backgroundColor = '#748475';
        // document.getElementById('body').style.backgroundColor = '#dedede';
        document.getElementById('body').style.backgroundColor = 'rgb(96, 117, 91)';
        document.getElementById('body').style.color = '#dedede';
      }

      if( params && params.themeColor === 'homebrew' ) {
        // content editor
        let editor = document.getElementById( newWord.docEditorContent );
        editor.style.backgroundColor = 'black';
        editor.style.color = '#01ff01';
        editor.style.fontFamily = 'monospace';
        editor.style.fontSize = '18px';

        // document.getElementById('body').style.backgroundColor = '#dedede';
        document.getElementById('body').style.backgroundColor = '#272727';
        document.getElementById('body').style.color = '#dedede';

        // document list
        let themeDocList = document.getElementsByClassName(newWord.docEditorId+'-doc-selector-container')[0].children
        for(let i=0; i<themeDocList.length; i++) {
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
    let newDocument = () => {
      document.querySelector( `#${newWord.docEditorId}-create-document` ).addEventListener('click', (ev) => {
        //debugger
        // @JC 13/08/18: set flag so we can save documents after one has been deleted
        newWord.documentDeleted = 0;

        // console.log("clled newDocument");
        newWord.documentName = prompt("Name of document","");

        // @JC 10/08/18: clear the timer so we are not createing multuple timers
        clearInterval( newWord.timer );

        // @JC 10/08/18: addthe new docuemtn to localStorageItem
        newDocumentLocalStorage( newWord.documentName );

        // Display the text editor area
        let documentContainer = document.querySelector(`#${newWord.docEditorId}-document-container`);
        documentContainer.style.display = "block";

        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(() => {
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
    let deleteDocument = () => {
      document.querySelector(`#${newWord.docEditorId}-delete-document`).addEventListener('click', () => {
        // console.log('delete-document reached');

        localStorage.removeItem( `${newWord.docEditorId}-${newWord.documentName}` );
        document.getElementById( newWord.docEditorContent ).innerHTML = "No document selected";

        newWord.documentDeleted = 1;

        // JC: 7/4/19
        removeDocumentSelectContainer();

        getLocalStorageItems();

        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(() => {
          getLocalStorageItems();
          newWord.sortOrder = 1; // Sort alphabeticaly when we delete an item
          sortTheDocuments();
          selectDocument();
        }, 10);
      });
    };

    /**
     * Delete the currently selected document
     */
    let renameDocument = () => {
      document.querySelector(`#${newWord.docEditorId}-rename-document`).addEventListener('click', () => {

        debugger
        let docList = newWord.documentList;
        let newDocumentName;

        docList.forEach(element => {
          console.log('elemtn is: '+element);

          if(element === newWord.documentName) {
            console.log('We have selected the doucment: '+newWord.documentName);
            newWord.newDocumentName = window.prompt('Rename document');
          }
        });

        let a = localStorage.getItem( `${newWord.docEditorId}-${newWord.documentName}`);
        localStorage.setItem(`${newWord.docEditorId}-${newWord.newDocumentName}`, a );
        localStorage.removeItem( `${newWord.docEditorId}-${newWord.documentName}` );

        let renamedDocumentMessage = document.querySelector(`#${newWord.docEditorId}-rename-doc-msg`);
        renamedDocumentMessage.style.display = 'block';

        // JC 11/5/19: Set opacity so the css transition kicks-in
        window.setTimeout(()=> {
          renamedDocumentMessage.style.opacity = 0;
        }, 1000);

        // JC: 11/5/19: After doc has been renamed, remove element from the DOM and set the opacity ready for any more documents renamed
        window.setTimeout(()=> {
          renamedDocumentMessage.style.display = 'none';
          renamedDocumentMessage.style.opacity = 1;
        }, 3000);

        // JC 11/5/19: Display the "Create doc" message
        let createDocMsg = document.querySelector(`#${newWord.docEditorId}-create-doc-msg`);
        createDocMsg.style.display = 'block';

        // JC: 11/5/19: As no document selected after renaming a document, set to "No doc selected" message
        document.getElementById( newWord.docEditorContent ).innerHTML = "No document selected";

        newWord.documentDeleted = 1;

        // let content = document.getElementById( newWord.docEditorContent );
        // content.innerHTML = `--> Document renamed to ${newWord.newDocumentName} <-- <br><br> select document to continue editing`;

        // JC: 7/4/19
        removeDocumentSelectContainer();

        getLocalStorageItems();

        // newDocumentLocalStorage(newDocumentName);
        // @JC 10/08/18: update the document list a litle bit later so the newly added document is displayed
        setTimeout(() => {
          getLocalStorageItems();
          newWord.sortOrder = 1; // Sort alphabeticaly when we delete an item
          sortTheDocuments();
          selectDocument();
        }, 10);

      });
    };

    let sortDocList = () => {
        document.querySelector(`#${newWord.docEditorId}-sort-documents`).addEventListener('click', (ev) => {
          //newWord.sortOrder = 0;
          getLocalStorageItems( newWord.sortOrder );
          sortTheDocuments();
          selectDocument();
        });
    };

    /**
     * @JC 30/8/18:
     *
     * Get a reference to newword-wrapper.
     * The root element must have an ID attribute for things to work.
     */
    let getRootElement = () => {
      let rootEl = document.querySelector('#newword-wrapper');
      newWord.rootElement = rootEl;    
    };

   /**
    * Remove document select container  
    */
    let removeDocumentSelectContainer = () => {      
      let rootElId = document.getElementById(newWord.rootElement.id);
      let documentContainer = document.querySelector(`.${newWord.docEditorId}-doc-selector-container`);
      if (documentContainer) {
        rootElId.removeChild( documentContainer );
      }
    };

   /**
    * @param  {[type]} params [description]
    * @return {[type]}        [description]
    */
    let init = ( params ) => {

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
        renameDocument();
        sortDocList();

        console.log("Initialised app");
      };

      // Fire up the application
      init();

      /** ## PUBLIC API  ## **/
      return {
        // Allows user to change color of the application
        changeTheme: ( params ) => {
          theme( params );
        }
      }
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
