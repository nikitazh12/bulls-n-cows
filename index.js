import _ from 'lodash';
import readlineSync from 'readline-sync';

const generateNumber = () => {
  const digits = _.shuffle(_.range(10));
  return digits.slice(0, 4).join('');
};

const checkGuess = (secret, guess) => {
  let bulls = 0;
  let cows = 0;
  for (let i = 0; i < 4; i += 1) {
    if (secret[i] === guess[i]) {
      bulls += 1;
    } else if (secret.includes(guess[i])) {
      cows += 1;
    }
  }
  return { bulls, cows };
};

const playGame = () => {
	const playerName = readlineSync.question('Введите ваше имя:');
	console.log(`Привет, ${playerName}! Давайте начнем игру, у вас будет 10 попыток угадать число.`);
  const secret = generateNumber();
  let attempts = 0;
  const maxAttempts = 10;

  while (true) { 
    let guess = readlineSync.question(`Осталось попыток: ${maxAttempts - attempts}. Введите ваше число (4 цифры): `);
    while (isNaN(guess) || guess.length !== 4 || /(\d).*\1/.test(guess)) {
      console.log('Неверный ввод. Введите 4 уникальные цифры');
      guess = readlineSync.question(`Осталось попыток: ${maxAttempts - attempts}. Введите ваше число (4 цифры): `);
    }
    attempts += 1;
    const result = checkGuess(secret, guess);
    if (result.bulls === 4) {
      console.log(`Поздравляем, ${playerName}! Вы угадали число за ${attempts} попыток.`);
      break; 
    } else {
      console.log(`Быков: ${result.bulls}, коров: ${result.cows}`);
    }
    if (attempts === maxAttempts) {
      console.log(`Игра окончена. Секретное число было: ${secret}`);
      break; 
    }
 }
};

playGame();

