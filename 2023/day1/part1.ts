import * as fs from 'node:fs/promises';

const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

async function main() {
  const dir = `${process.cwd()}/2023/day1/part2.txt`;
  const fileStream = await fs.readFile(dir, 'utf-8');
  let sum = 0;

  const lines = fileStream.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const digits = [];
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const currentWord = line.slice(j);
      const char = line[j];

      if (parseFloat(char)) {
        // This means it is a number. If if wasn't we would get NaN.
        digits.push(parseFloat(char));
      }
      for (const key in numberMap) {
        if (currentWord.startsWith(key)) {
          digits.push(numberMap[key]);
        }
      }
    }

    if (digits.length === 1) {
      sum += parseInt(`${digits[0]}${digits[0]}`);
    } else {
      const first = digits[0];
      const last = digits[digits.length - 1];
      sum += parseInt(`${first}${last}`);
    }
  }

  console.log(sum);
}

try {
  main();
} catch (e) {
  console.error(e);
}
