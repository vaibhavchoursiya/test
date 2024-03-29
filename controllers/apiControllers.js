const path = require("path");
const fsPromises = require("fs").promises;
const { getExt } = require(path.join(__dirname, "..", "helper", "helper.js"));

const { spawn } = require("child_process");

const writeCodefile = async (code, langauge) => {
  const ext = getExt(langauge);
  const randomFileName = Math.floor(Math.random() * 99999 + 1);
  const fileName = `${randomFileName}${ext}`;
  await fsPromises.writeFile(
    path.join(__dirname, "..", "tempfiles", fileName),
    code
  );
  return fileName;
};

const executeCode = (code, langauge) => {
  const scriptPath = writeCodefile(code, langauge);
  return "hello world";
};

const getCode = (req, res) => {
  const { code, language } = req.body;
  console.log(code, language);

  const output = executeCode(code, language);
  console.log(`this is output:${output}`);
  /** Execute Code Function */
  res.json({
    output: output,
  });
};

module.exports = { getCode };
