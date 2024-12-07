document.addEventListener('DOMContentLoaded', function() {
    window.selectOffer = function(offerElement) {
        // Deselect all offers
        document.querySelectorAll('.preview-offer').forEach(function(offer) {
            offer.classList.remove('selected');
        });

        // Select the clicked offer
        offerElement.classList.add('selected');

        // Capture the selected quantity from the data attribute of the clicked offer
        var selectedQuantity = offerElement.getAttribute('data-quantity');
        console.log("Selected quantity:", selectedQuantity); // Log the selected quantity for debugging

        // Update the hidden input fields in the Elementor form with the selected quantity
        document.getElementById('form-field-quantity').value = selectedQuantity;

        // Set other product details based on ACF fields
        document.getElementById('form-field-productName').value = '[acf field="product_name"]';
        document.getElementById('form-field-sku').value = '[acf field="sku"]';
        document.getElementById('form-field-price').value = getPrice(selectedQuantity);
        document.getElementById('form-field-country').value = '[acf field="country"]';
        document.getElementById('form-field-currencyCode').value = getCurrencyCode('[acf field="country"]');
        
        // Set date and URL fields
        document.getElementById('form-field-date').value = getCurrentDate();
        document.getElementById('form-field-url').value = '[acf field="product_url"]'; // استخدم حقل ACF لعنوان URL
        
        // Update the button text
        updateButtonText(selectedQuantity);
        
        // Apply the lpColor from an ACF field placeholder, if still needed
        var lpColor = '[acf field="lp_color"]'; // Assuming dynamic replacement works as before
        document.documentElement.style.setProperty('--lp-color', lpColor);
    };

    // Automatically select the first offer on page load
    var initialOffer = document.querySelector('.preview-offer.selected');
    if(initialOffer) {
        selectOffer(initialOffer);
    }
    
    // تحديث العناوين والشارات من حقول ACF
    document.getElementById('offer-title-1').textContent = getOfferTitle(1);
    document.getElementById('offer-badge-1').textContent = getOfferBadge(1);
    document.getElementById('offer-title-2').textContent = getOfferTitle(2);
    document.getElementById('offer-badge-2').textContent = getOfferBadge(2);
    document.getElementById('offer-title-3').textContent = getOfferTitle(3);
    document.getElementById('offer-badge-3').textContent = getOfferBadge(3);
});

function getPrice(selectedQuantity) {
    switch(selectedQuantity) {
        case '1':
            return '[acf field="price"]'; // Placeholder for ACF price field
        case '2':
            return '[acf field="price_for_2"]'; // Placeholder for ACF price for 2 field
        case '3':
            return '[acf field="price_for_4"]'; // Placeholder for ACF price for 3 field
        default:
            return '[acf field="price_for_4"]'; // Default to single price if quantity is unexpected
    }
}

function getOfferBadge(offerNumber) {
    switch(offerNumber) {
        case 1:
            return '[acf field="offer_badge_1"]'; // Placeholder for ACF offer badge 1 field
        case 2:
            return '[acf field="offer_badge_2"]'; // Placeholder for ACF offer badge 2 field
        case 3:
            return '[acf field="offer_badge_3"]'; // Placeholder for ACF offer badge 3 field
        default:
            return ''; // Return empty string if the offer number is unexpected
    }
}

function getOfferTitle(offerNumber) {
    switch(offerNumber) {
        case 1:
            return '[acf field="offer_title_1"]'; // Placeholder for ACF offer title 1 field
        case 2:
            return '[acf field="offer_title_2"]'; // Placeholder for ACF offer title 2 field
        case 3:
            return '[acf field="offer_title_3"]'; // Placeholder for ACF offer title 3 field
        default:
            return ''; // Return empty string if the offer number is unexpected
    }
}

function getCurrencyCode(country) {
    switch(country) {
        case 'Saudi':
            return 'SAR';
        case 'Qatar':
            return 'QAR';
        case 'Kuwait':
            return 'KWD';
        case 'UAE':
            return 'AED';
        case 'Oman':
            return 'OMR';
        default:
            return ''; // Return empty string if the country is unknown
    }
}

function getCurrentDate() {
    var now = new Date();
    var day = now.getDate();
    var month = now.getMonth() + 1; // Months are zero based
    var year = now.getFullYear();

    // Format date as DD/MM/YYYY
    return day + '/' + month + '/' + year;
}

function updateButtonText(selectedQuantity) {
    var buttonText = 'اشتري الآن - ' + getPrice(selectedQuantity) + ' ' + getCurrencyCode('[acf field="country"]');
    document.querySelector('.elementor-field-group.elementor-column.elementor-field-type-submit.elementor-col-100.e-form__buttons .elementor-button-text').textContent = buttonText;
}

function selectSpecifiedOffer() {
    // Find the specified offer element
    var specifiedOfferElement = document.querySelector('.preview-offer.specified');

    // If the specified offer element exists, select it
    if (specifiedOfferElement) {
        selectOffer(specifiedOfferElement);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // استهدف العنصر الذي تريد تطبيق التأثير عليه
    var previewOffers = document.querySelectorAll('#quantity-offers .preview-offer');
    
    previewOffers.forEach(function (offer) {
        offer.addEventListener('click', function () {
            // تأخير لمدة 1 ثانية قبل بدء التمرير
            setTimeout(function () {
                // الانتقال إلى العنصر المطلوب ببطء
                var targetElement = document.querySelector('#headerform'); // تأكد من صحة المحدد
                if (targetElement) {
                    // احصل على المسافة بين العنصر العلوي والجزء العلوي من الصفحة
                    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    var startPosition = window.pageYOffset;
                    var distance = targetPosition - startPosition;
                    var duration = 2000; // مدة التمرير 2 ثانية
                    var startTime = null;

                    function scrollAnimation(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        var timeElapsed = currentTime - startTime;
                        var run = ease(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
                    }

                    function ease(t, b, c, d) {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    }

                    requestAnimationFrame(scrollAnimation);
                }
            }, 50); // 50 ميلي ثانية = 1 ثانية
        });
    });
});
