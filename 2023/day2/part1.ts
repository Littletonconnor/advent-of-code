import * as fs from 'node:fs/promises';

const colorMap = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const dir = `${process.cwd()}/2023/day2/part1.txt`;
  const fileStream = await fs.readFile(dir, 'utf-8');

  let sum = 0;

  const lines = fileStream.split('\n');
  for (const line of lines) {
    let okay = true;
    const game = line.split(':')[0];
    const [, gameNumber] = game.trim().split(' ');
    const allGameResults = line.split(':')[1];
    const gameResults = allGameResults.split(';');

    for (const gameResult of gameResults) {
      const individualGameResults = gameResult.split(',');
      for (const individualGameResult of individualGameResults) {
        const [number, color] = individualGameResult.trim().split(' ');

        if (number > colorMap[color]) {
          okay = false;
        }
      }
    }

    if (okay) {
      sum += Number(gameNumber);
    }

    console.log('--------');
    console.log(sum);
    console.log('--------');
  }

  console.log('SUM: ', sum);
}

try {
  main();
} catch (e) {
  console.error(e);
}
