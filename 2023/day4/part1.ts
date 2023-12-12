import * as fs from 'node:fs/promises';

async function main () {
    const dir = `${process.cwd()}/2023/day4`;
    const fileStream = await fs.readFile(`${dir}/part1.txt`, 'utf8');

    const lines = fileStream.split('\n');
    let sum = 0;

    for (let i = 0; i < lines.length; i++) {
	const line = lines[i] as any;
	let gamesWon = 0;

	if (!line) continue;

	const game = line.slice([line.indexOf(':') + 1]).trim();
	const [winningNumbers, userNumbers] = game.split('|');
	const winningNumberSet = new Set(winningNumbers.split(' '));
	const userNumberArr = userNumbers.split(' ');

	for (const num of userNumberArr) {
	    if (Number(num) && winningNumberSet.has(num)) {
		gamesWon += 1;
	    }
	}

	if (gamesWon) {
	    sum += Math.pow(2, gamesWon - 1);
	}
    }

    console.log('SUM', sum);
}

try {
    main();
} catch (e) {
    console.error(e)
}
