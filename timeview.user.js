// ==UserScript==
// @name        ProjectCompanion timeview
// @namespace   projectcompanion.keyboardextensions
// @include     https://host*.projectcompanion.com/ProjectCompanion/application/time/timeview.asp*
// @version     1
// @grant       none
// ==/UserScript==

window.addEventListener("keydown", function(event) {
  
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }
  
  console.log("keydown", event);
  
  switch (event.code) {
    case "KeyW":
      if(!event.altKey && !event.ctrlKey && !event.shiftKey) {
        console.log("KeyW", OnBnNew);
        OnBnNew(); 
        event.preventDefault();
      }
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
}, true);
