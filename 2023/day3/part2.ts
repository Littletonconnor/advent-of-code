import * as fs from 'node:fs/promises';

function isDigit(n: string) {
  return /^\d$/.test(n);
}

function createGrid(n: number, m: number) {
  return Array.from({ length: n }, () => Array.from({ length: m }, () => []));
}

async function main() {
  const dir = `${process.cwd()}/2023/day3`;
  const file = await fs.readFile(`${dir}/part2.txt`, 'utf8');
  const lines = file.split('\n');
  const n = lines.length;
  const m = lines[0].length; // all columns have same length

  let ans = 0;

  const grid = createGrid(n, m);

  function isSymbol(i: number, j: number, num: number) {
    if (!(0 <= i && i < n && 0 <= j && j < m)) {
      // We have hit a bounds edge case
      return false;
    }

    if (lines[i][j] === '*') {
      grid[i][j].push(num);
    }

    return lines[i][j] !== '.' && !isDigit(lines[i][j]);
  }

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
      if (isSymbol(i, start - 1, parsedNum) || isSymbol(i, j, parsedNum)) {
        // ans += parsedNum;
        continue;
      }

      // Now check the characters above and below the number
      for (let k = start - 1; k < j + 1; k++) {
        if (isSymbol(i - 1, k, parsedNum) || isSymbol(i + 1, k, parsedNum)) {
          //   ans += parsedNum;
          break;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const nums = grid[i][j];

      if (lines[i][j] === '*' && nums.length === 2) {
        const [a, b] = nums;
        ans += a * b;
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
