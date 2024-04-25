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

    // animation responsiveness for a wide panorama (between 992 and 1400px)
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
    function responsivePano () {
        if (window.innerWidth < 1400) {
            if ((window.innerWidth / window.innerHeight) > 1.96) {
                newScreenLayout();
                $summaryOfPurchaseCarImg.style.width = "75%";
                $summaryOfPurchaseCarImg.style.position = "relative";
                $summaryOfPurchaseCarImg.style.left = "5%";
            } else if ((window.innerWidth / window.innerHeight) > 1.79) {
                newScreenLayout();
            } else if ((window.innerWidth / window.innerHeight) > 1.77) {
                $summaryOfPurchaseText.forEach(item => item.style.margin = "3px 0");
            }
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
