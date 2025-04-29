//ResponsiveImage

import { useTheme } from "@xstyled/styled-components";

import { Box, BoxProps } from "welcome-ui/Box";

type ResponsiveImageProps = {
  src: string;
  width: number;
  alt?: string;
} & BoxProps;

const getSrcSet = (imageUrl: string, widths: Record<string, number>) => {
  const [filename, extension] = imageUrl.split(".");
  const set = Object.values(widths).map(
    (size) => `${filename}-${size}w.${extension} ${size}w`
  );
  set.push(`${imageUrl} 2x`);

  return set.join(", ");
};

const getSizes = (
  widths: Record<string, number>,
  breakpoints: Record<string, number>
) => {
  const breakpointsArray = Object.values(breakpoints).sort();
  const widthsArray = Object.values(widths).sort();
  const sizes = widthsArray.map(
    (width, index) => `(max-width: ${breakpointsArray[index]}px) ${width}px`
  );
  return sizes.join(", ");
};

export const ResponsiveImage = ({
  src,
  width,
  ...rest
}: ResponsiveImageProps) => {
  const { screens } = useTheme();

  // Witdh in 25% 50% 75% 100%
  const widths = {
    25: Math.floor(width / 4),
    50: Math.floor(width / 2),
    75: Math.floor((width / 4) * 3),
    100: width,
  };
  // Image url with size prefix
  const srcSet = getSrcSet(src, widths);

  // sizes for all 4 prefixes
  const sizes = getSizes(widths, screens);

  console.debug("debbie ", { widths, srcSet, sizes });

  return <Box as="img" sizes={sizes} src={src} srcSet={srcSet} {...rest} />;
};
