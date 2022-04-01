window.addEventListener('load', () => {
   /*----------------------------------------------------*/
   var inputs_data = [
      {
         name: 'bodyWeight',
         label: 'Body weight in pounds',
         value: ''
      },
      {
         name: 'numDrinks',
         label: 'Number of drinks',
         value: ''
      },
      {
         name: 'numHours',
         label: 'Hours spent drinking',
         value: ''
      }
   ]

   var bacInputWrapper = document.getElementById('bacInputWrapper')
   var bac_form = createDomElement('form', ['bac_form'], 'bac_form')

   bacInputWrapper.appendChild(bac_form)

   /*----------------------------------------------------*/
   function calculateBAC(c, w, h) {
      return ([(c / 2) * (9 / w)] - [0.017 * h]).toFixed(2)
   }

   function createDomElement(type, classes, id) {
      const e = document.createElement(type)
   
      if(id) {
         e.setAttribute('id', id)
      }
      if(classes) {
         classes.forEach(c => e.classList.add(c))
      }
      return e
   }
})