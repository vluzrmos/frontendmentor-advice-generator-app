let currentAdvice = {};
const advicesCache = new Map();
const advicesBanned = [146];

advicesCache.set(71, {
  id: 71,
  advice:
    "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
});

async function bindAdvice(card, advice) {
  currentAdvice = advice;
  card.querySelector(".card__title").innerHTML = `ADVICE #${advice.id}`;
  card.querySelector(".card__body").innerHTML = advice.advice;
}

async function fetchAllRandomAdvices() {
  const time = new Date().getTime();

  const response = await fetch(
    `https://api.adviceslip.com/advice/search/e?__t=${time}`
  );

  const data = await response.json();

  data.slips.forEach(function (item) {
    if (advicesBanned.indexOf(item.id) >= 0) {
      return;
    }

    advicesCache.set(item.id, item);
  });
}

function fetchLocalAdvice() {
  return new Promise((resolve, reject) => {
    const keys = [...advicesCache.keys()];

    if (keys.length === 0) {
      return reject();
    }

    const index = Math.floor(Math.random() * keys.length);

    const key = keys[index];

    return resolve(advicesCache.get(key));
  });
}

function startAdiviceGame(card) {
  fetchAllRandomAdvices();

  fetchLocalAdvice().then((advice) => bindAdvice(card, advice));

  const dice = card.querySelector(".card__dice");

  const cardBindAdvice = (advice) => bindAdvice(card, advice);
  
  const enableDice = () =>
    setTimeout(() => {
      dice.disabled = false;
    }, 500);

  dice.addEventListener("click", (e) => {
    e.preventDefault();

    dice.disabled = true;

    fetchLocalAdvice().then(cardBindAdvice).then(enableDice).catch(enableDice);
  });
}

startAdiviceGame(document.getElementById("advice"));
