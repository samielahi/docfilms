import {
  createCanvas,
  Image,
  ImageData,
  Canvas,
  CanvasRenderingContext2D,
} from "canvas";

export const ditherer = (() => {
  // RGB values for black and white in our tailwind config
  const BLACK = new Uint8ClampedArray([26, 26, 25, 255]);
  const WHITE = new Uint8ClampedArray([255, 255, 241, 255]);
  // 4x4 Bayer Matrix
  const THRESHOLD_MAP = [
    [0.0 / 16.0, 12.0 / 16.0, 2.0 / 16.0, 10.0 / 16.0],
    [12.0 / 16.0, 4.0 / 16.0, 14.0 / 16.0, 6.0 / 16.0],
    [3.0 / 16.0, 11.0 / 16.0, 1.0 / 16.0, 9.0 / 16.0],
    [15.0 / 16.0, 7.0 / 16.0, 13.0 / 16.0, 5.0 / 16.0],
  ];

  let CANVAS: Canvas;
  let CTX: CanvasRenderingContext2D;

  async function getImageData(url: string) {
    const image = await new Promise<Image>((resolve, reject) => {
      const nodeImage: Image = new Image();
      nodeImage.onload = () => resolve(nodeImage);
      nodeImage.onerror = (err: Error) => reject(err);
      nodeImage.src = url;
    });

    const [w, h] = [image.width, image.height];
    CANVAS = createCanvas(w, h);
    CTX = CANVAS.getContext("2d");
    CTX.drawImage(image, 0, 0);

    return CTX.getImageData(0, 0, w, h);
  }

  function sRGBtoLin(colorChannel: number) {
    // Send this function a decimal sRGB gamma encoded color value
    // between 0.0 and 1.0, and it returns a linearized value.
    if (colorChannel <= 0.04045) {
      return colorChannel / 12.92;
    }

    return Math.pow((colorChannel + 0.055) / 1.055, 2.4);
  }

  function rgbToY(r: number, g: number, b: number) {
    const Y =
      0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
    return Y;
  }

  function createLuminanceMatrix(image: ImageData) {
    const imageData = image.data;
    const luminanceMatrix = new Float32Array(imageData.length / 4);

    let j = 0;
    for (let i = 0; i < luminanceMatrix.length; i++) {
      const Y = rgbToY(
        imageData[j]! / 255.0,
        imageData[j + 1]! / 255.0,
        imageData[j + 2]! / 255.0
      );
      luminanceMatrix[i] = Y;
      j += 4;
    }

    return luminanceMatrix;
  }

  function applyBayerThresholdMap(
    imageLuminance: Float32Array,
    width: number,
    height: number
  ) {
    const grayscaleLuminance = new Uint8Array(imageLuminance.length);

    let tx = 0;
    let ty = 0;

    // Advance rows
    for (let currentRow = 0; currentRow < height; currentRow++) {
      tx = currentRow % 4;
      // Apply transformation to one row of the image
      for (let i = width * currentRow; i < width * (currentRow + 1); i++) {
        grayscaleLuminance[i] =
          imageLuminance[i]! > 1 - THRESHOLD_MAP[tx]![ty]! ? 1 : 0;
        ty = (ty + 1) % 4;
      }
    }
    return grayscaleLuminance;
  }

  function createDitheredImage(imageLuminance: Uint8Array) {
    const ditheredImage = new Uint8ClampedArray(imageLuminance.length * 4);

    for (let i = 0; i < imageLuminance.length; i++) {
      if (imageLuminance[i]) {
        ditheredImage.set(WHITE, i * 4);
      } else {
        ditheredImage.set(BLACK, i * 4);
      }
    }

    return ditheredImage;
  }

  function getDataURL(imageData: ImageData): string {
    CTX.putImageData(imageData, 0, 0);
    return CANVAS.toDataURL("image/png");
  }

  async function dither(url: string) {
    const image = await getImageData(url);
    const imageLuminance = createLuminanceMatrix(image);
    const grayscaleLuminance = applyBayerThresholdMap(
      imageLuminance,
      image.width,
      image.height
    );
    const data = createDitheredImage(grayscaleLuminance);
    const ditheredImageData = new ImageData(data, image.width, image.height);
    return getDataURL(ditheredImageData);
  }

  return { dither };
})();
