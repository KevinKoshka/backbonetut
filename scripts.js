// MODEL

var Blog = Backbone.Model.extend({
	defaults : {
		author : '',
		title : '',
		url : ''
	}
});

//COLLECTION

var Blogs = Backbone.Collection.extend({

});

var blog1 = new Blog({
	author : 'Miguel',
	title  : 'Miguel\'s Blog',
	url    : 'http://mike.com'
});
var blog2 = new Blog({
	author : 'Gervasio',
	title  : 'Gervasio\'s Corner',
	url    : 'http://Gervato.com.ar'
});

var blogs = new Blogs([blog1, blog2]);

//VIEWS

//vista para un solo blog
var BlogView = Backbone.View.extend({
	model : new Blog(),
	tagName : 'tr',
	initialize : function(){
		this.template = _.template($('.blogs-list-template').html());
	}, 
	render : function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});
//Vista para todos los blogs
var BlogsView = Backbone.View.extend({
	model : blogs,
	el : $('.blogs-list'),
	initialize : function() {
		this.model.on('add', this.render, this);
	},
	render : function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog){
			self.$el.append((new BlogView({model : blog})).render().$el);
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function(){
	$('.add-blog').on('click', function(){
		var blog = new Blog({
			author : $('.author-input').val(),
			title : $('.title-input').val(),
			url : $('.url-input').val(),
		});
		console.log(blog);
		blogs.add(blog)

		$('.author-input').val('');
		$('.title-input').val('');
		$('.url-input').val('');
	});
});