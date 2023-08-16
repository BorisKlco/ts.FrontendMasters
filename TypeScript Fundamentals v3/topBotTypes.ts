// use of any
// console.log doesnt care what type go in. Example use of any.
function print(...data: any[]): void {
  return console.log(...data);
}

function sampleText(input: string): string {
  return input;
}

print("console.log", sampleText("simply doesnt care"), "about any");

// use of unknown

function maybeResponse(): unknown {
  const FlipForRespose: number = Math.random();

  if (FlipForRespose < 0.25) {
    return { success: "You Got it!" };
  } else if (FlipForRespose < 0.5) {
    return 42;
  } else if (FlipForRespose < 0.75) {
    return "42 as string";
  } else {
    return true;
  }
}

// I'm telling you right now that return is not unknown!
function getMeHimOnPhoneNow() {
  const getMeHimOnPhone = maybeResponse();
  if (typeof getMeHimOnPhone === "object") {
    return getMeHimOnPhone;
  } else if (typeof getMeHimOnPhone === "number") {
    return getMeHimOnPhone;
  } else if (typeof getMeHimOnPhone === "string") {
    return getMeHimOnPhone;
  } else if (typeof getMeHimOnPhone === "boolean") {
    return getMeHimOnPhone;
  } else {
    return getMeHimOnPhone;
  }
}

console.log(getMeHimOnPhoneNow());
