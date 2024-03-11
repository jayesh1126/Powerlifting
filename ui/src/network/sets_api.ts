import { Set } from '../models/set';

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error || 'An unexpected error occured';
        throw new Error(errorMessage);
    }
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