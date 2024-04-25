const $carsSearchBannerSymbolsBox = document.querySelector(".cars_search_banner_symbols_box");
const $mainPage = document.querySelector("main");

const arrayOfMixedCars = carsArray.sort(() => 0.5 - Math.random());
let $listOfCars;
let arrayOfCarsToSort;

const $chosenCarForm = document.querySelector(".chosen_car_form");
const $nameInput = document.querySelector("#name");
const $addressInput = document.querySelector("#address");
const $dateInput = document.querySelector("#date");

let chosenCar_id;
let chosenCar_make_model;
let radioButtonChoice = "";

// starting page presentation / intro
if (sessionStorage.getItem("banner") === "started") {
    setTimeout(() => document.querySelector(".starting_page").style.display = "none", 800);
} else {
    showStartingPage();
}

function showStartingPage() {
    const $startingPage = document.querySelector(".starting_page");
    const $startingPageText = document.querySelector(".starting_page_text");
    const $blueLineAtTheStartingPageBottom = document.querySelector(".starting_page div");
    
    setTimeout(() => {
    const text = "mamy wszystkie samochody, które warto kupić..."
    let textIndex = 0;
    const addText = () => {
        $startingPageText.textContent += text[textIndex];
        textIndex++;
        if (textIndex === text.length) clearInterval(textTyping);
    }
    const textTyping = setInterval(addText, 50);

    $blueLineAtTheStartingPageBottom.classList.remove("blue_line_at_the_starting_page_bottom_start");
    $blueLineAtTheStartingPageBottom.classList.add("blue_line_at_the_starting_page_bottom_end");
    }, 500);

    setTimeout(() => $startingPage.remove(), 5000);
    sessionStorage.setItem("banner", "started");
}

// presentation of the car list and car symbols on the home page
function priceWithSpaces(price) {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} PLN`;
}
function mileageWithSpaces(mileage) {
    return `${mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} km`;
}

function allCars(car) {
    return `
        <section class="list_of_cars col-sm-6 col-xl-4" data-car_id="${car.id}" data-car_make="${car.make}" data-car_model="${car.model}" data-car_year="${car.year}" data-car_price="${car.price}">
            <figure class="rounded">
                <div>
                    <img id="carImage" class="rounded-top" src="./img/${car.id}.jpg">
                    <div id="blueLineAtTheBottom"></div> 
                </div>
                <figcaption class="car_info rounded-bottom">
                    <p>${car.make} ${car.model}</p>
                    <p>${priceWithSpaces(car.price)}</p>
                    <div> 
                        <p><i class="fas fa-calendar-alt"></i> ${car.year}</p>
                        <p><i class="fas fa-gas-pump"></i> ${car.fuel}</p>
                        <p><i class="fas fa-bolt"></i> ${car.power}</p>
                        <p><i class="fas fa-road"></i> ${mileageWithSpaces(car.mileage)}</p>  
                    </div>
                </figcaption>
            </figure>
        </section>
    `
}

function listOfCarsEventListener() {
    $listOfCars = document.querySelectorAll(".list_of_cars");
    $listOfCars.forEach(item => item.addEventListener("click", showForm));
}

function showCars() {
    for (let item of arrayOfMixedCars) {
        $mainPage.innerHTML += allCars(item);
    }
    listOfCarsEventListener();
    arrayOfCarsToSort = arrayOfMixedCars;
}

function showCarsSymbols(...carMake) {
    for (let i = 0; i < carMake.length; i++) {
        const $carSymbol = document.createElement("img");
        $carSymbol.src = `./img/${carMake[i]}.png`;
        $carsSearchBannerSymbolsBox.appendChild($carSymbol);
    }
    if (carMake.length < 4) {
        $carsSearchBannerSymbolsBox.style.justifyContent = "space-around";
    } else {
        $carsSearchBannerSymbolsBox.style.justifyContent = "space-between";
    }
}

setTimeout(() => {
    showCars();
    showCarsSymbols("Audi", "BMW", "Citroen", "Ford", "Opel", "Peugeot", "Renault");
 }, 200);

// car search engine by car make (home page)
function removeCarsSymbols() {
    $carsSearchBannerSymbolsBox.innerHTML = "";
}

function showCarsMake(carMake) {
    $listOfCars.forEach(item => item.remove());

    const arrayOfFilteredCars = carsArray.filter((item) => item.make === carMake);
    for (let item of arrayOfFilteredCars) {
        $mainPage.innerHTML += allCars(item);
    }
    listOfCarsEventListener();
    arrayOfCarsToSort = arrayOfFilteredCars;
}

const $carsSearchList = document.getElementById("cars_search_list");
$carsSearchList.addEventListener("change", () => {
    switch ($carsSearchList.value) {
        case "0": $listOfCars.forEach(item => item.remove());
                removeCarsSymbols();
                showCars();
                showCarsSymbols("Audi", "BMW", "Citroen", "Ford", "Opel", "Peugeot", "Renault");
                break;
        case "1": showCarsMake("Audi");
                removeCarsSymbols();
                showCarsSymbols("Audi", "Audi", "Audi");
                break;
        case "2": showCarsMake("BMW");
                removeCarsSymbols();
                showCarsSymbols("BMW", "BMW", "BMW");
                break;
        case "3": showCarsMake("Citroen");
                removeCarsSymbols();
                showCarsSymbols("Citroen", "Citroen", "Citroen");
                break;
        case "4": showCarsMake("Ford");
                removeCarsSymbols();
                showCarsSymbols("Ford", "Ford", "Ford");
                break;
        case "5": showCarsMake("Opel");
                removeCarsSymbols();
                showCarsSymbols("Opel", "Opel", "Opel");
                break;
        case "6": showCarsMake("Peugeot");
                removeCarsSymbols();
                showCarsSymbols("Peugeot", "Peugeot", "Peugeot");
                break;
        case "7": showCarsMake("Renault");
                removeCarsSymbols();
                showCarsSymbols("Renault", "Renault", "Renault");
                break;
    }
});

// car sort engine (home page)
function showSortedCars(sortingCategory) {
    $listOfCars.forEach(item => item.remove());

    let arrayOfSortedCars;
    if (sortingCategory === "lowPrice") {
        arrayOfSortedCars = arrayOfCarsToSort.sort((a, b) => (a.price - b.price));
    } else if (sortingCategory === "highPrice") {
        arrayOfSortedCars = arrayOfCarsToSort.sort((a, b) => (b.price - a.price));
    } else if (sortingCategory === "lowMileage") {
        arrayOfSortedCars = arrayOfCarsToSort.sort((a, b) => (a.mileage - b.mileage));
    } else if (sortingCategory === "highMileage") {
        arrayOfSortedCars = arrayOfCarsToSort.sort((a, b) => (b.mileage - a.mileage));
    }

    for (let item of arrayOfSortedCars) {
        $mainPage.innerHTML += allCars(item);
    }
    listOfCarsEventListener();
}

const $carsSortList = document.getElementById("cars_sort_list");
$carsSortList.addEventListener("change", () => {
    switch ($carsSortList.value) {
        case "1": showSortedCars("lowPrice");
                break;
        case "2": showSortedCars("highPrice");
                break;
        case "3": showSortedCars("lowMileage");
                break;
        case "4": showSortedCars("highMileage");
                break;
    }
});

// refreshing the website - back to home page
const $backToMainPage = document.querySelector(".company_logo");
$backToMainPage.addEventListener("click", () => history.go());
