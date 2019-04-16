import { Card } from './Card.js';

(window as any).Card = Card;

(window as any).unsub1 = Card.subscribe(resources => {
	const body = document.querySelector('body');
	body.innerHTML = '';
	resources.map(resource => {
		body.innerHTML += `<div>${JSON.stringify(resource)}</div>`;
	})
})

// (window as any).unsub2 = Card.subscribe(resources => {
// 	console.log(resources.length)
// })