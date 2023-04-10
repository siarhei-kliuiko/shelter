const DEFAULT_ACTIVE_CARDS_COUNT = 3;
const SLIDE = document.querySelector(".our-friends__slide-content");
const CARDS_SETS_CONTAINER = document.querySelector(".our-friends__slide-content__card-sets");
const CARDS_SET_LEFT = document.querySelector("#left-set");
const CARDS_SET_ACTIVE = document.querySelector("#active-set");
const CARDS_SET_RIGHT = document.querySelector("#right-set");
const SLIDER_BUTTON_LEFT = document.querySelector("#left");
const SLIDER_BUTTON_RIGHT = document.querySelector("#right");

let activeCardsCount = getActiveCardsCount();
let cardsGap = getCurrentCardsGap();

setCards(CARDS_SET_LEFT);
setCards(CARDS_SET_ACTIVE, CARDS_SET_LEFT);
setCards(CARDS_SET_RIGHT, CARDS_SET_ACTIVE);
fitActiveCardsInSlide();

function fitActiveCardsInSlide() {
    const slideWidth = calcSlideWidth(activeCardsCount, cardsGap);
    SLIDE.style.width = `${slideWidth}px`;
    CARDS_SETS_CONTAINER.style.left = `${-slideWidth}px`;
}

function setCards(setToAddCards, baseSet = null) {
    let set = document.createElement("div");
    const petsToAdd = getNewPets(DEFAULT_ACTIVE_CARDS_COUNT, baseSet ? baseSet.children : null);
    for (const pet of petsToAdd) {
        set.append(createPetCard(pet.petData, pet.cardIndex));
    }

    changeCardsVisibility(set, activeCardsCount - DEFAULT_ACTIVE_CARDS_COUNT);
    setToAddCards.innerHTML = set.innerHTML;
}

function* getNewPets(count, usedCards) {
    let newPets = PETS_DATA.map((petData, index) => ({ cardIndex: index, petData: petData }));
    if (usedCards) {
        const usedCardIDs = [...usedCards].map(card => Number(card.dataset.id));
        if (usedCardIDs.length) {
            newPets = newPets.filter(pet => !usedCardIDs.includes(pet.cardIndex));
        }
    }

    while (count > 0 && newPets.length > 0) {
        const selectedPetIndex = [Math.floor(Math.random() * newPets.length)];
        yield { cardIndex: newPets[selectedPetIndex].cardIndex, petData: newPets[selectedPetIndex].petData };
        newPets.splice(selectedPetIndex, 1);
        count--;
    }
}

function getActiveCardsCount() {
    const slideWidth = document.querySelector(".our-friends__slide-container").offsetWidth;
    let cardsCountToFitSlide = Math.floor(slideWidth / CARD_WIDTH);
    const currentGap = getCurrentCardsGap();
    while (slideWidth < calcSlideWidth(cardsCountToFitSlide, currentGap)) {
        cardsCountToFitSlide--;
    }

    return cardsCountToFitSlide;
}

function calcSlideWidth(cardsCount, gap) {
    return CARD_WIDTH * cardsCount + gap * (cardsCount - 1);
}

function getCurrentCardsGap() {
    return parseInt(getComputedStyle(document.querySelector(".our-friends__slide-content__card-set")).columnGap);
}

addEventListener("resize", () => {
    const currentActiveCardsCount = getActiveCardsCount();
    const currentCardsGap = getCurrentCardsGap();
    if (activeCardsCount !== currentActiveCardsCount || cardsGap !== currentCardsGap) {
        changeCardsVisibility(CARDS_SET_LEFT, currentActiveCardsCount - activeCardsCount);
        changeCardsVisibility(CARDS_SET_ACTIVE, currentActiveCardsCount - activeCardsCount);
        changeCardsVisibility(CARDS_SET_RIGHT, currentActiveCardsCount - activeCardsCount);
        activeCardsCount = currentActiveCardsCount;
        cardsGap = currentCardsGap;
        fitActiveCardsInSlide();
    }
});

function changeCardsVisibility(cardsSet, toggleFlag) {
    if (toggleFlag === 0) {
        return;
    }

    let cardsCount = Math.abs(toggleFlag);
    const showHidden = toggleFlag > 0;
    const cards = showHidden ? [...cardsSet.children].filter(card => card.classList.contains("pet-card-hidden")) : [...cardsSet.children].filter(card => !card.classList.contains("pet-card-hidden")).reverse();
    for (let i = 0; cardsCount > 0 && i < cards.length; i++, cardsCount--) {
        let card = cards[i];
        if (showHidden) {
            card.classList.remove("pet-card-hidden");
        } else {
            card.classList.add("pet-card-hidden");
        }
    }
}

SLIDER_BUTTON_LEFT.addEventListener("click", sliderSlide);
SLIDER_BUTTON_RIGHT.addEventListener("click", sliderSlide);
CARDS_SETS_CONTAINER.addEventListener("transitionend", slideTransitionComplete);

function sliderSlide(event) {
    CARDS_SETS_CONTAINER.classList.add("our-friends__slide-content__card-set__slide-transition");
    switch (event.currentTarget.id) {
        case "left":
            CARDS_SETS_CONTAINER.style.left = 0;
            CARDS_SETS_CONTAINER.IsTransitionToRight = true;
            break;
        case "right":
            CARDS_SETS_CONTAINER.style.left = `${-calcSlideWidth(activeCardsCount, cardsGap) * 2}px`;
            CARDS_SETS_CONTAINER.IsTransitionToRight = false;
            break;
    }

    SLIDER_BUTTON_LEFT.removeEventListener("click", sliderSlide);
    SLIDER_BUTTON_RIGHT.removeEventListener("click", sliderSlide);
}

function slideTransitionComplete(event) {
    if (event.target === CARDS_SETS_CONTAINER) {
        CARDS_SETS_CONTAINER.classList.remove("our-friends__slide-content__card-set__slide-transition");
        CARDS_SETS_CONTAINER.style.left = `${-calcSlideWidth(activeCardsCount, cardsGap)}px`;
        if (event.currentTarget.IsTransitionToRight) {
            CARDS_SET_RIGHT.innerHTML = CARDS_SET_ACTIVE.innerHTML;
            CARDS_SET_ACTIVE.innerHTML = CARDS_SET_LEFT.innerHTML;
            setCards(CARDS_SET_LEFT, CARDS_SET_ACTIVE);
        } else {
            CARDS_SET_LEFT.innerHTML = CARDS_SET_ACTIVE.innerHTML;
            CARDS_SET_ACTIVE.innerHTML = CARDS_SET_RIGHT.innerHTML;
            setCards(CARDS_SET_RIGHT, CARDS_SET_ACTIVE);
        }

        SLIDER_BUTTON_LEFT.addEventListener("click", sliderSlide);
        SLIDER_BUTTON_RIGHT.addEventListener("click", sliderSlide);
    }
}

SLIDE.addEventListener("click", (event)=> {
    const clickedCard = event.target.closest(".pet-card");
    if(clickedCard) {
        showOverlay(createPetPopup(clickedCard.dataset.id));
    }
})