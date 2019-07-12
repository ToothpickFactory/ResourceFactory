import { ResourceFactory } from '../../../../dist';

@ResourceFactory()
export class Todo {
  // The below typings are here to reflect
  // the properties ResourceFactory adds to
  // this class. Once decorators become a
  // JS standarded Typescript will add support
  // for classes to auto inherit these typings
  static subscribe: Function;
  static create: Function;
  static remove: Function;
  static subs: Function[];

  constructor(public text: string){}
}
