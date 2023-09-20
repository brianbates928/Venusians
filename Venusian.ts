export default class Venusian {

  private static nextVSN = 1;

  private readonly vsn: number;
      
  constructor(private readonly name: string) {
    this.vsn = Venusian.nextVSN;
    Venusian.nextVSN += 1;
  }
      
  getName(): string {
    return this.name;
  }
      
  getVsn(): number {
    return this.vsn;
  }
      
} 
