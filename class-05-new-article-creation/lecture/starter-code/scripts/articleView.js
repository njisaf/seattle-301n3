// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.toggleNavDisplay = function() {
  $('.icon-menu').on('click', function(e) {
    $('.main-nav ul').toggle();
  });
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.initNewArticlePage = function() {
  // TODO: Ensure the main .tab-content area is revealed. We might add more tabs later.
  
  $(".tab-content").show();

  // TODO: Any new article we create will be copy/pasted into our source data file.
  // Set up this "export" functionality. We can hide it for now, and show it once we
  // have data to export. Also, let's add a focus event to help us select and copy the
  // resulting JSON.

  $('#article-export').hide();
  $('#article-json').on('focus', function() {
    this.select();
  });

  // TODO: Add an event handler to update the preview and the export field if any inputs change.
  $('#new-form').on('change', 'input, textarea', articleView.create);
};

articleView.create = function() {
  // TODO: Set up a var to hold the new article we are creating.
  // Clear out the #articles element, so we can put in the updated preview
  var article;
  $('#article-preview').empty();

  var article;
  $("#article-preview").empty();

  // TODO: Instantiate an article based on what's in the form fields:
  var obj = {
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    body: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? new Date() : null
  };

  article = new Article(obj);

  var obj = {
    title:       $("#article-title").val(),
    author:      $("#article-author").val(),
    authorUrl:   $("#article-author-url").val(),
    category:    $("#article-category").val(),
    publishedOn: $("#article-published:checked").length ? new Date() : null,
    body:        $("#article-body").val()
  }
  article = new Article(obj);

  // TODO: Use our interface to the Handblebars template to put this new article into the DOM:
<<<<<<< HEAD
  $("#article-preview").append(article.toHtml());
=======
  $('#article-preview').append(article.toHtml());
>>>>>>> 368b998b83f6713f1bcf6195be8e65b2b4a4c4b1

  // TODO: Activate the highlighting of any code blocks (ex:
  /*
  ```
  function example() {
    return 'Hooray! Code highlighting!';
  }
  ```
  */
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $("pre code").each(function(i, block) {
    hljs.highlightBlock(block);
  })

  // TODO: Export the new article as JSON, so it's ready to copy/paste into blogArticles.js:
<<<<<<< HEAD
  $("#export-field").show();
  $("#article-json").val(JSON.stringify(article) + ", ");

=======
  $('#article-export').show();
  $('#article-json').val(JSON.stringify(article) + ", ");
>>>>>>> 368b998b83f6713f1bcf6195be8e65b2b4a4c4b1
};


articleView.initIndexPage = function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.toggleNavDisplay();
  articleView.setTeasers();
};
