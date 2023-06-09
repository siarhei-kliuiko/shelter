const PETS_DATA = [
    {
        "name": "Jennifer",
        "img": { source: "assets/images/pets-jennifer.jpg", description: "Sitting creamy-white puppy" },
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Sophia",
        "img": { source: "assets/images/pets-sophia.jpg", description: "Small black and white puppy" },
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Woody",
        "img": { source: "assets/images/pets-woody.jpg", description: "Lying ginger dog" },
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"]
    },
    {
        "name": "Scarlett",
        "img": { source: "assets/images/pets-scarlet.jpg", description: "Standing brown and white puppy" },
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Katrine",
        "img": { source: "assets/images/pets-katrine.jpg", description: "Standing gray cat" },
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Timmy",
        "img": { source: "assets/images/pets-timmy.jpg", description: "Sitting light-gray cat" },
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"]
    },
    {
        "name": "Freddie",
        "img": { source: "assets/images/pets-freddie.jpg", description: "Sitting white and gray-striped cat" },
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"]
    },
    {
        "name": "Charly",
        "img": { source: "assets/images/pets-charly.jpg", description: "Lying brown and white dog" },
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"]
    }
];

const CARD_WIDTH = 270;
const CARD_HEIGHT = 435;

function createPetCard(petInfo, index) {
    let card = document.createElement("div");
    card.className = "pet-card";
    let image = document.createElement("img");
    image.src = petInfo.img.source;
    image.alt = petInfo.img.description;
    image.height = image.width = CARD_WIDTH;
    card.append(image);
    let info = document.createElement("div");
    info.className = "pet-card-info";
    let title = document.createElement("h3");
    title.className = "pet-card-title";
    title.append(document.createTextNode(petInfo.name));
    info.append(title);
    let button = document.createElement("div");
    button.className = "pet-card-learn-more";
    button.append(document.createTextNode("Learn more"));
    info.append(button);
    card.append(info);
    card.dataset.id = index;
    return card;
}

function createPetPopup(petId) {
    const popup = document.createElement("div");
    popup.className = "popup";
    const closeButton = document.createElement("button");
    closeButton.classList.add("popup__close-button");
    closeButton.classList.add("button-interactive-small-svg");
    closeButton.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12"><use xlink:href="assets/svg/cross.svg#cross"/></svg>';
    popup.append(closeButton);
    const popupContent = document.createElement("div");
    popupContent.className = "popup__content";
    popupContent.addEventListener("click", event => event.stopPropagation());
    const image = document.createElement("img");
    image.className = "popup__image";
    image.src = PETS_DATA[petId].img.source;
    image.alt = PETS_DATA[petId].img.description;
    popupContent.append(image);
    const textContent = document.createElement("div");
    textContent.className = "popup__text-content";
    const petName = document.createElement("h3");
    petName.className = "popup__pet-name";
    petName.textContent = PETS_DATA[petId].name;
    textContent.append(petName);
    const petBreed = document.createElement("h2");
    petBreed.className = "popup__pet-breed";
    petBreed.textContent = PETS_DATA[petId].type + " - " + PETS_DATA[petId].breed;
    textContent.append(petBreed);
    const petDescription = document.createElement("p");
    petDescription.className = "popup__pet-description";
    petDescription.textContent = PETS_DATA[petId].description;
    textContent.append(petDescription);
    const createDescriptionListElement = (elementTitle, info) => {
        const listElement = document.createElement("li");
        listElement.className = "popup__description-list__element";
        const listDot = document.createElement("span");
        listDot.className = "popup__description-list__element__dot";
        listElement.append(listDot);
        const listText = document.createElement("span");
        listText.className = "popup__description-list__element__text";
        const title = document.createElement("span");
        title.className = "popup__description-list__element__text__title";
        title.textContent = elementTitle + ":";
        listText.append(title);
        const infoText = document.createTextNode(" " + (Array.isArray(info) ? info.join(", ") : info));
        listText.append(infoText);
        listElement.append(listText);
        return listElement;
    }

    const descriptionList = document.createElement("ul");
    descriptionList.className = "popup__description-list";
    descriptionList.append(createDescriptionListElement("age", PETS_DATA[petId].age));
    descriptionList.append(createDescriptionListElement("inoculations", PETS_DATA[petId].inoculations));
    descriptionList.append(createDescriptionListElement("diseases", PETS_DATA[petId].diseases));
    descriptionList.append(createDescriptionListElement("parasites", PETS_DATA[petId].parasites));
    textContent.append(descriptionList);
    popupContent.append(textContent);
    popup.append(popupContent);
    return popup;
}