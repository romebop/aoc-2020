const fs = require('fs');

const inputFile = process.argv.slice(2)[0];

const passports = fs.readFileSync(inputFile, 'utf8')
  .split('\n\n')
  .map(s => s.replace(/\n/g, ' ').split(' '))
  .map(a => a.reduce((acc, curr) => {
    const [key, val] = curr.split(':');
    return { ...acc, [key]: val };
  }, {}));

console.log(solve(passports));

function solve(passports) {
  return passports.map(isValidPassport)
    .reduce((acc, curr) => curr ? acc + 1 : acc, 0);
}

function isValidPassport(passport) {
  const reqFields = [
    {
      name: 'byr',
      isValid: v => v.length === 4
        && v >= 1920
        && v <= 2002,
    },
    {
      name: 'iyr',
      isValid: v => v.length === 4
        && v >= 2010
        && v <= 2020,
    },
    {
      name: 'eyr',
      isValid: v => v.length === 4
        && v >= 2020
        && v <= 2030,
    },
    {
      name: 'hgt',
      isValid: v => {
        const number = v.slice(0, -2);
        const unit = v.slice(-2);
        if (unit === 'cm') return number >= 150 && number <= 193;
        if (unit === 'in') return number >= 59 && number <= 76;
        return false;
      },
    },
    {
      name: 'hcl',
      isValid: v => /^#[a-f0-9]{6}$/.test(v),
    },
    {
      name: 'ecl',
      isValid: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
    },
    {
      name: 'pid',
      isValid: v => /^\d{9}$/.test(v),
    },
  ];
  for (const field of reqFields) {
    if (
      !passport.hasOwnProperty(field.name)
      || !field.isValid(passport[field.name])
    ) return false;
  }
  return true;
}
