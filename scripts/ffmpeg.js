import { exec } from "child_process";
import fs from "fs";

//Test to see if the command works
// exec("echo 'child process exec'", (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
// });

// commands flags
// -i input file
// -vf video filter
// -vf scale=600:-1 scale to 600px width, height auto

// command to convert format, but there is form of optimization
// ffmpeg -i src/assets/image.png src/assets/image.jpg

// command to rescale image
// ffmpeg -i src/assets/image.png -vf scale=600:-1 src/assets/image-600w.png

// Base ffmpeg command to see if it works
// exec("ffmpeg -version", (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   if (stderr) {
//     console.log(`stderr: ${stderr}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
// });

// Get command line arguments, starting from the third element (index 2)
const args = process.argv.slice(2);

// Check arguments length
if (args.length < 2) {
  console.error("Please provide the input file path and the base image size.");
  process.exit(1);
}

const [inputFilePath, baseImageSize] = args;
console.log(`Input file path: ${inputFilePath}`);
console.log(`Base image size: ${baseImageSize}`);

// Check if the input file exists
if (!fs.existsSync(inputFilePath)) {
  console.error(`Input file does not exist: ${inputFilePath}`);
  process.exit(1);
}
// Check if the base image size is a positive number
if (isNaN(baseImageSize) && baseImageSize <= 0) {
  console.error(`Base image size is not a positive number: ${baseImageSize}`);
  process.exit(1);
}

const outputFilePath = inputFilePath.split("/").slice(0, -1).join("/");
const fileName = inputFilePath.split("/").pop();
const fileNameWithoutExt = fileName.split(".").slice(0, -1).join(".");
// TODOShould we support avif? Should we use the Picture approach?
const outputExtensions = ["jpg", "webp"];
const outputSizeMultipliers = [0.25, 0.5, 0.75, 1];

const outputFinalSizes = outputSizeMultipliers.map((multiplier) =>
  Math.floor(baseImageSize * multiplier)
);

// Create a base .jpg file
const outputFile = `${outputFilePath}/${fileNameWithoutExt}.jpg`;
const command = `ffmpeg -i ${inputFilePath} ${outputFile}`;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

for (const outputExtension of outputExtensions) {
  for (const outputFinalSize of outputFinalSizes) {
    const outputFile = `${outputFilePath}/${fileNameWithoutExt}-${outputFinalSize}w.${outputExtension}`;
    const command = `ffmpeg -i ${inputFilePath} -vf scale=${outputFinalSize}:-1 ${outputFile}`;
    console.log(`Executing command: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
}
