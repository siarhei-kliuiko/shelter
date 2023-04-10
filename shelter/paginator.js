const PAGINATOR = document.querySelector(".our-friends__paginator-content");
const CARDS_CONTAINER = document.querySelector(".our-friends__cards-container_big");
const PAGE_NUMBER_INDICATOR = document.querySelector("#page");
const BUTTON_FIRST = document.querySelector("#first");
const BUTTON_PREV = document.querySelector("#prev");
const BUTTON_NEXT = document.querySelector("#next");
const BUTTON_LAST = document.querySelector("#last");
let activeCardsCount = getCardsPerPageCount();
let rowActiveCardsCount = getRowCardsCount();
let currentPageNumber = 1;

const createArrayForPaginator = () => {
    const petsData = PETS_DATA.map((data, index) => ({ petIndex: index, petData: data }));
    const dataToPopulatePaginator = [];
    let currentPetsIndexesSet = [];
    let itemsToPick = [];
    for (let i = 0; i < petsData.length * 6; i++) {
        if (!itemsToPick.length) {
            itemsToPick = [...petsData];
        }

        if (currentPetsIndexesSet.length === 6) {
            currentPetsIndexesSet = [];
        }

        let itemToPickIndex = Math.floor(Math.random() * itemsToPick.length);
        if (currentPetsIndexesSet.includes(itemsToPick[itemToPickIndex].petIndex)) {
            let uniqueItemsForCurrentSet = itemsToPick.map((petInfo, index) => ({ index, petInfo })).filter(item => !currentPetsIndexesSet.includes(item.petInfo.petIndex));
            itemToPickIndex = uniqueItemsForCurrentSet[Math.floor(Math.random() * uniqueItemsForCurrentSet.length)].index;
        }

        let pickedItem = itemsToPick.splice(itemToPickIndex, 1)[0];
        dataToPopulatePaginator.push(pickedItem);
        currentPetsIndexesSet.push(pickedItem.petIndex);
    }

    return dataToPopulatePaginator;
}

const getLastPageNumber = () => Math.ceil(CARDS_CONTAINER.children.length / getCardsPerPageCount());

createArrayForPaginator().forEach((petInfo, index) => {
    const card = createPetCard(petInfo.petData, petInfo.petIndex);
    card.id = index;
    CARDS_CONTAINER.append(card);
})

addEventListener("resize", () => {
    if (getRowCardsCount() < 3) {
        PAGINATOR.classList.add("our-friends__cards-container_big_tablet-height");
    } else {
        PAGINATOR.classList.remove("our-friends__cards-container_big_tablet-height");
    }

    const currentActiveCardsCount = getCardsPerPageCount();
    if (currentActiveCardsCount != activeCardsCount) {
        const pageStartCardNumber = (currentPageNumber - 1) * activeCardsCount;
        const newPageNumber = Math.floor(pageStartCardNumber / currentActiveCardsCount + 1);
        setPaginatorPage(newPageNumber);
        activeCardsCount = currentActiveCardsCount;
    } else {
        const currentRowActiveCardsCount = getRowCardsCount();
        if (currentRowActiveCardsCount != rowActiveCardsCount) {
            setPaginatorPage(currentPageNumber);
            rowActiveCardsCount = currentRowActiveCardsCount;
        }
    }
});

function getCardsPerPageCount() {
    const verticalGap = parseInt(getComputedStyle(CARDS_CONTAINER).rowGap);
    const verticalCardsCount = Math.floor(PAGINATOR.offsetHeight / CARD_HEIGHT);
    const verticalCardsCountTotal = Math.floor((PAGINATOR.offsetHeight - (verticalCardsCount - 1) * verticalGap) / CARD_HEIGHT);
    return getRowCardsCount() * verticalCardsCountTotal;
}

function getRowCardsCount() {
    const horizontalGap = parseInt(getComputedStyle(CARDS_CONTAINER).columnGap);
    const horizontalCardsCount = Math.floor(PAGINATOR.offsetWidth / CARD_WIDTH);
    return Math.floor((PAGINATOR.offsetWidth - (horizontalCardsCount - 1) * horizontalGap) / CARD_WIDTH);
}

document.querySelector(".our-friends__paginator-buttons").addEventListener("click", (event) => {
    switch (event.target.id) {
        case "first":
            setPaginatorPage(1);
            break;
        case "prev":
            setPaginatorPage(currentPageNumber - 1);
            break;
        case "next":
            setPaginatorPage(currentPageNumber + 1);
            break;
        case "last":
            setPaginatorPage(getLastPageNumber());
            break;
    }
});

function setPaginatorPage(pageNumber) {
    CARDS_CONTAINER.style.top = `${-PAGINATOR.clientHeight * (pageNumber - 1)}px`;
    switchButtonsState(pageNumber);
    PAGE_NUMBER_INDICATOR.textContent = pageNumber;
    currentPageNumber = pageNumber;
}

function switchButtonsState(pageNumber) {
    if (pageNumber == 1) {
        BUTTON_FIRST.className = BUTTON_PREV.className = "button-inactive-small-text";
        BUTTON_NEXT.className = BUTTON_LAST.className = "button-interactive-small-text";
    } else if (pageNumber == getLastPageNumber()) {
        BUTTON_FIRST.className = BUTTON_PREV.className = "button-interactive-small-text";
        BUTTON_NEXT.className = BUTTON_LAST.className = "button-inactive-small-text";
    } else {
        BUTTON_FIRST.className = BUTTON_PREV.className = BUTTON_NEXT.className = BUTTON_LAST.className = "button-interactive-small-text";
    }
}

CARDS_CONTAINER.addEventListener("click", (event)=> {
    const clickedCard = event.target.closest(".pet-card");
    if(clickedCard) {
        showOverlay(createPetPopup(clickedCard.dataset.id));
    }
})