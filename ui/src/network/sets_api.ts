import { Set } from '../models/set';
import { User } from '../models/user';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User>{
    const response = await fetchData("/api/users", { method: "GET"});
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
     { method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
});
    return response.json();
}

export interface UserInput {
    fullName: string,
    age: string,
    weight: string,
    sex: string,
    bestSquat: string,
    bestBenchPress: string,
    bestDeadlift: string,
    bestTotal: string,
    squatGoal: string,
    benchPressGoal: string,
    deadliftGoal: string,
    totalGoal: string,
}

export async function updateUser(userId: string, user: UserInput): Promise<User>{
    const response = await fetchData("/api/users/" + userId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
     { method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
});
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST"});
}

export async function fetchSets(): Promise<Set[]>{
    const response = await fetchData("/api/sets", {method: "GET"});
    return response.json();
}

export interface SetInput {
    exerciseName: string,
    weight: string,
    repetitions: string,
    rpe: string,
    date: string,
}

export async function createSet(set: SetInput): Promise<Set>{
    const response = await fetchData("/api/sets",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(set),
    });
    return response.json();
}

export async function updateSet(setId: string, set: SetInput): Promise<Set> {
    const response = await fetchData("/api/sets/" + setId,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(set),
    });
    return response.json();
}

export async function deleteSet(setId: string){
    await fetchData("api/sets/" + setId, { method: "DELETE"});
}