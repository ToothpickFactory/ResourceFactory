
import { ItemsResource } from './resources/ItemsResource';
window.ItemsResource = ItemsResource

ItemsResource.observable.subscribe(resources => {
	const body = document.querySelector('body');
	body.innerHTML = '';
	resources.map(resource => {
		body.innerHTML += `<div>${JSON.stringify(resource)}</div>`;
	})
})