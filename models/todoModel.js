var Todo = Backbone.Model.extend({
	defaults: {
		title: '',
		completed: false
	}
});

var todo1 = new Todo();
