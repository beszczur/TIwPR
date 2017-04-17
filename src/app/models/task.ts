export class Task {

  public NEW: number = 0;
  public IN_PROGRESS: number = 1;
  public OUT_OF_DATE: number = 2;
  public CANCELED: number = 3;
  public DONE: number = 4;

  constructor(
    public id: number,
    public eventId: number,
    public name: string,
    public status: number,
    public priority: number
  ){

  };
}
