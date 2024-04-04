document.addEventListener("DOMContentLoaded", () => {
  const getSpitedValue = () => {
    const para = document.querySelector(".logo > p");
    let list = para.innerText;
    language = list.split(" ");
    console.log(language);
    return language[0].toLowerCase();
  };

  /** change the language for editor */
  const setEditor = () => {
    editor.setTheme("ace/theme/dracula");
    const langaugeName = getSpitedValue();

    switch (langaugeName) {
      case "c":
        editor.session.setMode("ace/mode/c_cpp");
        editor.setValue(`// Write Your ${langaugeName} Program Here!`, -1);

        break;
      case "cpp":
        editor.session.setMode("ace/mode/c_cpp");
        editor.setValue(`// Write Your ${langaugeName} Program Here!`, -1);

        break;
      case "java":
        editor.session.setMode("ace/mode/java");
        editor.setValue(`// Write Your ${langaugeName} Program Here!`, -1);

        break;
      case "ruby":
        editor.session.setMode("ace/mode/ruby");
        editor.setValue(`# Write Your ${langaugeName} Program Here!`, -1);

        break;
      case "python":
        editor.session.setMode("ace/mode/python");
        editor.setValue(`# Write Your ${langaugeName} Program Here!`, -1);

        break;
      default:
        console.log("None of the above");
        break;
    }

    editor.getSession().setUseWrapMode(true);
  };

  const setOutputEditor = () => {
    output.setTheme("ace/theme/terminal");
    // output.session.setMode("ace/mode/plain-text");
    output.renderer.setOption("showGutter", false);
    output.getSession().setUseWrapMode(true);
    output.setReadOnly(true);
  };

  const setInputEditor = () => {
    input.setTheme("ace/theme/xcode");
    // input.session.setMode("ace/mode/plain-text");
    input.getSession().setUseWrapMode(true);
  };

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

  const clearInputAndOutput = (input, output) => {
    input.setValue("");
    output.setValue("");
  };

  const runCode = async (editor, language, output, input) => {
    const code = editor.getValue() || "";
    const inputValue = input.getValue() || "";

    const data = {
      code: code,
      language: language,
      input: inputValue,
    };
    const response = await fetch("/api/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    const someValue = "notheing";
    const getOutput = await response.json();
    console.log(typeof getOutput.output);
    console.log(someValue);
    output.setValue(getOutput.output);
  };

  const saveCode = async () => {};
  ////////////////////////////////////////
  const selectElementDesktop = document.querySelector(
    ".theme-dropdown-desktop"
  );
  const selectElement = document.querySelector(".theme-dropdown");
  const saveButton = document.querySelector(".save");
  const runButton = document.querySelector(".run");
  const clearButton = document.querySelector(".clear");

  const saveMButton = document.querySelector(".m-save");
  const runMButton = document.querySelector(".m-run");
  const clearMButton = document.querySelector(".m-clear");

  const loginButton = document.querySelector(".login");
  const signUpButton = document.querySelector(".signup");

  const editor = ace.edit("editor");
  const output = ace.edit("output");
  const input = ace.edit("input-editor");

  writeOptions(selectElementDesktop);
  writeOptions(selectElement);

  setEditor();
  setOutputEditor();
  setInputEditor();

  /** Event Listener */
  selectElementDesktop.addEventListener("change", (e) => {
    const selectedOptionValue = e.target.value.toLowerCase();
    editor.setTheme(`ace/theme/${selectedOptionValue}`);
  });

  selectElement.addEventListener("change", (e) => {
    const selectedOptionValue = e.target.value.toLowerCase();
    editor.setTheme(`ace/theme/${selectedOptionValue}`);
  });

  /** This section for navbar buttons */
  clearButton.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(e.target);
    clearInputAndOutput(input, output);
  });
  clearMButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
    clearInputAndOutput(input, output);
  });

  runButton.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.target);

    runCode(editor, getSpitedValue(), output, input);
  });
  runMButton.addEventListener("click", (e) => {
    e.preventDefault();

    runCode(editor, getSpitedValue(), output, input);
  });

  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
  });
  saveMButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
  });
});
// export { editor };
