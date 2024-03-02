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

export interface SetData {
    weight: string,
    repetitions: string,
    rpe: string,
}
export async function getAverageOneRepMax(sets: SetData[]): Promise<number>{
    // Make the POST request to the server with the set data.
    const response = await fetchData('/api/powerlifting/averageonerepmax', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sets),
    });

    // Check if the request was successful.
    if (response.ok) {
        // Parse the JSON response.
        const data = await response.json();
        // Assuming the server returns an object with the key 'averageOneRepMax' holding the result.
        return data.averageOneRepMax;
    } else {
        // If the server response is not ok, throw an error.
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error calculating the average one rep max.');
    }
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