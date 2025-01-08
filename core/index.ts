#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { Jimp, rgbaToInt } from 'jimp';

class Gradify {
  public static async generateIcon(options: {
    width: number;
    height: number;
    targetDirectory: string | undefined;
  }) {
    const topLeft = Gradify.generateRandomColor();
    const topRight = Gradify.generateRandomColor();
    const bottomLeft = Gradify.generateRandomColor();
    const bottomRight = Gradify.generateRandomColor();
  
    const image = new Jimp({
      width: options.width,
      height: options.height,
    });
  
    for (let y = 0; y < options.height; y++) {
      for (let x = 0; x < options.width; x++) {
        const fx = x / (options.width - 1);
        const fy = y / (options.height - 1);
  
        const r = Gradify.bilinearInterpolate(topLeft[0], topRight[0], bottomLeft[0], bottomRight[0], fx, fy);
        const g = Gradify.bilinearInterpolate(topLeft[1], topRight[1], bottomLeft[1], bottomRight[1], fx, fy);
        const b = Gradify.bilinearInterpolate(topLeft[2], topRight[2], bottomLeft[2], bottomRight[2], fx, fy);
  
        image.setPixelColor(rgbaToInt(r, g, b, 255), x, y);
      }
    }
  
    if (options.targetDirectory !== undefined) {
      if (!fs.existsSync(options.targetDirectory)) {
        fs.mkdirSync(options.targetDirectory, {recursive: true});
      }
    
      const outputPath = path.join(options.targetDirectory, 'gradient-icon');
    
      await image.write(`${outputPath}.png`);
    
      console.log(`Gradient icon saved to: ${outputPath}.png`);
    }

    return image;
  }

  private static generateRandomColor() {
    return [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
  }

  private static bilinearInterpolate(
    topLeft: number, 
    topRight: number, 
    bottomLeft: number, 
    bottomRight: number, 
    fx: number, 
    fy: number
  ) {
    const top = topLeft + Math.round((topRight - topLeft) * fx);
    const bottom = bottomLeft + Math.round((bottomRight - bottomLeft) * fx);
    return top + Math.round((bottom - top) * fy);
  }
}

if (require.main === module) {
  yargs(hideBin(process.argv))
    .command(
      'generate icon',
      'Generate a gradient icon with random colors',
      (yargs) => {
        return yargs
          .option('width', {
            alias: 'w',
            type: 'number',
            description: 'Width of the gradient icon',
            default: 512,
          })
          .option('height', {
            alias: 'h',
            type: 'number',
            description: 'Height of the gradient icon',
            default: 512,
          })
          .option('target', {
            alias: 't',
            type: 'string',
            description: 'Target directory to save the icon',
            default: './',
          });
      },
      (argv) => {
        Gradify.generateIcon({
          width: argv.width,
          height: argv.height,
          targetDirectory: argv.target,
        }).catch(console.error);
      }
    )
    .help()
    .parse();
}

export default Gradify;