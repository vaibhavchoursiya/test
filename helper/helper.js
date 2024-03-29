const getExt = (languageName) => {
  //--------- language ext
  const langaugesExt = {
    c: ".c",
    cpp: ".cpp",
    java: ".java",
    python: ".py",
    ruby: ".rb",
    // ruby extention dont know;
  };

  return langaugesExt[languageName.toLowerCase()];
  // language ext-------------
};

module.exports = { getExt };
