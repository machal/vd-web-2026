import { convertAllImages } from '../vite-plugin-prirucka-images.ts';

convertAllImages().catch((e) => {
  console.error(e);
  process.exit(1);
});
