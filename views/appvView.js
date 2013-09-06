var AppView = Backbone.View.extend({

tagName: "ul",

template: Handlebars.compile($("#todo")),

initialize: function(){
	this.$enter = this.$('#enter');
	this.render();
},

events: {

},

render: function(){

}
});

