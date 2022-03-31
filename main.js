window.addEventListener('load', () => {
   var bac_form = document.getElementById('bac_form')

   if(bac_form) {
      bac_form.addEventListener('submit', submitHandler)
   }

   function calculateBAC(c, w, h) {
      return ([(c / 2) * (9 / w)] - [0.017 * h]).toFixed(2)
   }


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
})