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
if (sessionStorage.length === 0) {
    showStartingPage();
} else {
    setTimeout(() => document.querySelector(".starting_page").style.display = "none", 800);
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

setTimeout(showCars(), 4000);
showCarsSymbols("Audi", "BMW", "Citroen", "Ford", "Opel", "Peugeot", "Renault");

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



// presentation of the form
function showForm() {
    const $headerButton = document.querySelector(".header_button");
    const $carsSearchEngine = document.querySelector(".cars_search_engine");
    const $carsSortEngine = document.querySelector(".cars_sort_engine");
    const $carsSearchBanner = document.querySelector(".cars_search_banner");
    const $footer = document.querySelector("footer");

    const $chosenCarFormImg = document.querySelector("#chosen_car_form_img");
    const $chosenCarMainForm = document.querySelector("#chosen_car_main_form");
    const $chosenCarText = document.querySelector("#chosen_car_text_form p:nth-of-type(1)");
    const $chosenCarPrice = document.querySelector("#chosen_car_text_form p:nth-of-type(2)");
    const $backButton = document.querySelector("#backButton");
    const $buyButton = document.querySelector("#buyButton");
    const $alert = document.querySelector("#alert");

    const $carAccessories1 = document.querySelector("#car_accessories_1");
    const $carAccessories2 = document.querySelector("#car_accessories_2");
    const $button1 = document.querySelector("#button_1");
    const $button2 = document.querySelector("#button_2");

    // launching the form
    $listOfCars.forEach(item => item.style.display = "none");
    $mainPage.style.minHeight = "auto";

    $headerButton.style.visibility = "hidden";
    $headerButton.style.height = "0px";
    $headerButton.style.marginTop = "0px";
    $headerButton.style.marginBottom = "0px";
    $carsSearchEngine.style.display = "none";
    $carsSortEngine.style.display = "none";
    $carsSearchBanner.style.display = "none";
    $footer.style.display = "none";

    $chosenCarForm.style.display = "flex";
    $chosenCarFormImg.setAttribute("src", `./img/${this.dataset.car_id}.jpg`);

    // local storage - functions with "getItem()"
    function showRadioData() {
        const paymentData = localStorage.getItem("value");
        for (const item of $chosenCarMainForm.payment) {
            if (item.value === paymentData) {
                item.setAttribute("checked", true);
            }
        }
    }

    function showInputData() {
        const nameData = localStorage.getItem("name");
        const addressData = localStorage.getItem("address");
        $nameInput.value = nameData;
        $addressInput.value = addressData;
    }

    function showDateInputData() {
        const dateData = localStorage.getItem("date");
        $dateInput.value = dateData;
    }

    // calendar formatting (14/15 days from the current date) + setting the date data in local storage
    function dateInputRange() {
        const today = new Date();
        const minDatePlus = new Date();
        const minDate = new Date();

        const todaysDayOfTheWeek = today.getDay();

        minDatePlus.setDate(today.getDate() + 15);
        const showDatePlus = minDatePlus.toISOString().split('T')[0];

        minDate.setDate(today.getDate() + 14);
        const showDate = minDate.toISOString().split('T')[0];

        if (todaysDayOfTheWeek === 0) {
            $dateInput.min = showDatePlus;
            $dateInput.value = showDatePlus;
        } else {
            $dateInput.min = showDate;
            $dateInput.value = showDate;
        }

        $dateInput.addEventListener("change", (e) => {
            const date = new Date(e.target.value);
            if (date.getDay() === 0) {
                $alert.textContent = "Niedziele są niedostępne - wprowadź inny dzień";
                setTimeout(() => {
                    $alert.textContent = null;
                    }, 3000);
                if (todaysDayOfTheWeek === 0) {
                    e.target.value = showDatePlus;
                } else {
                    e.target.value = showDate;
                }
                localStorage.setItem("date", e.target.value);
            } else {
                localStorage.setItem("date", e.target.value);
            }
        });
    }

    // local storage - getting and setting the data
    showRadioData();
    showInputData();

    function showDateOptions() {
        const checkDateData = localStorage.getItem("date");
        if (checkDateData) {
            dateInputRange();
            showDateInputData();
        } else {
            dateInputRange();
        }
    }
    showDateOptions();

    for (const item of $chosenCarMainForm.payment) {
        item.addEventListener("change", (e) => localStorage.setItem("value", e.target.value));
    }
    $nameInput.addEventListener("input", (e) => localStorage.setItem("name", e.target.value));
    $addressInput.addEventListener("input", (e) => localStorage.setItem("address", e.target.value));

    // information texts with car data
    chosenCar_id = this.dataset.car_id;
    chosenCar_make_model = `${this.dataset.car_make} ${this.dataset.car_model}`;
    const chosenCar_make_model_year = `${this.dataset.car_make} ${this.dataset.car_model} (${this.dataset.car_year})`;
    const chosenCar_price = Number(`${this.dataset.car_price}`);

    $chosenCarText.innerText = `Wybrane auto: ${chosenCar_make_model_year}`;
    $chosenCarPrice.innerText = `Cena całkowita: ${priceWithSpaces(chosenCar_price)}`;

    // adding additional accessories
    let new_chosenCar_price = chosenCar_price;
    localStorage.setItem("totalPrice", new_chosenCar_price);
    let symbol1 = false;
    let symbol2 = false;
    const carAccessories1_price = 1500;
    const carAccessories2_price = 5000;

    $button1.addEventListener("click", () => {
        symbol1 = !symbol1;
        addAccessories(symbol1, $carAccessories1, $button1, carAccessories1_price);
    });

    $button2.addEventListener("click", () => {
        symbol2 = !symbol2;
        addAccessories(symbol2, $carAccessories2, $button2, carAccessories2_price);
    });

    function addAccessories(symbol, carAccessories, button, price) {
        if (symbol) {
            carAccessories.classList.add("green_text");
            button.classList.add("green_button");
            new_chosenCar_price += price;
        } else {
            carAccessories.classList.remove("green_text");
            button.classList.remove("green_button");
            new_chosenCar_price -= price;
        }
        showNewChosenCarPrice(new_chosenCar_price);
        localStorage.setItem("totalPrice", new_chosenCar_price);
    }    

    function showNewChosenCarPrice(price) {
        $chosenCarPrice.innerText = `Cena całkowita: ${priceWithSpaces(price)}`
    }

    // back button implementation
    $backButton.addEventListener("click", () => {
        $headerButton.style.visibility = "visible";
        $headerButton.style.height = "39.6px";
        $headerButton.style.marginTop = "10px";
        $headerButton.style.marginBottom = "10px";
        $carsSearchEngine.style.display = "block";
        $carsSortEngine.style.display = "block";
        $carsSearchBanner.style.display = "block";
        $footer.style.display = "block";
        $chosenCarForm.style.display = "none";

        $listOfCars.forEach(item => item.style.display = "block");
        $mainPage.style.minHeight = "100vh";

        $carAccessories1.classList.remove("green_text");
        $button1.classList.remove("green_button");
        $carAccessories2.classList.remove("green_text");
        $button2.classList.remove("green_button");
    });
  
    // buy button implementation
    $buyButton.addEventListener("click", () => {
        // reading the position of the radio button
        function radioButtonTest(form) {
            for (i = 0; i < form.payment.length; i++) {
                if (form.payment[i].checked) {
                    radioButtonChoice = form.payment[i].value;
                }
            }
        }
        radioButtonTest($chosenCarMainForm);

        // name and surname correctness test (2 strings separated by a space)
        function userNameTest(user) {
            return /\d/.test(user) !== true && user.trim().split(' ').length === 2 ? true : false;
        }


        if ($nameInput.value !== "") {
        userNameTest($nameInput.value) ? goToShowSummary() : formAlert();
        }
        
        // stopping the reset and displaying of the summary
        function goToShowSummary() {
            $chosenCarMainForm.addEventListener("submit", (e) => {
                e.preventDefault();
                showSummary();
            });
        }

        // stopping the reset and displaying of the alert
        function formAlert() {
            $chosenCarMainForm.addEventListener("submit", (e) => {
                e.preventDefault();
            });
            $alert.textContent = "Błąd! Wpisz poprawne imię i nazwisko.";
            $nameInput.style.backgroundColor = "rgb(255, 182, 182)";
            $nameInput.focus();

            $nameInput.addEventListener("input", (e) => {
                if (userNameTest(e.target.value)) {
                    $alert.textContent = null;
                    $nameInput.style.backgroundColor = "rgb(248, 248, 255)";
                }
            });
        }
    });

    // zoom of the car photo
    $chosenCarFormImg.addEventListener("click", () => {
        if (window.innerWidth > 992) {
            const $chosenCarImgZoom = document.querySelector(".chosen_car_img_zoom");
            $chosenCarImgZoom.style.display = "block";
            $chosenCarImgZoom.classList.add("img_zoom_background_color");

            const $carImgZoom = document.querySelector(".chosen_car_img_zoom div");
            const $carImgZoomClearButton = document.querySelector(".chosen_car_img_zoom p");

            $carImgZoom.style.backgroundImage = `url(./img/${chosenCar_id}.jpg)`;
            setTimeout(() => {
                $carImgZoom.classList.add("img_zoom_move_down");
            }, 50);

            const clearZoom = (e) => {
                if (e.keyCode === 27 || e.type === "click") {
                    $chosenCarImgZoom.style.display = "none";
                    $carImgZoom.classList.remove("img_zoom_move_down");
                }
            }

            window.addEventListener("keydown", clearZoom);
            $carImgZoomClearButton.addEventListener("click", clearZoom);
        }
    });
}
    


// presentation of the summary
function showSummary() {
    if (showSummary.done) { return; }

    const $headerButton = document.querySelector(".header_button");
    const $summaryOfPurchase = document.querySelector('[data-summary="main"]');
    const $summaryOfPurchaseBox1 = document.querySelector('[data-summary="box1"]');
    const $summaryOfPurchaseCarImg = document.querySelector("#summary_of_purchase_car_img");
    const $summaryOfPurchaseBox2 = document.querySelector('[data-summary="box2"]');

    // launching the summary
    $headerButton.style.display = "none";
    $chosenCarForm.style.display = "none";
    $summaryOfPurchase.style.display = "block";
    $summaryOfPurchaseCarImg.setAttribute("src", `./img/${chosenCar_id}.jpg`);

    // summary animation implementation
    function summaryAnimation() {

        const imageMoveLeft = () => {
            $summaryOfPurchaseBox1.classList.remove("summary_of_purchase_box1_start");
            $summaryOfPurchaseBox1.classList.add("summary_of_purchase_box1_end");
        }
        setTimeout(imageMoveLeft, 500);
        
        const textBackgroundUp = () => {
            $summaryOfPurchaseBox2.classList.remove("summary_of_purchase_box2_start");
            $summaryOfPurchaseBox2.classList.add("summary_of_purchase_box2_end");
        }
        setTimeout(textBackgroundUp, 1500);

        const horizontalLineRight = () => {
            const $horizontalLine = document.querySelector('[data-summary="h_line"]');
            $horizontalLine.classList.remove("horizontalLine_start");
            $horizontalLine.classList.add("horizontalLine_end");
        }
        setTimeout(horizontalLineRight, 2500);

        const verticalLineRight = () => {
            const $verticalLine = document.querySelector('[data-summary="v_line"]');
            $verticalLine.classList.remove("verticalLine_start");
            $verticalLine.classList.add("verticalLine_end");
        }
        setTimeout(verticalLineRight, 2500);
    } 

    // summary texts with key informations
    const $summaryTextParagraphs = [...document.querySelectorAll(".summary_of_purchase_texts p")];
    const summaryTexts = [];

    function changeDateFormat(date) {
        return date.split('-').reverse().join('/');
    }

    summaryTexts.push(`Dziękujemy za zakup samochodu ${chosenCar_make_model}`);
    summaryTexts.push(`Auto zostanie dostarczone ${changeDateFormat($dateInput.value)}`);
    summaryTexts.push(`Wybrana metoda płatności: ${radioButtonChoice}`);
    summaryTexts.push(`Cena auta wraz z akcesoriami: ${priceWithSpaces(localStorage.getItem("totalPrice"))}`);

    let activeLetter = -4;
    let activeText = 0;
    function printSummaryText() {
        if (activeLetter >= 0) {
            $summaryTextParagraphs[activeText].textContent += summaryTexts[activeText][activeLetter];
        }
        activeLetter++;
        if (activeLetter === summaryTexts[activeText].length) {
            activeText++;
            if (activeText === summaryTexts.length) return;
                return setTimeout(() => {
                    activeLetter = -4;
                    printSummaryText();
                }, 400);
        }
        setTimeout(printSummaryText, 25);
    }

    // animation responsiveness for a wide panorama
    const $summaryOfPurchaseText = document.querySelectorAll(".summary_of_purchase_texts p");
    const $summaryOfPurchaseTexts = document.querySelector(".summary_of_purchase_texts");
    
    function newScreenLayout() {
        $summaryOfPurchaseBox1.classList.remove("col-lg-7");
        $summaryOfPurchaseBox1.classList.add("col-lg-6");
        $summaryOfPurchaseBox2.classList.remove("col-lg-5");
        $summaryOfPurchaseBox2.classList.add("col-lg-6");
        $summaryOfPurchaseText.forEach(item => item.style.margin = "3px 0");
        $summaryOfPurchaseTexts.style.left = "115%";
        $summaryOfPurchaseTexts.style.width = "75%";
    }
    const responsivePano = () => {
        if ((window.innerWidth / window.innerHeight) > 1.96) {
            $summaryOfPurchaseCarImg.style.width = "75%";
            $summaryOfPurchaseCarImg.style.position = "relative";
            $summaryOfPurchaseCarImg.style.left = "5%";
            newScreenLayout();
        } else if ((window.innerWidth / window.innerHeight) > 1.79) {
            newScreenLayout();
        } else if ((window.innerWidth / window.innerHeight) > 1.77) {
            $summaryOfPurchaseText.forEach(item => item.style.margin = "3px 0");
        }
    }

    // calling the summary function
    if (window.innerWidth > 992) {
        responsivePano();
        summaryAnimation();
        setTimeout(printSummaryText, 3200);
    } else {
        printSummaryText();
    }

    localStorage.clear();
    showSummary.done = true;
}