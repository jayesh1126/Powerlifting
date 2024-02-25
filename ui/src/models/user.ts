export interface User {
    // All types string because it will come from JSON
    _id: string,
    username: string,
    fullName: string,
    email: string,
    age?: string,
    weight?: string,
    sex?: string,
    bestSquat?: string,
    bestBenchPress?: string,
    bestDeadlift?: string,
    bestTotal?: string,
    squatGoal?: string,
    benchPressGoal?: string,
    deadliftGoal?: string,
    totalGoal?: string,
}