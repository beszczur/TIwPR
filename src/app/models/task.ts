export class Task {

  readonly NEW: number = 0;
  readonly IN_PROGRESS: number = 1;
  readonly OUT_OF_DATE: number = 2;
  readonly CANCELED: number = 3;
  readonly DONE: number = 4;

  constructor(
    public id: number,
    public eventId: number,
    public name: string,
    public status: number,
    public priority: number
  ){

  };
}
