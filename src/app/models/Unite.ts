import { Activite } from "./Activite";

export class Unite {
    id: number;
    name: string;
    nbEmployees: number;
    activites: Activite[] = [];

    constructor(name: string = '', nbEmployees: number = null, activites: Activite[] = []) {
        this.name = name;
        this.nbEmployees = nbEmployees;
        this.activites = activites;
      }
}