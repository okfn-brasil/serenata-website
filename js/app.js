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
  title.innerHTML = post.title;

  link.appendChild(img);
  link.appendChild(title);
  thumb.appendChild(link);
  col.appendChild(thumb);

  return col;

};

var loadPosts = function (posts) {
  for (var i = 0; i < 3; i++) {
      var post = createThumb(posts[i]);
      $('.posts-thumb-area').append(post);
  }
};

$(document).ready(function(){
  $.ajax({
    "type": "json",
    "method": "GET",
    "url": "http://medium-dsbr-proxy.herokuapp.com/",
    "success": loadPosts
  });
});


