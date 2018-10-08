export class Item {
	public title: String;
	public value: String;
	constructor(input) {
		this.title = input.title;
		this.value = input.value;
	}

	public do() {
		alert("muhahaha!");
	}
}