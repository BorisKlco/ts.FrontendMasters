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

////////////////////
//
//
//
// void != undefined
// Function overload

type FormSubmitHandler = (data: FormData) => void;
type MsgHandler = (e: MessageEvent) => void;

function handleEvent(element: HTMLFormElement, handler: FormSubmitHandler);
function handleEvent(element: HTMLIFrameElement, handler: MsgHandler);
function handleEvent(
  element: HTMLIFrameElement | HTMLFormElement,
  handler: MsgHandler | FormSubmitHandler
) {}

const frame = document.getElementsByTagName("iframe")[0];
const form = document.getElementsByTagName("form")[0];

handleEvent(frame, (val) => {});
handleEvent(form, (val) => {});

//////////////////////////////////
//
//
//
// Explicitly define return types

export async function getData(url: string) {
  const resp = await fetch(url);
  const data = (await resp.json()) as { prop: string[] };
  return data;
}

function fetchData() {
  getData("url").then((result) => {
    console.log(result.prop.join(","));
    //result.prop IS define
  });
}

//// Adding statement if resp is ok
export async function getDataIf(url: string) {
  const resp = await fetch(url);
  if (resp.ok) {
    const data = (await resp.json()) as { prop: string[] };
    return data;
  }
}

function fetchDataIf() {
  getDataIf("url").then((result) => {
    if (result) return console.log(result.prop.join(","));
    //result.prop CANT be define, what if fetch fail
  });
}
