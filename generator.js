// prettier-ignore
const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// prettier-ignore
const lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const symbols = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '+', '[', ']', '{', '}', '/', '?', '>', '<']

export default function generatePassword(
  length,
  { hasUpperCase = false, hasLowerCase = false, hasNumber = false, hasSymbol = false } = {},
  minLength = 0,
  maxLength = 20
) {
  let totalChars = []

  if (length === 0) {
    throw new Error('Password Length must not be zero')
  }

  if (length < minLength || length > maxLength) {
    throw new Error(`Password Length must be at least ${minLength} or not greater than ${maxLength}`)
  }

  if (!hasUpperCase && !hasLowerCase && !hasNumber && !hasSymbol) {
    throw new Error('Choose at least one option to generate a password')
  }

  if (hasUpperCase) totalChars = [...upperCaseLetters]
  if (hasLowerCase) totalChars = [...totalChars, ...lowerCaseLetters]
  if (hasNumber) totalChars = [...totalChars, ...numbers]
  if (hasSymbol) totalChars = [...totalChars, ...symbols]

  //   const randomArr = randomSortArr(totalChars);
  // return randomArr.slice(0, length).join('');

  return randomPickArr(totalChars, length).join('')
}

function randomSortArr(arr) {
  return arr.sort(() => 0.5 - Math.random())
}

function randomPickArr(arr, length) {
  let resultArr = []
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.trunc(Math.random() * arr.length)
    resultArr.push(arr[randomIndex])
  }
  return resultArr
}
