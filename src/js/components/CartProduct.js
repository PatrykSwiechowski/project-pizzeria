import AmountWidget from "./AmountWidget.js";

class CartProduct {
    constructor(menuProduct, element) {
      const thisCartProduct = this;
      thisCartProduct.getElements(element);
      //thisCartProduct.initActions();
      thisCartProduct.initAmountWidget();
      thisCartProduct.initActions();

      thisCartProduct.id = menuProduct.id;
      thisCartProduct.name = menuProduct.name;
      thisCartProduct.price = menuProduct.price;
      thisCartProduct.priceSingle = menuProduct.priceSingle;
      thisCartProduct.amount = menuProduct.amount;
      thisCartProduct.params = menuProduct.params;
      //console.log('CartProduct', thisCartProduct);

    }
    getElements(element) {
      const thisCartProduct = this;

      thisCartProduct.dom = {};

      thisCartProduct.dom.wrapper = element;

      thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector('.widget-amount');
      thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector('.cart__product-price');
      thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector('[href="#edit"]');
      thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector('[href="#remove"]');

    }

   

    initAmountWidget() {
      const thisCartProduct = this;
      thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
      thisCartProduct.dom.amountWidget.addEventListener('update', function () {
        thisCartProduct.amount = thisCartProduct.amountWidget.value;
        thisCartProduct.price = thisCartProduct.amount * thisCartProduct.priceSingle;
        thisCartProduct.dom.price.innerHTML = thisCartProduct.price;

      });
    }
    //Usuwanie produktu z koszyka

    remove() {
      const thisCartProduct = this;

      const event = new CustomEvent('remove', {
        bubbles: true,
        detail: { // szczegóły przekazywane wraz z eventem, przekazywane do handlera eventu
          cartProduct: thisCartProduct,
        }
      });

      thisCartProduct.dom.wrapper.dispatchEvent(event);
    }
    initActions() {
      const thisCartProduct = this;

      thisCartProduct.dom.edit.addEventListener('click', function (event) {
        event.preventDefault();
      });

      thisCartProduct.dom.remove.addEventListener('click', function (event) {
        event.preventDefault();
        thisCartProduct.remove();
      });


    }

    getData() {
      const thisCartProduct = this;
      const productSummary = {
        id: thisCartProduct.id,
        name: thisCartProduct.name,
        price: thisCartProduct.price,
        priceSingle: thisCartProduct.priceSingle,
        amount: thisCartProduct.amount,
        params: thisCartProduct.params,
      }
      return productSummary;
    }
  }
export default CartProduct;