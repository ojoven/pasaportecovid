var Storage = {

	get: function (key) {
		let data = localStorage.getItem(key);
		return data;
	},

	set: function (key, data) {
		localStorage.setItem(key, data);
	},

}