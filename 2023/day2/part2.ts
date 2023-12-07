import * as fs from 'node:fs/promises';

async function main() {
  const dir = `${process.cwd()}/2023/day2/part2.txt`;
  const fileStream = await fs.readFile(dir, 'utf-8');

  let sum = 0;

  const lines = fileStream.split('\n');
  for (const line of lines) {
    let results = {
      red: 0,
      blue: 0,
      green: 0,
    };

    const allGameResults = line.split(':')[1];
    const gameResults = allGameResults.split(';');

    for (const gameResult of gameResults) {
      const individualGameResults = gameResult.split(',');
      for (const individualGameResult of individualGameResults) {
        const [number, color] = individualGameResult.trim().split(' ');

        results[color] = Math.max(results[color], parseInt(number));
      }
    }

    let _sum = 1;
    for (const color in results) {
      _sum *= parseInt(results[color]);
    }

    console.log('--------');
    console.log(results, _sum);
    console.log('--------');
    sum += _sum;
  }

  console.log('SUM: ', sum);
}

try {
  main();
} catch (e) {
  console.error(e);
}
