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

    const $carAccessory1_text = document.querySelector("#car_accessory_1_text");
    const $carAccessory2_text = document.querySelector("#car_accessory_2_text");
    const $carAccessory1_button = document.querySelector("#car_accessory_1_button");
    const $carAccessory2_button = document.querySelector("#car_accessory_2_button");

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
    const carAccessory1_price = 1500;
    const carAccessory2_price = 5000;

    $carAccessory1_button.addEventListener("click", () => {
        symbol1 = !symbol1;
        addAccessories(symbol1, $carAccessory1_text, $carAccessory1_button, carAccessory1_price);
    });

    $carAccessory2_button.addEventListener("click", () => {
        symbol2 = !symbol2;
        addAccessories(symbol2, $carAccessory2_text, $carAccessory2_button, carAccessory2_price);
    });

    function addAccessories(symbol, text, button, price) {
        if (symbol) {
            text.classList.add("green_text");
            button.classList.add("green_button");
            new_chosenCar_price += price;
        } else {
            text.classList.remove("green_text");
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

        $carAccessory1_text.classList.remove("green_text");
        $carAccessory1_button.classList.remove("green_button");
        $carAccessory2_text.classList.remove("green_text");
        $carAccessory2_button.classList.remove("green_button");
    });
  
    // buy button implementation
    $buyButton.addEventListener("click", () => {
        // reading the position of the radio button
        function radioButtonTest(form) {
            for (let i = 0; i < form.payment.length; i++) {
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
