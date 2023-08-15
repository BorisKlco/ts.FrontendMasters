//Calable types

type FlipType = (choice: "head" | "tail", stake: number) => string;

const flipCoin: FlipType = (choice, stake) => {
  const flip = Math.random();
  let flipResult: string;
  let betResult: string;

  if (flip < 0.5) {
    flipResult = "head";
  } else {
    flipResult = "tail";
  }

  if (flipResult == choice) {
    betResult = `${flipResult}! Nicuu gold gold gold, ${stake * 2} for uWu...`;
  } else {
    betResult = `${flipResult}... you lost ${stake}..Try next time ?`;
  }

  return betResult;
};

console.log(flipCoin("tail", 50));
