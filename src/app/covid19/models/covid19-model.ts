
export class Country {
    Name?: string;
    ISO2?: string;
    ISO3?: string;
}

export class CountryStat  {
    Country?: Country;
    Stats?: Stat[];
}



export class Stat {
    Confirmed?: number;
    Recovered?: number;
    Deaths?: number;
    Critical?: number;
    CriticalRate?: number;
    RecoveredRate?: number;
    DeathRate?: number;
    MildRate?: number;
    LastUpdate?: Date;
}

