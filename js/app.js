var createThumb = function (post) {

  var col = document.createElement('div');
  col.setAttribute('class', 'col-md-4');

  var thumb = document.createElement('div');
  thumb.setAttribute('class', 'post-thumb');

  var link = document.createElement('a');
  link.setAttribute('href', post.url);

  var img = document.createElement('img');
  img.setAttribute('src', post.image);

  var title = document.createElement('h3');
  title.setAttribute('class', 'post-title');
  title.innerHTML = post.title;

  link.appendChild(img);
  link.appendChild(title);
  thumb.appendChild(link);
  col.appendChild(thumb);

  return col;

};

var createHistThumb = function (post) {

  var link = document.createElement('a');
  link.setAttribute('href', post.url);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var col = document.createElement('div');
  col.setAttribute('class', 'col-md-4');

  var thumb = document.createElement('div');
  thumb.setAttribute('class', 'histories-thumb');

  var img = document.createElement('img');
  img.setAttribute('src', post.image);

  var d_col = document.createElement('div');
  d_col.setAttribute('class', 'col-md-8');

  var d_thumb = document.createElement('div');
  d_thumb.setAttribute('class', 'histories-description');

  var title = document.createElement('h3');
  title.innerHTML = post.title;

  var text = document.createElement('p');
  text.innerHTML = post.snippet;

  d_thumb.appendChild(title);
  d_thumb.appendChild(text);
  d_col.appendChild(d_thumb);
  thumb.appendChild(img);
  col.appendChild(thumb);
  row.appendChild(col);
  row.appendChild(d_col);
  link.appendChild(row);

  return link;
}

var loadPosts = function (posts) {
  for (var i = 0; i < 3; i++) {
      var post = createThumb(posts[i]);
      $('.posts-thumb-area').append(post);
  }

  posts.forEach(function(post) {
    var post = createHistThumb(post);
    $('.histories-thumb-area').append(post);
  });
};

$(document).ready(function(){
  $.ajax({
    "type": "json",
    "method": "GET",
    "url": "https://medium-dsbr-proxy.herokuapp.com/",
    "success": loadPosts
  });
});
