import { Departement } from "./Departement";
import { PositionningAgainstBenchmark } from "./PositionningAgainstBenchmark";

export class Activite{ 
    id: number;
    name: string ;
    nbEmployees: number;
    unitPerformance: number;
    driverProductivite: string;
    valueDriverProductivite: number;
    minValueBenchmarkDriverProductivite: number;
    maxValueBenchmarkDriverProductivite: number;
    positionningAgainstBenchmark: PositionningAgainstBenchmark;
    // departement: Departement;

    constructor(name: string = '', nbEmployees: number = null, unitPerformance: number = -1, driverProductivite: string = '',
    valueDriverProductivite: number = -1, minValueBenchmarkDriverProductivite: number = -1, maxValueBenchmarkDriverProductivite: number = -1,
    positionningAgainstBenchmark: PositionningAgainstBenchmark = null, departement: Departement = null
    ) {
        this.name = name;
        this.nbEmployees = nbEmployees;
        this.unitPerformance = unitPerformance;
        this.driverProductivite = driverProductivite;
        this.valueDriverProductivite = valueDriverProductivite;
        this.minValueBenchmarkDriverProductivite = minValueBenchmarkDriverProductivite;
        this.maxValueBenchmarkDriverProductivite = maxValueBenchmarkDriverProductivite;
        this.positionningAgainstBenchmark = positionningAgainstBenchmark;
        // this.departement = departement;
      }
}