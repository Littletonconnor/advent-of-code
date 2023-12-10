import * as fs from 'node:fs/promises';

function isDigit(n: string) {
  return /^\d$/.test(n);
}

async function main() {
  const dir = `${process.cwd()}/2023/day3`;
  const file = await fs.readFile(`${dir}/part1.txt`, 'utf8');
  const lines = file.split('\n');
  const n = lines.length;
  const m = lines[0].length; // all columns have same length

  function isSymbol(i: number, j: number) {
    if (!(0 <= i && i < n && 0 <= j && j < m)) {
      // We have hit a bounds edge case
      return false;
    }

    return lines[i][j] !== '.' && !isDigit(lines[i][j]);
  }

  let ans = 0;

  for (let i = 0; i < n; i++) {
    const line = lines[i];
    let j = 0;

    while (j < m) {
      let start = j;
      let num = '';

      // capture the entire number here
      while (j < m && isDigit(line[j])) {
        num += line[j];
        j += 1;
      }

      // if we didn't capture anything just move on.
      if (num === '') {
        j += 1;
        continue;
      }

      const parsedNum = parseInt(num);

      // Check characters before and after the number (on the same line)
      if (isSymbol(i, start - 1) || isSymbol(i, j)) {
        ans += parsedNum;
        continue;
      }

      for (let k = start - 1; k < j + 1; k++) {
        if (isSymbol(i - 1, k) || isSymbol(i + 1, k)) {
          ans += parsedNum;
          break;
        }
      }
    }
  }

  console.log(ans);
}

try {
  main();
} catch (e) {
  console.error(e);
}
