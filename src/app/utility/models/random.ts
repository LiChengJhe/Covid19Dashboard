import { v4 as uuid } from 'uuid';
export function GetUUID(): string {
    return uuid();
}

export function GetRandom(max: number, min: number = 1): number {
    return Math.floor(Math.random() * max) + min;
}