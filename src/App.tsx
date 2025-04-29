import { Box } from "welcome-ui/Box";
import "./App.css";
import { ResponsiveImage } from "./ResponsiveImage";
import image from "./assets/test/image.jpg";
import image400 from "./assets/image-400.png";
import image800 from "./assets/image-800.png";
import image1200 from "./assets/image-1200.png";

function App() {
  return (
    <>
      <Box
        as="img"
        src={image400}
        srcSet={`${image400} 400w, ${image800} 800w, ${image1200} 1200w`}
        sizes="100vw"
      />

      <ResponsiveImage src={image} width={1600} />
    </>
  );
}

export default App;
