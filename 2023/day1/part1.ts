import * as fs from 'node:fs/promises';

async function main() {
  const fileStream = await fs.readFile(`${process.cwd()}/2023/day1/part1.txt`, {
    encoding: 'utf-8',
  });

  let sum = 0;

  const lines = fileStream.split('\n');
  for (const line of lines) {
    const strippedLine = line.replace(/[a-zA-Z]/g, '');
    if (strippedLine.length === 1) {
      sum += parseInt(`${strippedLine}${strippedLine}`);
    } else if (strippedLine.length > 1) {
      const firstDigit = parseInt(strippedLine[0]);
      const lastDigit = parseInt(strippedLine[strippedLine.length - 1]);
      sum += parseInt(`${firstDigit}${lastDigit}`);
    } else {
      // No digits so do nothing.
    }
  }

  console.log(sum);
}

try {
  main();
} catch (e) {
  console.error(e);
}
