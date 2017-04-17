import {Task} from "./task";

export class Event {

  constructor(
    public id: number,
    public name: string,
    public position: number,
    public date: string,
    public isRepeatable: boolean,
    public tasks : Task[]
  ){
  };
}
