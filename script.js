function dragElement(terrariumElement) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;

    terrariumElement.addEventListener('pointerdown', pointerDrag);
    terrariumElement.addEventListener('dblclick', bringToFront);

    function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.addEventListener('pointermove', elementDrag);
        document.addEventListener('pointerup', stopElementDrag);
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        terrariumElement.style.top = (terrariumElement.offsetTop - pos2) + 'px';
        terrariumElement.style.left = (terrariumElement.offsetLeft - pos1) + 'px';
    }

    function stopElementDrag() {
        document.removeEventListener('pointerup', stopElementDrag);
        document.removeEventListener('pointermove', elementDrag);
    }

    function bringToFront() {
        let maxZIndex = 0;
        const allPlants = document.querySelectorAll('.plant');
        
        allPlants.forEach(plant => {
            const zIndex = parseInt(window.getComputedStyle(plant).getPropertyValue('z-index'));
            if (!isNaN(zIndex) && zIndex > maxZIndex) {
                maxZIndex = zIndex;
            }
        });

        terrariumElement.style.zIndex = maxZIndex + 1;
    }
}

function changeDirtColor() {
    const dirtElement = document.querySelector('.dirt');
    dirtElement.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function resetImages() {
    const allPlants = document.querySelectorAll('.plant');
    allPlants.forEach(plant => {
        plant.style.top = '0px';
        plant.style.left = '0px';
        plant.style.zIndex = 'auto';
    });
}

for (let i = 1; i <= 14; i++) {
    let plantElement = document.getElementById('plant' + i);
    if (plantElement) {
        dragElement(plantElement);
    }
}
