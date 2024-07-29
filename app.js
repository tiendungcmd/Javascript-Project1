function DinoData() {
    const dinos = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbivore",
            "where": "North America",
            "when": "Late Jurassic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbivore",
            "where": "North America, Europe, Asia",
            "when": "Late Jurassic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate plates and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivore",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbivore",
            "where": "Worldwide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ];
    return dinos;
}

// Create Dino Constructor
function Dino(dino) {
    this.species = dino.species;
    this.weight = dino.weight;
    this.height = dino.height;
    this.diet = dino.diet;
    this.where = dino.where;
    this.when = dino.when;
    this.fact = dino.fact;
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
function GetDataHuman() {
    const name = document.getElementById("name").value;
    const weight = document.getElementById("weight").value;
    const feet = document.getElementById("feet").value;
    const inches = document.getElementById("inches").value;
    const diet = document.getElementById("diet").value;
    const height = Number(feet) * 12 + Number(inches);
    const human = new Human(name ? name : "You", height, weight, diet)
    console.log(human);
    return human;
}
// Generate Tiles for each Dino in Array
function dinoBox(dinoData, index, human) {
    let compare = "";
    if (index == 8) {
        compare = "All birds are Dinosaurs."
    } else if (index % 2 == 0 && index < 5) {
        compare = dinoData.CompareHeight(human.height);
    } else if (index % 2 == 1 && index >= 5) {
        compare = dinoData.CompareWeight(human.weight);
    } else {
        compare = dinoData.CompareDiet(human.diet);
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
// Add tiles to DOM
function addToDOM() {
    const human = this.GetDataHuman();
    const dinoDatas = DinoData();
    const dinoArray = [];
    dinoDatas.forEach(function (dinoData) {
        const dino = new Dino(dinoData)
        dinoArray.push(dino);
    });
    dinoArray.splice(4, 0, 'human');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 9; i++) {
        let grid = i === 4 ? humanBox(human) : dinoBox(dinoArray[i], i, human);
        fragment.appendChild(grid);
    }
    document.getElementById('grid').appendChild(fragment);
}
// On button click, prepare and display infographic
function btnClick() {
    document.querySelector('form').style.display = 'none';
    this.addToDOM();
}