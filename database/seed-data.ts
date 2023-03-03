interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Prueba 1',
            status: 'pending',
            createAt: Date.now()
        },
        {
            description: 'Prueba 2',
            status: 'in-progress',
            createAt: Date.now()
        },
        {
            description: 'Prueba 3',
            status: 'finished',
            createAt: Date.now()
        }
    ]
}