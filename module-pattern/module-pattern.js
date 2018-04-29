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
      newDiv.innerHTML += '<div id="' + newWord.docEditorId+ '-toolbar"></div><div id="' + newWord.docEditorId +  '" contenteditable="true"></div>';

      // Add the newWord html just before the closing body tag
      var currentDiv = document.getElementById("body");
      document.body.appendChild(newDiv, currentDiv);

      createToolbarButtons();
    };

    /**
     * @TODO
     * - high priority: add some more buttons.
     * - low priority: enable the implementation to enable / disable buttons.
     */
    var createToolbarButtons = function() {

      // var commands = [{
      //   "name": "underline",
      // 	"cmd": "underline",
      // 	"val": "...",
      // 	"desc": "...)"
      //   },
      //   {
      //     "name": "bold",
      //   	"cmd": "bold",
      //   	"icon": "bold",
      //   	"desc": "Toggles bold on/off for the selection or at the insertion point. (Internet Explorer uses the STRONG tag instead of B.)"
      // }];

      var buttons = "";
      for(i=0; i<commands.length; i++) {
        console.log(commands[i]);
        var command = commands[i];
        buttons += `<button id="${command.cmd}-${newWord.docEditorId}-toolbar" class="toolbar-buttons" name="${command.cmd}" title="${command.title}" value="${command.value}" data-enableprompt="${command.enableprompt}">${command.name}</button>`;
      }

debugger

      var editor = document.getElementById( newWord.docEditorId+'-toolbar' );
      editor.innerHTML += buttons;

    };

    var saveToLocalStorage = function() {
// debugger
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

      var toolbar = document.getElementById( newWord.docEditorId+'-toolbar' );

      // See readme: Get child elements (buttons) in the toolbar
      for(var i=0; i<toolbar.children.length; i++) {
        // debugger
        toolbar.children[i].addEventListener('click', function(ev) {
          debugger
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
//var doc2 = newWord.init('blah');
