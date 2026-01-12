const rainBox = document.getElementById('rain');
const input = document.getElementById('cityInput');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const status = document.getElementById('status');
const body = document.body;

/* 🌧️ Rain create */
function createRain(){
  rainBox.innerHTML = '';
  for(let i = 0; i < 80; i++){
    const d = document.createElement('div');
    d.className = 'drop';
    d.style.left = Math.random() * 100 + 'vw';
    d.style.animationDuration = (0.5 + Math.random()) + 's';
    rainBox.appendChild(d);
  }
}

/* ❌ Rain remove */
function removeRain(){
  rainBox.innerHTML = '';
}

/* 🌤️ Weather fetch */
function getWeather(cityName){

  city.innerHTML = 'Loading...';
  temp.innerHTML = '--';
  status.src = '';

  fetch(`https://api.weatherapi.com/v1/current.json?key=9208a768160f4c83917210008261101&q=${cityName}&aqi=yes`)
  .then(res => res.json())
  .then(data => {

    city.innerHTML = data.location.name;
    temp.innerHTML = Math.floor(data.current.temp_c) + '°';
    status.src = data.current.condition.icon;

    const condition = data.current.condition.text.toLowerCase();
    condition.includes('rain') ? createRain() : removeRain();

    if(data.current.is_day === 1){
      body.style.background = 'radial-gradient(circle at top, #1a0033, #000)';
    } else {
      body.style.background = 'radial-gradient(circle at top, #000428, #004e92)';
    }
  })
  .catch(() => {
    city.innerHTML = 'City not found 😵';
    temp.innerHTML = '--';
    status.src = './assest/img/not-found.png';
    removeRain();
  });
}

/* 🔍 Button */
document.getElementById('searchBtn').addEventListener('click', () => {
  if(input.value.trim()){
    getWeather(input.value.trim());
    input.value = '';
  }
});

/* ⌨️ Enter key */
input.addEventListener('keydown', e => {
  if(e.key === 'Enter'){
    document.getElementById('searchBtn').click();
  }
});
