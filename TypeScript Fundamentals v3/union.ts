function coinFlip(): "head" | "tail" {
  if (Math.random() > 0.5) return "head";
  return "tail";
}

coinFlip();

type SheIsNotInterested =
  | ["error", Error]
  | ["success", { respones: string; phone: number }];

function askHerOut(): SheIsNotInterested {
  if (coinFlip() === "head") {
    return ["success", { respones: "You are in", phone: 421905123123 }];
  } else {
    return ["error", new Error("Only game what you have is on your steam...")];
  }
}

const dieAlone = askHerOut();
