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

export interface RankRequestData {
    total: number;
    age: number;
    weightClass: number;
    sex: 'M' | 'F';
}

// Function to get user rank from the backend
export async function getUserRank(data: RankRequestData): Promise<number> {
    const queryParams = new URLSearchParams({
        total: data.total.toString(),
        age: data.age.toString(),
        weightClass: data.weightClass.toString(),
        sex: data.sex
    }).toString();

    const response = await fetchData(`/api/powerlifting/user-ranking?${queryParams}`, { method: "GET" });
    const responseData = await response.json(); // Make sure to await the json parsing
    return responseData.ranking; // Assuming the backend sends an object with a 'ranking' key
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
