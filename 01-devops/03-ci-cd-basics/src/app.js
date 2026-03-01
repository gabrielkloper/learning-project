/**
 * Simple Calculator Application
 *
 * This is a complete working application - NO TODOs HERE!
 * Complete the GitHub Actions workflow in .github/workflows/ci.yml
 */

/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtract two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiply two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divide two numbers
 * @param {number} a - Numerator
 * @param {number} b - Denominator
 * @returns {number} Quotient of a and b
 * @throws {Error} If denominator is zero
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * Calculate percentage
 * @param {number} value - Value
 * @param {number} percentage - Percentage
 * @returns {number} Percentage of value
 */
function percentage(value, percentage) {
  return (value * percentage) / 100;
}

/**
 * Check if number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if even, false otherwise
 */
function isEven(num) {
  return num % 2 === 0;
}

/**
 * Check if number is prime
 * @param {number} num - Number to check
 * @returns {boolean} True if prime, false otherwise
 */
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;

  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }

  return true;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  isEven,
  isPrime,
};
