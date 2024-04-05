import { getUserWeightClass, isWithinAgeClass } from '../util/rankingCalculator';

describe('getUserWeightClass', () => {
  const validWeightClasses = {
    M: ['59', '66', '74', '83', '93', '105', '120', '120+'],
    F: ['47', '52', '57', '63', '69', '76', '84', '84+']
  };

//   Male weight classes test

  test('should return the correct weight class for a male lifter', () => {
    expect(getUserWeightClass(70, 'M', validWeightClasses)).toBe('74');
    expect(getUserWeightClass(85, 'M', validWeightClasses)).toBe('93');
    expect(getUserWeightClass(50, 'M', validWeightClasses)).toBe('59');
    expect(getUserWeightClass(59, 'M', validWeightClasses)).toBe('59');
    expect(getUserWeightClass(60, 'M', validWeightClasses)).toBe('66');


  });

  test('should return the heaviest weight class for an overweight male lifter', () => {
    expect(getUserWeightClass(130, 'M', validWeightClasses)).toBe('120+');
    expect(getUserWeightClass(200, 'M', validWeightClasses)).toBe('120+');

  });

  // Female weight classes test

  test('should return the correct weight class for a female lifter', () => {
    expect(getUserWeightClass(40, 'F', validWeightClasses)).toBe('47');
    expect(getUserWeightClass(48, 'F', validWeightClasses)).toBe('52');
    expect(getUserWeightClass(63, 'F', validWeightClasses)).toBe('63');
    expect(getUserWeightClass(75, 'F', validWeightClasses)).toBe('76');
    expect(getUserWeightClass(77, 'F', validWeightClasses)).toBe('84');


  });

  test('should return the heaviest weight class for an overweight female lifter', () => {
    expect(getUserWeightClass(85, 'F', validWeightClasses)).toBe('84+');
    expect(getUserWeightClass(200, 'F', validWeightClasses)).toBe('84+');

  });
});

describe('isWithinAgeClass', () => {
  test('should return true for an age within the class range', () => {
    expect(isWithinAgeClass(23, '20-23')).toBe(true);
    expect(isWithinAgeClass(22, '20-23')).toBe(true);
    expect(isWithinAgeClass(40, '40-44')).toBe(true);
    expect(isWithinAgeClass(44, '40-44')).toBe(true);
  });

  test('should return false for an age outside the class range', () => {
    expect(isWithinAgeClass(24, '20-23')).toBe(false);
    expect(isWithinAgeClass(19, '20-23')).toBe(false);
    expect(isWithinAgeClass(45, '40-44')).toBe(false);

  });

});
