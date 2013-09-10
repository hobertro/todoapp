// models
/*
$("#enter").on("click", function(){
	var value = $("#inputTodo").val();
	createView(value);
});


function createView(val){
	var newView = new todoView({model: createModel(val)});
	console.log(newView.render().el);
	$("#todos").append(newView.render().el);
}

function createModel(val){
	var todo = new TodoModel({title: val});
	return todo;
}
*/
// app view



var todo1 = new TodoModel();

// views

// test code

var todoview = new todoView({ model: todo1});

$("#todos").append(todoview.render().el);

// collection

var newCollection = new TodoCollection();

// creating new todo models for collection

var todoA = new TodoModel({title: "Practice code", completed: true}),
	todoB = new TodoModel({title: "Go to Piece of Cake", completed: false}),
	todoC = new TodoModel({title: "Sell truck", completed: false});

newCollection.add(todoA);
newCollection.add(todoB);
newCollection.add(todoC);

appview = new AppView({collection: newCollection});

$("#todos").append(appview.render());



