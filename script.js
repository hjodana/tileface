const defaultImages = ["tile01.jpg", "tile02.jpg", "tile03.jpg", "tile04.jpg"];
let imageList = [...defaultImages];
const gridContainer = document.getElementById('gridContainer');
const imageListContainer = document.getElementById('imageList');
const gridSizeSelect = document.getElementById('gridSize');

function reloadRandom() {
  const gridSize = parseInt(gridSizeSelect.value, 10);
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set the grid column layout dynamically
  gridContainer.style.width = `${gridSize*100}px`;
  gridContainer.style.height= `${gridSize*100}px`;
  gridContainer.innerHTML = ''; // Clear previous tiles
  const totalTiles = gridSize * gridSize;

  for (let i = 0; i < totalTiles; i++) {
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    const img = document.createElement('img');
    img.src = randomImage;
    gridContainer.appendChild(img);
  }
}

function loadPreset() {
  const gridSize = parseInt(gridSizeSelect.value, 10);
  const preset = [
    [1, 2, 1, 2],
    [4, 3, 4, 3],
    [1, 2, 1, 2],
    [4, 3, 4, 3],
  ];
  if (gridsize == 5) {
  preset = [
    [1, 2, 1, 2, 1],
    [4, 3, 4, 3, 4],
    [1, 2, 1, 2, 1],
    [4, 3, 4, 3, 4],
    [1, 2, 1, 2, 1],
  ];
  }
  gridContainer.style.gridTemplateColumns = `repeat(4, 1fr)`; // Fix for preset layout
  gridContainer.innerHTML = '';

  preset.forEach(row => {
    row.forEach(index => {
      const img = document.createElement('img');
      //img.src = `tile0${index}.jpg`;
      img.src = imageList[index-1]
      //alert(img.src)
      gridContainer.appendChild(img);
    });
  });
}

function updateImageList() {
  imageListContainer.innerHTML = '';
  imageList.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = () => {
      imageList.splice(index, 1);
      updateImageList();
      reloadRandom();
    };

    const wrapper = document.createElement('div');
    wrapper.appendChild(img);
    wrapper.appendChild(removeButton);
    imageListContainer.appendChild(wrapper);
  });
}

function uploadImage() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageList.push(e.target.result);
      updateImageList();
      reloadRandom();
    };
    reader.readAsDataURL(file);
  }
}

// Initialize
updateImageList();
reloadRandom();