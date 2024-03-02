export interface SetData {
    weight: string;
    repetitions: string;
    rpe: string;
  }

interface RpeChart {
    [key: string]: { [key: string]: number };
  }
  
  const rpeChart: RpeChart = {
    "10": {"1": 100, "2": 95.5, "3": 92.2, "4": 89.2, "5": 86.3, "6": 83.7, "7": 81.1, "8": 78.6, "9": 76.2, "10": 73.9, "11": 70.7, "12": 68.0},
    "9.5": {"1": 97.8, "2": 93.9, "3": 90.7, "4": 87.8, "5": 85.0, "6": 82.4, "7": 79.9, "8": 77.4, "9": 75.1, "10": 72.3, "11": 69.4, "12": 66.7},
    "9": {"1": 95.5, "2": 92.2, "3": 89.2, "4": 86.3, "5": 83.7, "6": 81.1, "7": 78.6, "8": 76.2, "9": 73.9, "10": 70.7, "11": 68.0, "12": 65.3},
    "8.5": {"1": 93.9, "2": 90.7, "3": 87.8, "4": 85.0, "5": 82.4, "6": 79.9, "7": 77.4, "8": 75.1, "9": 72.3, "10": 69.4, "11": 66.7, "12": 64.0},
    "8": {"1": 92.2, "2": 89.2, "3": 86.3, "4": 83.7, "5": 81.1, "6": 78.6, "7": 76.2, "8": 73.9, "9": 70.7, "10": 68.0, "11": 65.3, "12": 62.6},
    "7.5": {"1": 90.7, "2": 87.8, "3": 85.0, "4": 82.4, "5": 79.9, "6": 77.4, "7": 75.1, "8": 72.3, "9": 69.4, "10": 66.7, "11": 64.0, "12": 61.3},
    "7": {"1": 89.2, "2": 86.3, "3": 83.7, "4": 81.1, "5": 78.6, "6": 76.2, "7": 73.9, "8": 70.7, "9": 68.0, "10": 65.3, "11": 62.6, "12": 59.9},
    "6.5": {"1": 87.8, "2": 85.0, "3": 82.4, "4": 79.9, "5": 77.4, "6": 75.1, "7": 72.3, "8": 69.4, "9": 66.7, "10": 64.0, "11": 61.3, "12": 58.6},
  };
  
  
  export const calculateOneRepMax = async (setData: SetData): Promise<number | string> => {
    const { weight, repetitions, rpe } = setData;
    const weightNum = parseFloat(weight);
    const repetitionsNum = parseInt(repetitions, 10).toString();
    const rpeNum = Number(rpe).toString(); // Ensure RPE is in a format like '10', '9.5', etc.

//     console.log(`RPE Num: ${rpeNum}`); // Logging the RPE number
//   console.log(`Repetitions Num: ${repetitionsNum}`); // Logging the repetitions number

  
    if (isNaN(weightNum) || isNaN(parseInt(repetitions, 10)) || isNaN(parseFloat(rpe))) {
      return 'Invalid input';
    }
  
    const rpeRow = rpeChart[rpeNum];
    // console.log(`RPE Row:`, rpeRow); // Logging the row retrieved from the chart
    if (!rpeRow) {
      return 'Invalid RPE value';
    }
  
    const percentage = rpeRow[repetitionsNum];

    // console.log(`Percentage: ${percentage}`); // Logging the percentage
    if (percentage === undefined) {
      return 'Invalid repetitions count';
    }
  
    const oneRepMax = weightNum * 100 / percentage;
    return oneRepMax;
  };


  export const calculateAverageOneRepMax = async (sets: SetData[]): Promise<number | string> => {
    let totalOneRepMax = 0;
    let validSetsCount = 0;
  
    // Calculate 1RM for each set and accumulate
    for (const setData of sets) {
      const oneRepMaxResult = await calculateOneRepMax(setData);
      if (typeof oneRepMaxResult === 'number') {
        totalOneRepMax += oneRepMaxResult;
        validSetsCount++;
      }
      // Handle the case where oneRepMaxResult is an error message string if needed
    }
  
    // Compute the average if there are valid sets, otherwise return an error message
    return validSetsCount > 0 ? totalOneRepMax / validSetsCount : 'No valid sets found';
  }
  
 
