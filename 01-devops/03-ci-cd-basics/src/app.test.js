/**
 * Test suite for Calculator Application
 *
 * These tests will run in the CI/CD pipeline.
 * Complete the GitHub Actions workflow to run these tests automatically.
 */

const { add, subtract, multiply, divide, percentage, isEven, isPrime } = require('./app');

describe('Calculator Functions', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should handle zero', () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should handle negative results', () => {
      expect(subtract(3, 5)).toBe(-2);
    });

    it('should handle zero', () => {
      expect(subtract(5, 0)).toBe(5);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should handle zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(multiply(-3, 4)).toBe(-12);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should handle decimals', () => {
      expect(divide(7, 2)).toBe(3.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
    });
  });

  describe('percentage', () => {
    it('should calculate percentage correctly', () => {
      expect(percentage(100, 50)).toBe(50);
    });

    it('should handle decimal percentages', () => {
      expect(percentage(200, 12.5)).toBe(25);
    });

    it('should handle zero', () => {
      expect(percentage(100, 0)).toBe(0);
    });
  });

  describe('isEven', () => {
    it('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
    });

    it('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(3)).toBe(false);
      expect(isEven(5)).toBe(false);
    });

    it('should handle negative numbers', () => {
      expect(isEven(-2)).toBe(true);
      expect(isEven(-3)).toBe(false);
    });
  });

  describe('isPrime', () => {
    it('should return true for prime numbers', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(5)).toBe(true);
      expect(isPrime(7)).toBe(true);
      expect(isPrime(11)).toBe(true);
    });

    it('should return false for non-prime numbers', () => {
      expect(isPrime(1)).toBe(false);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(6)).toBe(false);
      expect(isPrime(9)).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(-5)).toBe(false);
    });
  });
});
