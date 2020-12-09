import { readFileSync } from 'fs';

const inputFile = process.argv.slice(2)[0];

const data: number[] = readFileSync(inputFile, 'utf8')
  .split('\n')
  .map(e => +e);

const preambleLen = 25;

console.log(solve(data, preambleLen));

function solve(data: number[], preambleLen: number) {
  const invalidNum = getInvalidNum(data, preambleLen) as number;
  const invalidIdx = data.indexOf(invalidNum);
  for (let i = 0; i < invalidIdx; i++) {
    for (let j = i + 1; j < invalidIdx; j++) {
      const contArr = data.slice(i, j);
      const sum = contArr.reduce((acc, curr) => acc + curr);
      if (sum > invalidNum) continue;
      if (sum === invalidNum) return Math.min(...contArr) + Math.max(...contArr);
    }
  }
}

function getInvalidNum(data: number[], preambleLen: number) {
  for (let i = preambleLen; i < data.length; i++) {
    const preamble = data.slice(i - preambleLen, i);
    if (!doesPass(data[i], preamble)) return data[i];
  }
}

function doesPass(target: number, preamble: number[]): boolean {
  for (let j = 0; j < preamble.length; j++) {
    for (let k = j + 1; k < preamble.length; k++) {
      if (target === preamble[j] + preamble[k]) return true;
    }
  }
  return false;
}
