export class Review {
    for: string;
    polite: number;
    drivingSafe: number;
    vehicle: number;
    service: number;
    helpful: number;


    constructor(forUser: string,
                polite: number,
                drivingSafe: number,
                vehicle: number,
                service: number,
                helpful: number) {

        this.for = forUser;
        this.polite = polite;
        this.drivingSafe = drivingSafe;
        this.vehicle = vehicle;
        this.service = service;
        this.helpful = helpful;
    }
}