import { Set } from '../models/set';

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

export async function fetchSets(): Promise<Set[]>{
    const response = await fetchData("/api/sets", {method: "GET"});
    return response.json();
}

export interface SetInput {
    userId: string,
    exerciseName: string,
    weight: string,
    repetitions: number,
    rpe: number,
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