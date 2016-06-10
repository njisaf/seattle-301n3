var articles = [];

function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());//Shorthand: evaluating the selector for an id. We get all the text out of that object

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  // TODO: Parse the body content through the markdown library api to render any markdown within a new blog article
  this.body = marked(this.body); 

  return template(this);//every instance of Article will have a .toHtml(). Pass the instance of the Handlebars obj into that template and render it. then gets appended at end of this script
};

if (typeof rawData !== 'undefined') {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    articles.push(new Article(ele));
  })
}

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
