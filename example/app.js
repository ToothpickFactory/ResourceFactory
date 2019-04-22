import { Card } from './Card.js';

window.card = new Card('jim');
window.Card = Card;

const unsub1 = Card.subscribe(resources => {
    const list = document.querySelector('#list');
    list.innerHTML = '';
    resources.map(resource => {
        resource.subscribe(test => console.log(test));
        window[resource.guid] = resource;
        list.innerHTML += `<li>${JSON.stringify(resource)}</li>`;
    });
});

document.querySelector('#add').addEventListener('click', () => {
    Card.add({name: 'bob'});
});