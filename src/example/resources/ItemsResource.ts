import { ResourceFactory } from '../../lib/ResourceFactory';
import { Item } from '../models/Item';

@ResourceFactory({
	model: Item
})
export class ItemsResource { }