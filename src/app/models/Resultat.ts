export class Resultat{

    id:number;
    activityName: string;
    driverName: string;
    driverValue: number;
    minBenchmark: number;
    maxBenchmark: number;
    performanceDriver: number;

    constructor(activityName: string = '', driverName: string = '', driverValue: number = null, 
    minBenchmark: number = null, maxBenchmark: number = null) {
            this.activityName = activityName;
            this.driverName = driverName;
            this.driverValue = driverValue;
            this.minBenchmark = minBenchmark;
            this.maxBenchmark = maxBenchmark
      }

}