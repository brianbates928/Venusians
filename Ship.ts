import Venusian from './Venusian';

export default class Ship {
  serialNumber = 1;

  crew: Venusian[];

  daughters: Ship[];

  constructor(crew: Venusian[], daughters: Ship[]) {
    this.serialNumber += 1;
    this.crew = crew;
    this.daughters = daughters;
    this.serialNumber += 1;
  }

  getCrew() {
    return this.crew;
  }

  getDaughters(): Ship[] {
    return this.daughters;
  }

  getSerialNumber(): number {
    return this.serialNumber;
  }

  hasWaldo(): boolean {
    return this.crew.some((venusian) => venusian.getName() === 'Waldo');
  }

  totalWaldos(): number {
    // Count Waldo Venusians in the current ship's crew
    const countInCrew = this.crew.filter(venusian => venusian.getName() === 'Waldo').length;

    // Recursively count Waldo Venusians in the daughters' fleets
    const countInDaughters = this.getDaughters().reduce(
      (total, daughter) => total + daughter.totalWaldos(),
      0,
    );

    return countInCrew + countInDaughters;
  }

  removeWaldos(): void {
    this.crew = this.crew.filter((venusian) => venusian.getName() !== 'Waldo');
  }

  removeDeepWaldos(): void {
    // Remove Waldo Venusians from the current ship's crew
    this.crew = this.crew.filter(venusian => venusian.getName() !== 'Waldo');

    // Recursively remove Waldo Venusians from the daughters' fleets
    this.getDaughters().forEach(daughter => daughter.removeDeepWaldos());
  }

  fleetHasDuplicates(): boolean {
  // Create a Set to keep track of seen serial numbers
    const seenSerialNumbers = new Set<number>();
  
    // Check if the current ship's serial number has been seen before
    if (seenSerialNumbers.has(this.getSerialNumber())) {
      return true; // Found a duplicate serial number
    }
  
    // Add the current ship's serial number to the set
    seenSerialNumbers.add(this.getSerialNumber());
  
    // Use recursion to check for duplicates in daughters' fleets
    const daughtersHaveDuplicates = this.getDaughters().some(daughter => daughter.fleetHasDuplicates());
  
    // Check if any daughters have duplicates
    if (daughtersHaveDuplicates) {
      return true; // Found a duplicate in daughters' fleets
    }
  
    // Check if any daughters have duplicates using reduce
    const daughtersWithDuplicates = this.getDaughters().reduce(
      (result, daughter) => result || daughter.fleetHasDuplicates(),
      false,
    );
  
    return daughtersWithDuplicates;
  }
}