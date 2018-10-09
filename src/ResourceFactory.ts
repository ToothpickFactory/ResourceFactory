import { Subject } from 'rxjs';

export function ResourceFactory(config) {
	const resources = [];
	const model = config.model;
	const observable = new Subject();

	const create = (input) => {
		const resource = new model(input);
		resources.push(resource);
		observable.next(resources);
		return resource;
	}

	const remove = (resource) => {
		const index = resources.findIndex((res) => res === resource);
		resources.splice(index, 1);
		observable.next(resources);
	}

	return (target) => {
		target.resources = resources;
		target.observable = observable;
		target.model = model;
		target.create = create;
		target.remove = remove;
	}
}


/*
(Item) contains a list of items

Item.find()
Item.get()
Item.create()
Item.subscribe()

item.save()
item.update()
item.delete()
item.subscribe()
*/