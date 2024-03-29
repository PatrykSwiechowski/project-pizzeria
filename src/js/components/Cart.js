import {settings, select, classNames, templates} from '../settings.js';
import CartProduct from './CartProduct.js';
import utils from '../utils.js';

class Cart {
    constructor(element) {
      const thisCart = this;

      thisCart.products = [];

      thisCart.getElements(element);

      thisCart.initActions();

      //console.log('new Cart', thisCart);
    }

    getElements(element) {
      const thisCart = this;

      thisCart.dom = {};

      thisCart.dom.wrapper = element;

      thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);

      thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);

      thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);

      thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);

      thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelector(select.cart.totalPrice);

      thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);

      thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);

      thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);

      thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);



    }

    initActions() {
      const thisCart = this;

      thisCart.dom.toggleTrigger.addEventListener('click', function () {
        thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive)
      });
      thisCart.dom.productList.addEventListener('update', function () {
        thisCart.update();
      })
      thisCart.dom.productList.addEventListener('remove', function (e) {
        thisCart.remove(e.detail.cartProduct);
      })
      thisCart.dom.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisCart.sendOrder();
      })
    }

    sendOrder() {
      const thisCart = this;


      const url = settings.db.url + '/' + settings.db.orders;

      const payload = {
        address: thisCart.dom.address.value,
        phone: thisCart.dom.phone.value,
        totalPrice: thisCart.totalPrice,
        subtotalPrice: thisCart.subtotalPrice,
        totalNumber: thisCart.totalNumber,
        deliveryFee: thisCart.deliveryFee,
        products: [],

      }

      for (let prod of thisCart.products) {
        payload.products.push(prod.getData());
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      };

      fetch(url, options);
      console.log("payload", payload);
    }

    remove(cartProduct) {
      const thisCart = this;
      cartProduct.dom.wrapper.remove();
      const removeProduct = thisCart.products.indexOf(cartProduct);
      thisCart.products.splice(removeProduct, 1);
      thisCart.update();
    }






    add(menuProduct) {
      const thisCart = this

      const generatedHTML = templates.cartProduct(menuProduct);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      thisCart.dom.productList.appendChild(generatedDOM);

      //console.log('adding product', menuProduct);

      thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
      //console.log('thisCart.products', thisCart.products);
      thisCart.update();
    }

    update() {
      const thisCart = this;

      const deliveryFee = settings.cart.defaultDeliveryFee;
      //całościowa liczba sztuk
      thisCart.totalNumber = 0;
      //suma ceny bez dowozu
      thisCart.subtotalPrice = 0;
      for (let product of thisCart.products) {
        //zwiekszenie totalNumber o liczbe sztuk product
        thisCart.totalNumber += product.amount;
        //zwiekszenie o cene całkowitą
        thisCart.subtotalPrice += product.price;
      }
      if (thisCart.totalNumber !== 0) {
        thisCart.totalPrice = thisCart.subtotalPrice + deliveryFee;
      }
      else {
        thisCart.totalPrice = 0;
      }


      thisCart.dom.totalNumber.innerHTML = thisCart.totalNumber;
      thisCart.dom.subtotalPrice.innerHTML = thisCart.subtotalPrice;
      thisCart.dom.deliveryFee.innerHTML = deliveryFee;
      thisCart.dom.totalPrice.innerHTML = thisCart.totalPrice;









      console.log('delivery', deliveryFee)
      console.log('totalNumber', thisCart.totalNumber)
      console.log('subtotalPrice', thisCart.subtotalPrice)
      console.log('totalPrice', thisCart.totalPrice);
      console.log('thisCart', thisCart)
    }
  }
  export default Cart;