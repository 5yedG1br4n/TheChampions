import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const endorsementInputEl = document.getElementById("endorsement-input");
const publishBtn = document.getElementById("publish-btn");
const endorsementListEl = document.getElementById("endorsement-list");

const appSettings = {
  databaseURL:
    "https://thechampions-f9e19-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "Endorsements");

publishBtn.addEventListener("click", function () {
  let inputValue = endorsementInputEl.value;
  //   renderEndorsements(inputValue);
  push(endorsementsInDB, inputValue);
  clearInputFied();
});

onValue(endorsementsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());

    clearEndorsementListEl();

    for (let i = 0; i < endorsementsArray.length; i++) {
      let currentObject = endorsementsArray[i];
      let currentEndorsementKeys = currentObject[0];
      let currentEndorsementValues = currentObject[1];
      renderEndorsementsFromDB(currentObject);
    }
  } else {
    endorsementListEl.innerHTML = "There are no endorsements yet...";
  }
});

function renderEndorsementsFromDB(item) {
  let itemKey = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationInDB = ref(database, `Endorsements/${itemKey}`);
    remove(exactLocationInDB);
  });

  endorsementListEl.prepend(newEl);
}

function clearInputFied() {
  endorsementInputEl.value = "";
}

function clearEndorsementListEl() {
  endorsementListEl.innerHTML = "";
}
