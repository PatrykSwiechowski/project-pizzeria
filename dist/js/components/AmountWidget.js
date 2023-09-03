import {settings, select} from './settings.js';
class AmountWidget {
    constructor(element) {
      const thisWidget = this;
      //console.log('AmountWidget:', thisWidget);
      //console.log('constructor arguments:', element);
      thisWidget.getElements(element);
      thisWidget.setValue(settings.amountWidget.defaultValue);
      thisWidget.initActions();
    }

    getElements(element) {
      const thisWidget = this;

      thisWidget.element = element;
      thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
      thisWidget.inputIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
      thisWidget.inputDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);

    }
    setValue(value) {
      const thisWidget = this;
      const newValue = parseInt(value);

      /*Dodawanie walidacji*/

      //thisWidget.value = newValue;
      //thisWidget.input.value = thisWidget.value;
      if ((thisWidget.value !== newValue && !isNaN(newValue)) &&
        (value <= settings.amountWidget.defaultMax && value >= settings.amountWidget.defaultMin)) {
        thisWidget.value = newValue;
      }
      thisWidget.input.value = thisWidget.value;

      this.announce();

    }
    /* Informowanie produktu o zmianie, wywoływanie eventu*/
    announce() {
      const thisWidget = this;

      const event = new CustomEvent('update', {
        bubbles: true
      });
      thisWidget.element.dispatchEvent(event);
    }

    initActions() {
      const thisWidget = this;
      thisWidget.input.addEventListener('change', function () {
        thisWidget.setValue(thisWidget.input.value);
      })
      thisWidget.inputDecrease.addEventListener('click', function (event) {
        event.preventDefault();
        let thisWidgetDecrease = thisWidget.value - 1;
        thisWidget.setValue(thisWidgetDecrease);
      })
      thisWidget.inputIncrease.addEventListener('click', function (event) {
        event.preventDefault();
        let thisWidgetIncrease = thisWidget.value + 1;
        thisWidget.setValue(thisWidgetIncrease);
      })

    }

  }

  export default AmountWidget;
