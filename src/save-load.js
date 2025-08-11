// Save and load functionality for code persistence

export function saveCode() {
  console.log("saveCode() function called");
  
  const textbox = document.getElementById("code");
  console.log("Textbox element:", textbox);
  
  if (textbox) {
    const code = textbox.value;
    console.log("Code to save:", code);
    
    if (code.trim()) {
      localStorage.setItem("savedCode", code);
      console.log("Code saved to localStorage");
      alert("Code saved successfully!");
    } else {
      console.log("No code to save (empty textbox)");
      alert("No code to save!");
    }
  } else {
    console.error("Could not find textbox element with id 'code'");
  }
}

export function loadCode() {
  console.log("loadCode() function called");
  
  const savedCode = localStorage.getItem("savedCode");
  console.log("Saved code from localStorage:", savedCode);
  
  if (savedCode) {
    const textbox = document.getElementById("code");
    console.log("Textbox element for loading:", textbox);
    
    if (textbox) {
      textbox.value = savedCode;
      console.log("Code loaded into textbox:", savedCode);
      alert("Code loaded successfully!");
    } else {
      console.error("Could not find textbox element with id 'code'");
    }
  } else {
    console.log("No saved code found in localStorage");
  }
}