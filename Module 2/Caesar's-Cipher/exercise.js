async function getBaconipsum() {
  // first build the API call string by starting with the URL
  let apiString = "https://baconipsum.com/api/";
  // next add the parameters to the string using the drop down lists
  let theNewParagraphs = document.getElementById("newParagraphs").value;
  // read type option (set by the buttons); default is 'meat'
  let typeOption = document.getElementById("typeOption") ? document.getElementById("typeOption").value : "meat";
  apiString = apiString + "?type=" + encodeURIComponent(typeOption) + "&paras=" + theNewParagraphs;
  // (removed alert for simplicity)

  // now make the API call to the web service using the string and store what is returned in response
  let response = await fetch(apiString);

  // clear previous output
  document.getElementById("myRawData").innerText = "";
  document.getElementById("myFormattedData").innerHTML = "";
  document.getElementById("myCipherData").innerHTML = "";

  let jsonData = await response.json();

  // show raw JSON
  document.getElementById("myRawData").innerText = JSON.stringify(jsonData);

  // build HTML for formatted and ciphered paragraphs in simple loops
  let shift = parseInt(document.getElementById("shiftAmount").value || "0", 10);
  let formattedHtml = "";
  let cipherHtml = "";
  for (let para of jsonData) {
    formattedHtml += "<p>" + para + "</p>";
    cipherHtml += "<p>" + caesarShift(para, shift) + "</p>";
  }
  document.getElementById("myFormattedData").innerHTML = formattedHtml;
  document.getElementById("myCipherData").innerHTML = cipherHtml;

  return true;
}

// Caesar cipher helper that preserves case and non-letter characters
function caesarShift(text, shift) {
  shift = ((shift % 26) + 26) % 26;
  let out = '';
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (code >= 65 && code <= 90) { // A-Z
      out += String.fromCharCode(((code - 65 + shift) % 26) + 65);
    } else if (code >= 97 && code <= 122) { // a-z
      out += String.fromCharCode(((code - 97 + shift) % 26) + 97);
    } else {
      out += text[i];
    }
  }
  return out;
}

// setType: called by the Meat / Meat & Filler buttons
// The dropdown (`#typeOption`) holds the selected type; user clicks Get to fetch.