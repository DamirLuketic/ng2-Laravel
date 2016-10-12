export class NewTask {
    constructor(public user_id: number, public name: string, public start_date: string,
                public end_date: string, public description: string){}
}
