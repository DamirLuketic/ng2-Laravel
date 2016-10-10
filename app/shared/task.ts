export class Task {
    constructor(public id:number, public userId: number, public name: string, public start_date: string,
    public end_date: string, public description: string, public status: string, public created_at: string, public updated_at: string){}
}
