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

  // VALIDATE EMAIL
  function validateEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  // CONTINUE
  function beginQuiz() {
    if (menuSelection) {
      const emailInput = document.getElementById("emailInput");
      const emailFormat = validateEmail(emailInput.value);
      const wrapper = document.querySelector(".wrapper");
      if (emailFormat) {
        wrapper.classList.add("wrapper-fade");
        setTimeout(() => {
          postWelcomeDetails(emailInput.value);
          emailInput.value = "";
        }, 250);
      } else {
        // ERROR
      }
    }
  }

  // POST TOPIC & EMAIL
  async function postWelcomeDetails(emailValue) {
    await fetch(`http://localhost:8081/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: menuSelection, email: emailValue }),
      cache: "default",
    }).then(() => {
      window.location.assign("/quiz");
    });
  }

  // POPULATE DROP DOWN MENU
  async function getMenuItems() {
    await fetch(`http://localhost:8081/getMenuItems`)
      .then((data) => {
        return data.json();
      })
      .then((arr) => {
        menuValue = arr;
        return menuValue;
      });
  }

  getMenuItems();
})();
