document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.getElementById("cards-container");
  const userTemplate = document.getElementById("user-template");
  const cityName = document.getElementById("city-name");
  const searchBtn = document.getElementById("search-btn");
  function domWork(card, data) {
    const defaultCity = card.querySelector(".city-name");
    const defaultTemp = card.querySelector(".temp");
    const defaultCondImg = card.querySelector(".condition-icon");
    const defaultCond = card.querySelector(".condition");
    defaultCity.innerText = data.location.name;
    defaultTemp.innerText = data.current.temp_c;
    defaultCondImg.src = data.current.condition.icon;
    defaultCond.innerText = data.current.condition.text;
  }
  async function mainWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=bbbb56a33f20445a934111049233008&q=Nepal&aqi=no`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const cardclone = userTemplate.content.cloneNode(true).children[0];
        domWork(cardclone, data);
        cardsContainer.appendChild(cardclone);
      });
  }

  async function weather() {
    const userInput = document.getElementById("user-input").value;
    console.log(userInput);
    const url = `https://api.weatherapi.com/v1/current.json?key=bbbb56a33f20445a934111049233008&q=${userInput}&aqi=no`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.error && data.error.message) {
          alert(data.error.message);
        } else {
          console.log(data);
        }
        const cardclone = userTemplate.content.cloneNode(true).children[0];
        domWork(cardclone, data);
        cardsContainer.appendChild(cardclone);
      });
  }

  mainWeather();
  searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    weather();
  });
});
