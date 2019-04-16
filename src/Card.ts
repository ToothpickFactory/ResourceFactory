import { Resource } from './Resource.Decorator.js';

@Resource()
export class Card {
	public static subscribe: Function;
	public static unsubscribe: Function;
	public static find: Function;
	public static add: Function;
	public static remove: Function;

	constructor(
		public name:String,
		public guid:String = null
	) { }
}
