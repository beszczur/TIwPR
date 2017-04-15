import {Task} from "./task";

export class Event {

  constructor(
    public id: number,
    public name: string,
    public priority: number,
    public date: string,
    public isRepeatable: boolean,
    public tasks : Task[]
  ){
  };
}
