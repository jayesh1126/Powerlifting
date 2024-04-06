import {
    calculateAverageRpeByDate,
    calculateVolumeByDate,
    filterSetsByCategory,
    calculateOneRepMax,
    calculateAverageOneRepMax, rpeChart, RpeChart
  } from '../components/DashboardView';
  
const mockSet = [
  {
    // First set of Squat 29th Jan
    _id: '65bf856d815d31ef6e164420',
    userId: '65be8083f4e4b4259735cff5',
    exerciseName: 'Squat',
    weight: '200',
    repetitions: '5',
    rpe: '8',
    date: '2024-01-29T00:00:00.000+00:00',
  },
  {
    // Second set of Squat 29th Jan
    _id: '65bf856d815d31ef6e164420',
    userId: '65be8083f4e4b4259735cff5',
    exerciseName: 'Squat',
    weight: '200',
    repetitions: '5',
    rpe: '9',
    date: '2024-01-29T00:00:00.000+00:00',
  },
  {
    // First set of Bench 29th Jan
    _id: '65bf856d815d31ef6e164420',
    userId: '65be8083f4e4b4259735cff5',
    exerciseName: 'Bench',
    weight: '120',
    repetitions: '5',
    rpe: '7',
    date: '2024-01-29T00:00:00.000+00:00',
  },

  {
    // First set of Squat 20th Feb
    _id: '65bf856d815d31ef6e164420',
    userId: '65be8083f4e4b4259735cff5',
    exerciseName: 'Squat',
    weight: '100',
    repetitions: '2',
    rpe: '6',
    date: '2024-02-20T00:00:00.000+00:00',
  },
  {
    // First set of RDLs 20th Feb
    _id: '65bf856d815d31ef6e164420',
    userId: '65be8083f4e4b4259735cff5',
    exerciseName: 'RDL',
    weight: '180',
    repetitions: '5',
    rpe: '9',
    date: '2024-02-20T00:00:00.000+00:00',
  },
]
  // Testing calculateAverageRpeByDate
  describe('calculateAverageRpeByDate', () => {
    test('should calculate average RPE correctly', () => {
      const result = calculateAverageRpeByDate(mockSet);
      expect(result).toEqual([
        { date: '2024-01-29', averageRpe: 8},
        { date: '2024-02-20', averageRpe: 7.5 },
      ]);
    });
  });
  
  // Testing calculateVolumeByDate
  describe('calculateVolumeByDate', () => {
    test('should calculate volumes by date correctly for squat', () => {
      const result = calculateVolumeByDate(mockSet, 'Squat');
      expect(result).toEqual([
        { date: '2024-01-29', volume: 2000 },
        { date: '2024-02-20', volume: 200 },
      ]);
    });

    test('should calculate volumes by date correctly for bench', () => {
      const result = calculateVolumeByDate(mockSet, 'Bench');
      expect(result).toEqual([
        { date: '2024-01-29', volume: 600 },
      ]);
    });

    test('should calculate volumes by date correctly for RDLs', () => {
      const result = calculateVolumeByDate(mockSet, 'RDL');
      expect(result).toEqual([
        { date: '2024-02-20', volume: 900 },
      ]);
    });
  });

  // Testing filterSetsByCategory
  describe('filterSetsByCategory', () => {
    test('should filter sets by the given category Squat', () => {
      const squats = filterSetsByCategory(mockSet, 'Squat');
      expect(squats.length).toBe(3);
      squats.forEach(set => expect(set.exerciseName).toBe('Squat'));
    });

    test('should filter sets by the given category Bench', () => {
      const bench = filterSetsByCategory(mockSet, 'Bench');
      expect(bench.length).toBe(1);
      bench.forEach(set => expect(set.exerciseName).toBe('Bench'));
    });

    test('should filter sets by the given category All', () => {
      const bench = filterSetsByCategory(mockSet, 'All');
      expect(bench).toEqual(mockSet);
    });
  });

  // Error set
  const errorSet =[
    {
      // First set of Squat 29th Jan
      _id: '65bf856d815d31ef6e164429',
      userId: '65be8083f4e4b4259735cff5',
      exerciseName: 'Squat',
      weight: '200',
      repetitions: '2',
      rpe: '5',
      date: '2024-01-29T00:00:00.000+00:00',
    },
    {
      // First set of Squat 29th Jan
      _id: '65bf856d815d31ef6e164429',
      userId: '65be8083f4e4b4259735cff5',
      exerciseName: 'Squat',
      weight: '200',
      repetitions: '16',
      rpe: '7',
      date: '2024-01-29T00:00:00.000+00:00',
    },
    {
      // First set of Squat 29th Jan
      _id: '65bf856d815d31ef6e164429',
      userId: '65be8083f4e4b4259735cff5',
      exerciseName: 'Squat',
      weight: 'number',
      repetitions: '16',
      rpe: '7',
      date: '2024-01-29T00:00:00.000+00:00',
    },
  ]
  // Testing calculateOneRepMax
  describe('calculateOneRepMax', () => {
    test('should calculate one rep max correctly for the first mock set', () => {
      const oneRepMax = calculateOneRepMax(mockSet[0]);
      expect(oneRepMax).toBeCloseTo(246.609124);
    });

    test('should calculate one rep max correctly for the second mock set', () => {
      const oneRepMax = calculateOneRepMax(mockSet[1]);
      expect(oneRepMax).toBeCloseTo(238.948626045);
    });

    test('should return an error because of rpe value', () => {
      const oneRepMax = calculateOneRepMax(errorSet[0]);
      expect(oneRepMax).toMatch('Invalid RPE value');
    });

    test('should return an error because of repetition count', () => {
      const oneRepMax = calculateOneRepMax(errorSet[1]);
      expect(oneRepMax).toMatch('Invalid repetitions count');
    });

    test('should return an error because of invalid input', () => {
      const oneRepMax = calculateOneRepMax(errorSet[2]);
      expect(oneRepMax).toMatch('Invalid input');
    });
  
  });

  const SquatSet = [
    {
      // Error set of Squat 29th Jan
      _id: '65bf856d815d31ef6e164429',
      userId: '65be8083f4e4b4259735cff5',
      exerciseName: 'Squat',
      weight: '200',
      repetitions: '2',
      rpe: '5',
      date: '2024-01-29T00:00:00.000+00:00',
    },
    {
      // First set of Squat 29th Jan
      _id: '65bf856d815d31ef6e164420',
      userId: '65be8083f4e4b4259735cff5',
      exerciseName: 'Squat',
      weight: '200',
      repetitions: '5',
      rpe: '8',
      date: '2024-01-29T00:00:00.000+00:00',
    },
    {
      // Second set of Squat 29th Jan
      _id: '65bf856d815d31ef6e164420',
      userId: '65be8083f4e4b4259735cff5',
      exerciseName: 'Squat',
      weight: '200',
      repetitions: '5',
      rpe: '9',
      date: '2024-01-29T00:00:00.000+00:00',
    },
  ]

// Testing AverageOneRepMax
  describe('calculateAverageOneRepMax', () => {
    test('should calculate average one rep max correctly for all mock sets', () => {
      const averageOneRepMax = calculateAverageOneRepMax(SquatSet);
      expect(averageOneRepMax).toBeCloseTo(242.8);
    });
    });