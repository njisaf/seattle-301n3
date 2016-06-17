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
  var template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
<<<<<<< HEAD
  // TODO: Parse the body content through the markdown library api to render any markdown within a new blog article
  this.body = marked(this.body);
=======
  this.body = marked(this.body);

>>>>>>> 1074995fd1a8e4d013c8c02ecd15c48f9247806d
  return template(this);
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
