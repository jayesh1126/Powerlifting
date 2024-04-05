import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

interface PowerliftingData {
  TotalKg: string;
  WeightClassKg: string;
  Sex: string;
  BirthYearClass: string;
}

// Type for the valid weight classes object
type ValidWeightClasses = {
    [key in 'M' | 'F']: string[];
  };
   
// Function to check if the user's age falls within the age class range
export const isWithinAgeClass = (userAge: number, ageClass: string): boolean => {
  const [lowerBound, upperBound] = ageClass.split('-').map(Number);
  return userAge >= lowerBound && userAge <= upperBound;
};

// Function to determine the weight class of the user based on sex
export const getUserWeightClass = (userWeight: number, sex: 'M' | 'F', validWeightClasses: ValidWeightClasses): string => {
    // Sort weight classes in ascending order
    const sortedWeightClasses = validWeightClasses[sex].sort((a, b) => parseFloat(a.replace('+', '')) - parseFloat(b.replace('+', '')));
    // console.log(sortedWeightClasses);
  
    // Find the right weight class for the user
    for (let i = 0; i < sortedWeightClasses.length; i++) {
      const weightLimit = parseFloat(sortedWeightClasses[i].replace('+', ''));
      if (userWeight <= weightLimit) {
        return sortedWeightClasses[i];
      }
    }
    // Return the heaviest weight class if the user's weight exceeds all others
    return sortedWeightClasses[sortedWeightClasses.length - 1];
  };
  
  // Define valid weight classes for men and women as a typed object
  const validWeightClasses: ValidWeightClasses = {
    M: ['59', '66', '74', '83', '93', '105', '120', '120+'],
    F: ['47', '52', '57', '63', '69', '76', '84', '84+']
  };

export const calculateRanking = async (userTotal: number, userAge: number, userWeight: number, userSex: 'M' | 'F'): Promise<number | string> => {
  const results: number[] = [];
  const csvPath = path.join(__dirname, '..', 'data', 'filtered_openpowerlifting_2024_SBD_Raw_Tested.csv');
  const userWeightClass = getUserWeightClass(userWeight, userSex, validWeightClasses);

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data: PowerliftingData) => {
        const totalKg = parseFloat(data.TotalKg);
        const sex = data.Sex;
        const ageClass = data.BirthYearClass;
        const weightClass = data.WeightClassKg;

        // Type guard to ensure sex is either 'M' or 'F'
        if (sex !== 'M' && sex !== 'F') {
            return; // Skip this row if the sex is not 'M' or 'F'
          }

        if (sex === userSex && isWithinAgeClass(userAge, ageClass) && weightClass === userWeightClass) {
          results.push(totalKg);
        }
      })
      .on('end', () => {
        // Sort the results to find the ranking
        results.sort((a, b) => b - a);
        // After sorting the results in descending order
        const userRank = results.filter((total) => total > userTotal).length + 1;

        resolve(userRank > 0 ? userRank : "User's total not found in the dataset");
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
