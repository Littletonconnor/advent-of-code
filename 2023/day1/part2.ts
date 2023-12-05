import * as fs from 'node:fs/promises';

const wordToNumberMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    };

async function main() {
    // TODO: Not Finished.
  const fileStream = await fs.readFile(`${process.cwd()}/2023/day1/part2.txt`, {
    encoding: 'utf-8',
  });

  let sum = 0;

  const lines = fileStream.split('\n');
  for (const line of lines) {
    let word = '';
    let count = 0;
    let found = 0;
    let seen = {}

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (/[a-zA-Z]/.test(char)) {
            if (wordToNumberMap[line.slice(i, i + 4)]) {
                seen[char] = true;
                count += wordToNumberMap[char];
            }
        } else if (/[0-9]/.test(char)) {
            count +=
        }
      console.log('i: ', line[i]);
    }
  }
}

try {
  main();
} catch (e) {
  console.error(e);
}
