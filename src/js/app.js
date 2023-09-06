  import { settings, select, classNames, templates } from "./settings.js";
  import Product from './components/Product.js';
  import Cart from './components/Cart.js';

  const app = {
    initPages: function(){
      const thisApp = this;

      thisApp.pages = document.querySelector(select.containerOf.pages).children;
      console.log(thisApp.pages);

      thisApp.activePage(thisApp.pages[0].id);
    },
    activePage: function(pageId){
      const thisApp = this;

      for(let page of thisApp.pages){
        if(page.id == pageId)
        page.classList.add(classNames.pages.active);
      }

    },
    initMenu: function () {
      const thisApp = this;

      //console.log('thisApp.data:', thisApp.data);
      //W tej pętli tworzymy instancje dla każdego produktu
      for (let productData in thisApp.data.products) {
        new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
      }
    },
    //Dostęp do danych z pliku data za pomocą referencji
    initData: function () {
      const thisApp = this;

      thisApp.data = {};
      const url = settings.db.url + '/' + settings.db.products;
      fetch(url)
        .then(function (rawResponse) {
          return rawResponse.json();
        })
        .then(function (parsedResponse) {
          console.log('parsedResponse', parsedResponse);
          thisApp.data.products = parsedResponse;
          thisApp.initMenu();
        });
      console.log('thisApp.data', JSON.stringify(thisApp.data));
    },
    initCart: function () {
      const thisApp = this;

      const cartElem = document.querySelector(select.containerOf.cart)
      thisApp.cart = new Cart(cartElem);

      thisApp.productList = document.querySelector(select.containerOf.menu);
      thisApp.productList.addEventListener('add-to-cart', function(event){
        app.cart.add(event.detail.product);

      })
    },
    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initPages();


      thisApp.initData();
      thisApp.initCart();
    },
  };
  app.init();
