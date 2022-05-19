export class Review {
    for: string;
    from: string;
    polite: number;
    drivingSafe: number;
    vehicle: number;
    service: number;
    helpful: number;


    constructor(forUser: string,
                fromUser: string,
                polite: number,
                drivingSafe: number,
                vehicle: number,
                service: number,
                helpful: number) {

        this.for = forUser;
        this.from = fromUser;
        this.polite = polite;
        this.drivingSafe = drivingSafe;
        this.vehicle = vehicle;
        this.service = service;
        this.helpful = helpful;
    }
}