console.log("connected");
const updateBothImages = (imgArgs) => {
// imgArgs are the placeholder That contains the url of the updated img THiS arg is passed down by the eventListener
const mainImg = document.querySelector('.dynamic img');
mainImg.src = imgArgs;

console.log("Dynamic Image Chnage");

const secondaryImg = document.querySelector('.dynamic2 img');
secondaryImg.src = imgArgs;
secondaryImg.style.width = '300px';
secondaryImg.style.borderRadius = '50px';

console.log("Dynamic2 Image Chnage")

console.log("BOTH IMAGES HAVE BEEN CHANGED ACCORDING TO THE SELECTED THUMBNAIL")
};

document.querySelectorAll('.thumbnail p').forEach(p => {
p.addEventListener('click', () => {
const imgSrc = p.querySelector('img').src;

updateBothImages(imgSrc);
console.log("FUNCTION UpdateBothImages Have been called On Click Thumbnail")

document.querySelector('.thumbnail p.selected')?.classList.remove('selected');
p.classList.add('selected');
});
});

let product = null;
let matchedVariant;

const updateImages = (matchedVariant) => {
if (matchedVariant.featured_image) {

console.log("ON RADIO change FUNCTION updateImages has been called with ARGS matchedVariant ")

// Update the main product image
const mainImg = document.querySelector('.dynamic img'); // WHY TARGET IMG HERE NOT IN NEAT
mainImg.src = matchedVariant.featured_image.src;
mainImg.style.width = '664px';
mainImg.style.height = '870.7px';
mainImg.style.paddingTop = '0px';

console.log("Dynamic Image Chnage according to radio CHANGE")
}

// Update the Secondary Image
const secondImg = document.querySelector('.dynamic2 img'); // WHY TARGET IMG HERE NOT IN NEAT
console.log(secondImg, matchedVariant.featured_image);
secondImg.src = matchedVariant.featured_image.src;
secondImg.style.width = '300px';

console.log("Dynamic2 Image Chnage according to radio CHANGE")
document.querySelector('input[name="id"]').value = matchedVariant.id;

// Log to check if the input value is updated correctly
console.log('Updated hidden input value:', matchedVariant.id);


// Update the selected thumbnail
// Deselect all currently selected thumbnails (target all divs)
document.querySelectorAll('.thumbnail p.selected').forEach(p => p.classList.remove('selected'));
// Select the new thumbnail based on matchedVariant.id (across all divs)
document.querySelectorAll(`.thumbnail p[data-variant-id="${matchedVariant.id}"]`).forEach(p =>
p.classList.add('selected'));
// Log the action to track the changes
console.log("THUMBNAIL image FRAME has been changed/selected across all thumbnail divs");
// Get the image element based on matchedVariant's featured image id
const ImageId = document.querySelector(`[data-id="${matchedVariant.featured_image.id}"]`);
ImageId?.classList.add('selected'); // Add 'selected' class to the corresponding image

// Log the image that was selected for debugging purposes
console.log("Thumbnail Frame has been changed according to the selected thumbnail");
console.log(`Image id is:`, ImageId);
};

const findMatchedVariant = () => {
console.log("Function findMatchedVariant is Executed That will store radio SELECTED BUTTONS IN ARRAY")

let selectedOptions = [];

document.querySelectorAll('.product-option input[type="radio"]:checked').forEach(radio => {
selectedOptions.push(radio.value);
});
// Find the matching variant based on selected options
return product.variants.find(variant => {
return selectedOptions.every((option, index) => option === variant.options[index]);
console.log("findImageVarinat FUNCTION has returned the matchedVAriant")

});
}

document.querySelectorAll('.product-option input[type="radio"]').forEach(radio => {
radio.addEventListener('change', () => {
// matchedVariant = '';
const matchedVariant = findMatchedVariant();
if (matchedVariant) {
const url = `?variant=${matchedVariant.id}`;


window.history.replaceState(null, null, url.toString());
updateImages(matchedVariant);
const priceElement = document.querySelector('.product-price');
priceElement.textContent = `${matchedVariant.price | money }rs `;
const priceElement2 = document.querySelector('.product-compare');
priceElement2.textContent = `${matchedVariant.compare_at_price}rs`;

}
});
});

