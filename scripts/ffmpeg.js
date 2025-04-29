import { exec } from "child_process";

exec("echo 'child process exec'", (error, stdout, stderr) => {
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

// commands flags
// -i input file
// -vf video filter
// -vf scale=600:-1 scale to 600px width, height auto

// command to convert format, but there is form of optimization
// ffmpeg -i src/assets/image.png src/assets/image.jpg

// command to rescale image
// ffmpeg -i src/assets/image.png -vf scale=600:-1 src/assets/image-600w.png

exec("ffmpeg -version", (error, stdout, stderr) => {
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
