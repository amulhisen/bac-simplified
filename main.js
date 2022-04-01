window.addEventListener('load', () => {
   // var bac_form = document.getElementById('bac_form')

   // if(bac_form) {
   //    bac_form.addEventListener('submit', submitHandler)
   // }
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

   function createDomElement(type, classes, id) {
      var e = document.createElement(type)
   
      if(id) {
         e.setAttribute('id', id)
      }
      if(classes) {
         classes.forEach(c => e.classList.add(c))
      }
      return e
   }

   var bacInputWrapper = document.getElementById('bacInputWrapper')
   console.log(bacInputWrapper)
   
   var bac_form = createDomElement('form', ['bac_form'], 'bac_form')
   console.log(bac_form)
   bac_form.addEventListener('submit', submitHandler)

   inputs_data.forEach((input, index) => {
      var input_dom = createInputDom(input.name, input.label, index)
      bac_form.appendChild(input_dom)
   })

   var submitBtn = createDomElement('button', ['submit_btn'])
   submitBtn.innerHTML = 'Enter'

   bac_form.appendChild(submitBtn)
   bacInputWrapper.appendChild(bac_form)

   /*----------------------------------------------------*/
   function submitHandler(e) {
      e.preventDefault()

      var form_error = document.getElementById('form_error')

      var w = document.getElementById('input_0').value
      var c = document.getElementById('input_1').value
      var h = document.getElementById('input_2').value

      if(w !== '' && c !== '' && h !== '') {
         var result = calculateBAC(c, w, h)
         var resultDesc = document.getElementById('resultDesc')
         resultDesc.innerHTML = 'Your BAC is '

         var resultContainer = document.createElement('span')
         resultContainer.setAttribute('class', 'resultContainer')
         resultContainer.setAttribute('id', 'resultContainer')
         resultContainer.innerHTML = `~${result}`
         resultDesc.appendChild(resultContainer)

         form_error.classList.remove('active')
      }
      else {
         form_error.classList.add('active')
      }
   }

   /*----------------------------------------------------*/
   function calculateBAC(c, w, h) {
      return ([(c / 2) * (9 / w)] - [0.017 * h]).toFixed(2)
   }

   function createInputDom(name, label, id) {
      //create input wrapper
      var w = document.createElement('div')
      w.classList.add('input_wrapper')
   
      var input_id = `input_${id}`
      var label_id = `label_${id}`
   
      //create input
      var i = document.createElement('input')
      i.setAttribute('id', input_id)
      i.setAttribute('type', 'text')
      i.setAttribute('aria-labelledby', label_id)
      i.setAttribute('inputmode', 'numeric')
      i.setAttribute('name', name)
   
      //create label
      var l = document.createElement('label')
      l.setAttribute('id', label_id)
      l.setAttribute('for', input_id)
      l.innerHTML = label
   
      w.appendChild(i)
      w.appendChild(l)
   
      return w
   }
})