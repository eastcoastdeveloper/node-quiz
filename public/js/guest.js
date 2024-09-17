import { createNotification, validateEmail } from "../modules/global-functions.js";

(() => {
  // GET DATA FROM API
  const ddMenu = document.querySelector(".selector");
  const caret = document.querySelector(".caret");
  const continueBtn = document.getElementById("continue");
  let userSelection = document.getElementById("user-selection");
  let menuValue = [];
  let menuSelection;

  // MENU TOGGLE LISTENER
  ddMenu.addEventListener("click", ddClickHandler);
  continueBtn.addEventListener("click", beginQuiz);

  // DROPDOWN MENU CLICK HANDLER
  function ddClickHandler() {
    const children = Array.from(ddMenu.parentElement.children);
    if (children.length === 1) {
      const menu = document.createElement("div");
      menu.classList.add("menu-values");
      for (var i = 0; i < menuValue.length; i++) {
        const item = document.createElement("div");
        item.innerText = menuValue[i].value;
        item.classList.add("item");
        menu.appendChild(item);
        setMenuListeners(item);
      }
      ddMenu.parentElement.append(menu);
    } else {
      const items = Array.from(children[1].children);
      removeMenuListeners(items);
      closeMenu(children);
    }
    caret.classList.toggle("rotate-caret");
  }

  // SET MENU LISTENERS
  function setMenuListeners(elem) {
    elem.addEventListener("click", menuItemHandler);
  }

  // REMOVE MENU LISTENERS
  function removeMenuListeners(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeEventListener("click", menuItemHandler);
    }
  }

  // DROPDOWN MENU HANDLER
  function menuItemHandler(e) {
    userSelection.innerText = e.target.innerText;
    menuSelection = userSelection.innerText;
    ddClickHandler();
  }

  // CLOSE MENU/ REMOVE FROM DOM
  function closeMenu(arr) {
    arr[1].remove();
  }

  // CONTINUE
  function beginQuiz() {
    if (menuSelection) {
      const notification = document.querySelector(".notification-wrapper");
      notification ? document.querySelector("main").removeChild(notification) : "";

      const emailInput = document.getElementById("emailInput");
      const emailFormat = validateEmail(emailInput.value);
      if (emailFormat) {
        guestUserInitialization(emailInput.value);
        emailInput.value = "";
      } else {
        createNotification("Please enter a valid email.");
      }
    } else {
      createNotification("Please select a topic.");
    }
  }

  // POST MENU SELECTION & EMAIL
  async function guestUserInitialization(emailValue) {
    await fetch(`http://localhost:8081/guest/create-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: menuSelection, email: emailValue }),
      cache: "default",
    })
      .then((response) => {
        response.ok ? window.location.assign("/guest/quiz") : createNotification("Something went wrong on our end.");
      })
      .catch((err) => {
        console.error("There was a problem with the Fetch operation:", error);
      });
  }

  // POPULATE DROP DOWN MENU
  async function getMenuItems() {
    await fetch(`http://localhost:8081/guest/populateMenu`)
      .then((data) => {
        return data.json();
      })
      .then((arr) => {
        menuValue = arr;
        return menuValue;
      })
      .catch((err) => {
        console.error("There was a problem with the Fetch operation:", error);
      });
  }

  getMenuItems();
})();
