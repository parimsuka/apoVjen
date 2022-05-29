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
    fromObject: any;
    toObject: any;
    bookedBy: string[];
    completed: boolean;
}