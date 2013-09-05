var Todo = Backbone.Model.extend({
	defaults: {
		title: 'I am a title',
		completed: false
	}
});

var todo1 = new Todo();

