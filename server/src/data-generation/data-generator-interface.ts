export type GenerateReturnType = {
    [field: string]: string | number;
}

export interface DataGeneratorInterface {
    generate<T>(count: number): T[];
}