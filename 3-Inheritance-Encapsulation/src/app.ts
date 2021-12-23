abstract class Department {
  // private readonly id: string;
  // private name: string;
  static fiscalYear = 2021;
  // protected indicates that the access of the variable is within the class
  protected employees: string[] = [];

  constructor(protected readonly id: string, 
              public name: string) {
    // this.id = id;
    // this.name = n;
  }


  // you call this method without specifying it in the instantiated object
  static createEmployee(name: string){
    return {name: name}
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    // validation etc
    // this.id = 'd2';
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }

  describe(){
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) { // singleton pattern with private
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance(){ // singleton pattern with private
    if (AccountingDepartment.instance){
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe(this: Department){
    console.log(`This department $(Department)`);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

// ===========================================================
const employee1 = Department.createEmployee('Emanuel');
console.log(employee1);
console.log(Department.fiscalYear);

// ===========================================================
const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// it.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

// ===========================================================
// const accounting = new AccountingDepartment('d2', []);
// getInstance() will create just one instance of the AccountingDepartment
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2); // these two instantiated objects will have the same values because they have the singleton pattern

accounting.mostRecentReport = 'Year End Report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport);

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.printReports();
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();
