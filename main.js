window.addEventListener('load', () => {

   /*----------------------------------------------------*/
   /*----------------------------------------------------*/
   /* Input field, BAC explanation data, and other text */
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

   var results_data = [
      {
         range: 0.0,
         description: 'You are sober.'
      },
      {
         range: '0.01-0.03',
         description: 'Feel relaxed, in a good mood.'
      },
      {
         range: '0.04-0.05',
         description: 'Feel buzzed, social.'
      },
      {
         range: '0.06-0.07',
         description: 'Judgment starts to go down. Feel tired, dizzy, clumsy.'
      },
      {
         range: '0.08-0.09',
         description: 'Impairment in coordination. Feeling sick can start here.'
      },
      {
         range: '0.10-0.14',
         description: 'Clear drop in judgment, coordination, and reaction time.'
      },
      {
         range: '0.15-0.24',
         description: 'Blackouts can start here.'
      },
      {
         range: '0.25-0.39',
         description: 'Could pass out, lose consciousness, or go into a coma.'
      },
      {
         range: '0.4-0.45',
         description: 'This is a lethal dose.'
      },
      {
         range: 0.46,
         description: 'This is a lethal dose.'
      }
   ]

   var initialResultDescription = 'Please fill out BAC calculator to generate results.'

   /*----------------------------------------------------*/
   /*----------------------------------------------------*/
   /* Create fields and attach to DOM container 
   bacInputWrapper is a required div in the platform */

   var bacInputWrapper = document.getElementById('bacInputWrapper')
   var bacResultsWrapper = document.getElementById('bacResultsWrapper')
   console.log(bacInputWrapper)

   function setupBACDomElements() {
      var bac_form = createDomElement('form', ['bac_form'], 'bac_form')
      bac_form.addEventListener('submit', submitHandler)
   
      inputs_data.forEach((input, index) => {
         var input_dom = createInputDom(input.name, input.label, index)
         bac_form.appendChild(input_dom)
      })

      var clearBtn = createDomElement('button', ['clear_btn'])
      clearBtn.setAttribute('type', 'button')
      clearBtn.setAttribute('aria-label', 'Clear all fields and begin again.')
      clearBtn.addEventListener('click', clearHandler)
      clearBtn.innerHTML = 'Clear'
   
      var submitBtn = createDomElement('button', ['submit_btn'])
      submitBtn.setAttribute('type', 'submit')
      submitBtn.innerHTML = 'Enter'

      var resultExplainer = createDomElement('p', ['resultExplainer'], 'resultExplainer')
      resultExplainer.style.display = 'none'
      /*------------------------*/
      bac_form.appendChild(clearBtn)
      bac_form.appendChild(submitBtn)
      bacInputWrapper.appendChild(bac_form)

      bacResultsWrapper.appendChild(resultExplainer)
   }

   setupBACDomElements()

   /*----------------------------------------------------*/
   /*----------------------------------------------------*/
   function clearHandler() {
      var w = document.getElementById('custom_bac_input_0')
      var c = document.getElementById('custom_bac_input_1')
      var h = document.getElementById('custom_bac_input_2')
      w.value = ''
      c.value = ''
      h.value = ''
      w.focus()

      var resultDesc = document.getElementById('resultDesc')
      resultDesc.innerHTML = initialResultDescription

      var resultExplainer = document.getElementById('resultExplainer')
      resultExplainer.innerHTML = ''
      resultExplainer.style.display = 'none'
   }

   /*----------------------------------------------------*/
   /*----------------------------------------------------*/
   function submitHandler(e) {
      e.preventDefault()

      var w = document.getElementById('custom_bac_input_0').value
      var c = document.getElementById('custom_bac_input_1').value
      var h = document.getElementById('custom_bac_input_2').value

      /* if none are empty, calculate */
      if(w !== '' && c !== '' && h !== '') {
         var result = calculateBAC(c, w, h)
         var resultDesc = document.getElementById('resultDesc')
         resultDesc.innerHTML = 'Your BAC is '

         if(parseFloat(result) < 0) {
            result = 0
         }

         var resultContainer = document.createElement('span')
         resultContainer.setAttribute('class', 'resultContainer')
         resultContainer.setAttribute('id', 'resultContainer')

         if(result === 0) {
            resultContainer.innerHTML = result
         }
         else {
            resultContainer.innerHTML = '~' + result
         }
         resultDesc.appendChild(resultContainer)

         /* set explanation */
         var resultExplainer = document.getElementById('resultExplainer')
         resultExplainer.style.display = 'block'
         var explanation = getExplanation(result)
         resultExplainer.innerHTML = explanation
      }
   }

   /*----------------------------------------------------*/
   /*----------------------------------------------------*/
   /* Take BAC result and match it with an explanation */
   function getExplanation(bac) {
      bac = parseFloat(bac)
      var description = null
      
      var resultExplanations = results_data
      var last = resultExplanations.length - 1
   
      if(description == null) {
         for(let x of resultExplanations) {
            if(typeof x.range === 'string') {
               const split = x.range.split('-')
               if(between(bac, split[0], split[1])) {
                  description = x.description
                  break
               }
            }
            else {
               if(bac <= resultExplanations[0].range) {
                  description = resultExplanations[0].description
                  break
               }
               if(bac >= resultExplanations[last].range) {
                  description = resultExplanations[last].description
                  break
               }
            }
         }
      }
      return description
   }

   /*----------------------------------------------------*/
   /*----------------------------------------------------*/
   /* Helper funcs and DOM setup */

   function between(x, min, max) {
      return x >= min && x <= max;
   }

   function calculateBAC(c, w, h) {
      return ([(c / 2) * (9 / w)] - [0.017 * h]).toFixed(2)
   }

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

   function createInputDom(name, label, id) {
      //create input wrapper
      var w = document.createElement('div')
      w.classList.add('input_wrapper')
   
      var input_id = 'custom_bac_input_' + id
      var label_id = 'custom_bac_label_' + id

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