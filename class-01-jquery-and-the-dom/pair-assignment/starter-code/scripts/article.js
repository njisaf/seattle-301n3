

var articles = [];

function Article (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorURL = opts.authorURL;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.attr('data-category', this.category);

  $newArticle.find('header > h1').text(this.title);

  $newArticle.find('header > div > address').html('<a href="' + this.authorURL + '">' + this.author + '</a>');

  $newArticle.find('.article-body').html(this.body);

  // TODO: Use jQuery to fill in the template with properties
  // from this particular Article instance. We need to fill in:
  // the author name and url, the article title and body, and the
  // publication date.

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn)

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')

  $newArticle.append('<hr>');

  $newArticle.removeClass('template');

  return $newArticle;
}

var loadData = function() {

  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    alert("hello test");
  });
  rawData.forEach(function(ele) {
    articles.push(new Article(ele))
  });

  articles.forEach(function(a){
    $('#articles').append(a.toHtml())
  });
}

$(document).ready(function(){
  loadData();
  // alert("load test");
});
