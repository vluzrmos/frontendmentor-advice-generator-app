async function bindAdvice(card, advice) {
  card.querySelector(".card__title").innerHTML = `ADVICE #${advice.id}`;
  card.querySelector(".card__body").innerHTML = advice.advice;
}

async function fetchRandomAdvice() {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();

  return data.slip;
}

function startAdiviceGame(card) {
  bindAdvice(card, {
    "id": 71,
    "advice": "It is easy to sit up and take notice, what's difficult is getting up and taking action."
  })

  card.querySelector('.card__dice').addEventListener('click', (e) => {
    e.preventDefault();

    (async () =>  bindAdvice(card, await fetchRandomAdvice()))();
  });
}

startAdiviceGame(document.getElementById("advice"));
