import generatePassword from './generator'

// Querying Elements from the DOM
const errorEl = document.querySelector('#error')
const passwordEl = document.querySelector('#password')
const copyBtnEl = document.querySelector('#copy-btn')
const copyTextEl = document.querySelector('#copy-text')
const lengthSliderEl = document.querySelector('#length-slider')
const lengthValueEl = document.querySelector('#length-value')
const upperCheckEl = document.querySelector('#upper')
const lowerCheckEl = document.querySelector('#lower')
const numCheckEl = document.querySelector('#number')
const symbolCheckEl = document.querySelector('#symbol')
const strengthEls = document.querySelectorAll('.strength')
const strengthTextEl = document.querySelector('.strength-text')
const generateBtnEl = document.querySelector('#generate-btn')

// Variables to pass to password generator function
let length = 0
let min = 0
let max = 20
const passwordOptions = {
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSymbol: false,
}

// Functions
function renderPassword(text) {
  passwordEl.textContent = text
  passwordEl.classList.add('text-white')
}

function renderError(msg) {
  initStrengthTextAndBars()
  passwordEl.textContent = ''
  errorEl.textContent = msg
  errorEl.classList.remove('hidden')
}

function clearError() {
  errorEl.textContent = ''
  errorEl.classList.add('hidden')
}

function toggleOpacEl(element) {
  element.classList.toggle('invisible')
  element.classList.toggle('opacity-0')
  element.classList.toggle('visible')
  element.classList.toggle('opacity-100')
}

function calcStrength() {
  if (length <= 5) return { numOfBars: 1, text: 'Too Weak!' }
  if (length > 5 && length <= 10) return { numOfBars: 2, text: 'Weak' }
  if (length > 10 && length <= 15) return { numOfBars: 3, text: 'Medium' }
  return { numOfBars: 4, text: 'Strong' }
}

//prettier-ignore
function initStrengthTextAndBars() {
  strengthTextEl.classList.remove('visible', 'opacity-100')
  strengthTextEl.classList.add('invisible', 'opacity-0')

  strengthEls.forEach(el =>
    el.classList.remove('border-red-500', 'bg-red-500', 'border-rose-400', 'bg-rose-400', 'border-yellow-accent', 'bg-yellow-accent', 'border-green-accent', 'bg-green-accent')
  )
}

function renderStrengthTextAndBars() {
  initStrengthTextAndBars()

  const { numOfBars, text } = calcStrength()

  strengthTextEl.textContent = text
  strengthTextEl.classList.remove('invisible', 'opacity-0')
  strengthTextEl.classList.add('visible', 'opacity-100')

  strengthEls.forEach((el, i) => {
    if (i < numOfBars && numOfBars === 1) el.classList.add('border-red-500', 'bg-red-500')
    if (i < numOfBars && numOfBars === 2) el.classList.add('border-rose-400', 'bg-rose-400')
    if (i < numOfBars && numOfBars === 3) el.classList.add('border-yellow-accent', 'bg-yellow-accent')
    if (i < numOfBars && numOfBars === 4) el.classList.add('border-green-accent', 'bg-green-accent')
  })
}

// Event Listeners
// Copy Button Event
copyBtnEl.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordEl.textContent)
  toggleOpacEl(copyTextEl)

  setTimeout(() => toggleOpacEl(copyTextEl), 2000)
})

// Options Checkbox Event
;[upperCheckEl, lowerCheckEl, numCheckEl, symbolCheckEl].forEach(el => {
  el.addEventListener('input', e => {
    switch (e.target.name) {
      case 'upper':
        passwordOptions.hasUpperCase = e.target.checked
        break
      case 'lower':
        passwordOptions.hasLowerCase = e.target.checked
        break
      case 'number':
        passwordOptions.hasNumber = e.target.checked
        break
      case 'symbol':
        passwordOptions.hasSymbol = e.target.checked
        break
    }
  })
})

// Length Slider Event
lengthSliderEl.addEventListener('input', e => {
  length = Number(e.target.value)
  lengthValueEl.textContent = e.target.value
  lengthSliderEl.style.backgroundSize = `${(length / max) * 100}% 100%`
})

// Generate Button Event
generateBtnEl.addEventListener('click', () => {
  clearError()

  try {
    renderPassword(generatePassword(length, passwordOptions, min, max))
    renderStrengthTextAndBars()
  } catch (err) {
    renderError(err.message)
  }
})
