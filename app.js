function DinoData() {
    return fetch("/dino.json")
        .then((res) => res.json())
        .then((data) => {
            return data.Dinos.map((dino) => new Dino(dino));
        }).catch((error) => {
            console.log(error);
        })
}

// Create Dino Constructor
class Dino {
    constructor(dino) {
        this.species = dino.species;
        this.weight = dino.weight;
        this.height = dino.height;
        this.diet = dino.diet;
        this.where = dino.where;
        this.when = dino.when;
        this.fact = dino.fact;
    }
}

//Method 1
Dino.prototype.CompareHeight = function CompareHeight(humanHeight) {
    const rate = (this.height / humanHeight).toFixed(1);
    if (rate > 1) {
        return `${this.species} is taller than you!`;
    }
    if (rate < 1) {
        return `${this.species} is lower than you!`;
    }
    return `You and ${this.species} are the same height`;
}
//Method 2
Dino.prototype.CompareWeight = function CompareWeight(humanWeight) {
    const rate = (this.weight / humanWeight).toFixed(1);
    if (rate > 1) {
        return `${this.species} weighs more than you`;
    }
    if (rate < 1) {
        return `${this.species} is lighter than you!`;
    }
    return `You and ${this.species} are are equal`;
}
//Method 3
Dino.prototype.CompareDiet = function CompareDiet(diet) {

    if (this.diet == diet) {
        return `You and ${this.species} are on the same type of diet`;
    }
    return `You and ${this.species} are different type of diet`;
}

// Create Human Object
function Human(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}
// get human data from form
function getDataHuman() {
    const name = document.getElementById("name").value;
    const weight = document.getElementById("weight").value;
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    const diet = document.getElementById("diet").value;
    const height = Number(feet) * 12 + Number(inches);
    const human = new Human(name ? name : "You", height, weight, diet)

    if (!name || !weight || height == 0) {
        document.getElementById('error').innerHTML = 'You must enter all fields!';
        return null;
    }
    return human;
}
// Generate Tiles for each Dino in Array
function dinoBox(dinoData, index, human) {
    const number = Math.floor(Math.random() * (index + 1))
    let compare = "";
    switch (number) {
        case 0:
            compare = dinoData.CompareHeight(human.height);
            break;
        case 1:
            compare = dinoData.CompareWeight(human.weight);
            break;
        default:
            compare = dinoData.CompareDiet(human.diet);
            break;
    }
    if (index == 8) {
        compare = 'All birds are Dinosaurs.'
    }
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.innerHTML = `<h3>${dinoData.species}</h3>
                    <img src="images/${(dinoData.species.toLowerCase())}.png" >
                    <p>${compare}</p>`;
    return div;
}
//Generate humnan box
function humanBox(human) {
    const div = document.createElement('div');
    div.className = 'grid-item';
    div.innerHTML = `<h3>${human.name}</h3>
                    <img src="images/human.png">`;
    return div;
}
//Generate array to show 
async function generateArrayGrid() {
    const dinoDatas = await DinoData();
    const dinoArray = [];
    for (let i = 0; i < dinoDatas.length; i++) {
        const dino = new Dino(dinoDatas[i])
        dinoArray.push(dino);
    }
    dinoArray.splice(4, 0, 'human');
    return dinoArray;
}
// Add tiles to DOM
async function addToDOM() {
    const human = this.getDataHuman();
    if(!human) return;
    document.querySelector('form').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    const arrayGird = await this.generateArrayGrid();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
        let grid = i === 4 ? humanBox(human) : dinoBox(arrayGird[i], i, human);
        fragment.appendChild(grid);
    }
    document.getElementById('grid').appendChild(fragment);
}
// On button click, prepare and display infographic
function btnClick() {

    this.addToDOM();
}