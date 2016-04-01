"use strict"
// ==UserScript==
// @name        ProjectCompanion timedialog
// @namespace   projectcompanion.keyboardextensions
// @include     https://host5.projectcompanion.com/ProjectCompanion/application/time/DlgTime.asp*
// @version     1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       unsafeWindow
// ==/UserScript==

window.addEventListener("load", function(event) {
    
  var projectPicker = document.getElementById("nProjectID_picker");
  console.log("projectPicker", projectPicker);
  
  var billableTimeInput = document.getElementById("oBillableTimePlaceHolder").querySelector("input.timepicker-input");
  
  billableTimeInput.addEventListener("keydown", event => {
    console.log("billableTimeInput.keydown", event);
    if(event.code === "Enter" || event.code === "NumpadEnter") {
      var g_billTimePicker = unsafeWindow["g_billTimePicker"]; 
      var obj = g_billTimePicker.parseTime(billableTimeInput.value);
      console.log("billableTimeInput.enter", billableTimeInput, g_billTimePicker, obj);
      g_billTimePicker.setValue(obj.value, true);
     
      unsafeWindow["OnBnSaveAndClose"]();
    }
  })
  
  window.addEventListener("keydown", event => {
    if(event.code === "Escape") {
      window.close();
    }
  })
  
  if(projectPicker) {
    projectPicker.addEventListener("change", event => {
      console.log("change", projectPicker.value);
      GM_setValue("nProjectID_picker_lastValue", projectPicker.value);
    }, false);
    
    if(location.search.startsWith("?RecID=0&")) { // New time
      var projectPickerObserver = new MutationObserver(mutations => {
        console.log("projectPickerObserver");
        projectPicker.value = GM_getValue("nProjectID_picker_lastValue", projectPicker.value);
        unsafeWindow["g_projectCtrl"].onchange();
        console.log("g_projectCtrl.onchange"),unsafeWindow["g_projectCtrl"];      
      });
      projectPickerObserver.observe(projectPicker, { childList: true });
    }
    
    var billableTimeObserver = new MutationObserver(mutations => {
      console.log("billableTimeObserver");
      billableTimeInput.setSelectionRange(0, billableTimeInput.value.length);
      billableTimeInput.focus();
    });
    billableTimeObserver.observe(document.getElementById("prop_grid").querySelector("tbody.billable-time"), { attributes: true });
  }

  
  console.log("GM done");

}, false);
