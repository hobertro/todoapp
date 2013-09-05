// models

var todo1 = new Todo();

// views

var todoview = new todoView({ model: todo1});

console.log(todoview.render().el);

$("#todo").append(todoview.render().el);