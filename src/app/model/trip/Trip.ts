export class Trip {
    id: string;
    time: string;
    username: string;
    from: string;
    to: string;
    duration: {
        hours: number,
        minutes: number
    };
    availablePlaces: number;
    bookedBy: string[]
}