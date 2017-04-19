import {Event} from "./event";

export class Day {

  constructor(
    public name: string,
    public date: string,
    public events: Event[]
  ){

  };
}
