const rotations = document.querySelectorAll('.rotations__champbox > img');

if (rotations) {
  showRotation();
};

async function showRotation() {
  const response = await fetch('/get/champions');
  const champJson = await response.json();
  console.log(champJson);

  rotations.forEach(imgTag => {
    const champName = champJson[imgTag.id].id;
    imgTag.src = `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/champion/${champName}.png`;
    imgTag.style = 'width: 50px; height: 50px';
  });
};