// code used to select the variant when clicked on the box instead of label (usual functonality of the radio buttons)
// document.querySelectorAll('.option-box').forEach(box => {
// box.addEventListener('click', function() {
// const radioId = this.getAttribute('data-id');
// document.getElementById(radioId).checked = true;
// });
// });



// this below code is used to operate the Quantity selector
document.querySelectorAll('.cart-page-quantity-minus, .cart-page-quantity-plus').forEach(button => {
button.addEventListener('click', function () {
const isIncrease = this.classList.contains('cart-page-quantity-plus');
const lineItemKey = this.getAttribute('data-line-item-key');
const quantityInput = this.parentElement.querySelector('#quantity');

// Ensure the quantity is a valid number
let currentQuantity = parseInt(quantityInput.value, 10) || 0;

// Update quantity based on button click
const newQuantity = isIncrease ? currentQuantity + 1 : currentQuantity - 1;
if (newQuantity <= 0) return; // Send AJAX request to update cart fetch('/cart/update.js', { method: 'POST' , headers:
    { 'Content-Type' : 'application/json' , 'Accept' : 'application/json' }, body: JSON.stringify({ updates: {
    [lineItemKey]: newQuantity } }) }) .then(response=> response.json())
    .then(updatedCart => {
    quantityInput.value = newQuantity; // Update the input field with the new quantity
    })
    .catch(error => console.error('Error updating cart:', error));
    });
    });



    //WEB COMPONENT USED TO DRAW HORIZONTAL LINE IN THE RPODUCT DEXCRIPTION
    // this is the older outdated code and below is the updated code with the hover effect
    
    // here does ends the horizontal line outdated web component and here starts the new component with hover effect

    class HorizontalLine extends HTMLElement {
    constructor() {
    super();
    }
    }

    customElements.define('horizontal-line', HorizontalLine);


    // WEb component to make the Q/A Drawer that opens and closes on triggering the arrow button

    class detailDrawer extends HTMLElement {
    constructor() {
    super();
    this.init();
    }

    init() {
    const question = this.getAttribute('question');
    const answer = this.getAttribute('answer');

    this.innerHTML = `
    <div class="faq-question" onclick="this.classList.toggle('open'); toggleAnswer(this)">
        <span>${question}</span>
        <span class="arrow"><i class="fa-solid fa-arrow-up-long"></i></span>
    </div>
    <div class="faq-answer">
        <p>${answer}</p>
    </div>`;
    }
    }
    function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    }
    customElements.define('details-drawer', detailDrawer);

    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    
                                                              <!-- SIDE BAR JAVASCRIPT CODE -->
    

    const cart = document.querySelector('.cart--btn');
    const sidepage = document.querySelector('.side__page');
    cart.addEventListener('click', () => {
    console.log("add to cart button has been clicked o product page");
    document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
    form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("add to cart button has been prevented from default working");


    
    // Capture the dynamically selected variant ID
    const selectedId = document.querySelector('input[name="id"]').value;
    const quantityValue = document.querySelector('#quantity').value;

    console.log(`id of Variant is :` + selectedId + ` & quantity selcted for varaint is ` + quantityValue);
    // Use fetch to add the item to the cart via POST request
    let formData = {
    'items': [{
    'id': selectedId,
    'quantity': quantityValue
    }]
    };
    console.log("FORM DATA IS GIVEN BELOW");
    console.log(formData);
    console.log("FORM DATA in jSON strongify IS GIVEN BELOW");
    console.log(JSON.stringify(formData));

    fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
    })
    .then(response => {
    return response.json();
    }).then(data => {

    console.log("FORM RESPONSE DATA IS GIVEN BELOW");
    console.log(data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });

    // Update cart item count and drawer content
    // updateCartItemCounts(cart.item_count);
    // await updateCartDrawer();
    });
    });
    sidepage.classList.toggle('active');
    console.log("active class has ben toggled ")
    }
    );