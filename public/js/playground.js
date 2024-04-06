document.addEventListener("DOMContentLoaded", () => {
  let getOC_LT = "";
  getOC_LT = localStorage.getItem("oc_lt");

  const getCurrentUser = async (getOC_LT) => {
    const adminSection = document.querySelector(".admin-section");
    const currentUserSection = document.querySelector(".currentuser-section");
    const userName = document.querySelector(".username");

    adminSection.classList.remove("no-display");
    currentUserSection.classList.add("no-display");

    try {
      if (getOC_LT) {
        const response = await fetch("/auth/user/currentuser", {
          method: "POST",
          headers: {
            authorization: `Bearer ${getOC_LT}`,
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({}),
        });
        const currentUser = await response.json();
        console.log(currentUser);
        if (currentUser) {
          adminSection.classList.add("no-display");
          currentUserSection.classList.remove("no-display");
          userName.innerText += currentUser.user.username;
        }
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  };
  getCurrentUser(getOC_LT);

  const writeOptions = (selectElement) => {
    const themeData = [
      "dracula",
      "merbivore",
      "tomorrow",
      "xcode",
      "terminal",
      "cobalt",
    ];

    themeData.forEach((element) => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", element);
      optionElement.innerText = element;
      selectElement.appendChild(optionElement);
    });
  };

  const changeTab = (editorId) => {
    const editors = document.querySelectorAll(".editor-section");
    editors.forEach((element) => {
      element.classList.remove("current-editor");
    });
    const currentEditor = document.querySelector(`.${editorId}`);
    currentEditor.classList.add("current-editor");
  };

  const setThemeAndLanguage = (html, css, js) => {
    html.setTheme("ace/theme/dracula");
    css.setTheme("ace/theme/dracula");
    js.setTheme("ace/theme/dracula");

    html.session.setMode("ace/mode/html");
    css.session.setMode("ace/mode/css");
    js.session.setMode("ace/mode/javascript");
  };

  ////////////////////////////////////////

  const selectElement = document.querySelector(".theme-dropdown");

  const logoutButton = document.querySelector(".logout");

  const htmlEditor = ace.edit("editor-html");
  const cssEditor = ace.edit("editor-css");
  const jsEditor = ace.edit("editor-js");

  const htmlTab = document.querySelector("#html-tab");
  const cssTab = document.querySelector("#css-tab");
  const jsTab = document.querySelector("#js-tab");

  const iframe = document.querySelector(".output-window");

  setThemeAndLanguage(htmlEditor, cssEditor, jsEditor);

  htmlTab.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.getAttribute("value"));

    cssTab.classList.remove("selectedTab");
    jsTab.classList.remove("selectedTab");

    e.target.classList.add("selectedTab");
    changeTab(e.target.getAttribute("value"));
  });

  cssTab.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(e.target);
    console.log(e.target.getAttribute("value"));

    htmlTab.classList.remove("selectedTab");
    jsTab.classList.remove("selectedTab");

    e.target.classList.add("selectedTab");
    changeTab(e.target.getAttribute("value"));
  });

  jsTab.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(e.target);
    console.log(e.target.getAttribute("value"));

    htmlTab.classList.remove("selectedTab");
    cssTab.classList.remove("selectedTab");

    e.target.classList.add("selectedTab");
    changeTab(e.target.getAttribute("value"));
  });

  writeOptions(selectElement);

  selectElement.addEventListener("change", (e) => {
    const selectedOptionValue = e.target.value.toLowerCase();
    htmlEditor.setTheme(`ace/theme/${selectedOptionValue}`);
    cssEditor.setTheme(`ace/theme/${selectedOptionValue}`);
    jsEditor.setTheme(`ace/theme/${selectedOptionValue}`);
  });

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    // Clear all data stored in localStorage
    localStorage.removeItem("oc_lt");
    // Refresh the window
    window.location.reload();
  });

  //** ******************* When changed Happend in Editor *************** */
  const setIframeDocument = (htmlContent, cssContent, jsContent) => {
    try {
      const htmlCode = `${htmlContent ? htmlContent : ""}`;
      const cssCode = `${cssContent ? cssContent : ""}`;
      const jsCode = `${jsContent ? jsContent : ""}`;
      console.log(htmlCode);
      console.log(cssCode);
      console.log(jsCode);
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;
      iframeDocument.body.innerHTML =
        htmlCode + "<style>" + cssCode + "</style>";

      iframe.contentWindow.eval(jsCode);
    } catch (e) {
      console.log(e);
    }
  };
  /** Update the iframe body with html css and javascirpt */
  const updateIframe = () => {
    const htmlContent = htmlEditor.getValue();
    const cssContent = cssEditor.getValue();
    const jsContent = jsEditor.getValue();
    setIframeDocument(htmlContent, cssContent, jsContent);
  };

  htmlEditor.session.on("change", function (delta) {
    updateIframe();
  });
  cssEditor.session.on("change", function (delta) {
    updateIframe();
  });
  jsEditor.session.on("change", function (delta) {
    updateIframe();
  });
});
// export { editor };
