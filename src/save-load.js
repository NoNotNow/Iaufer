// Save and load functionality for code
export function saveCode() {
  const textbox = document.getElementById("code");
  const code = textbox.value;
  
  // Save to cookie with 30 day expiration
  const expires = new Date();
  expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
  document.cookie = `savedCode=${encodeURIComponent(code)}; expires=${expires.toUTCString()}; path=/`;
  
  console.log("Code saved to cookies");
}

export function loadCode() {
  // Read from cookies
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'savedCode') {
      const textbox = document.getElementById("code");
      if (textbox) {
        textbox.value = decodeURIComponent(value);
        console.log("Code loaded from cookies");
      }
      return;
    }
  }
  console.log("No saved code found");
}