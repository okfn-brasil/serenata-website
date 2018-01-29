var createHomeThumbs = function (post) {

  var col = document.createElement('div');
  col.setAttribute('class', 'col-md-4');

  var thumb = document.createElement('div');
  thumb.setAttribute('class', 'post-thumb');

  var link = document.createElement('a');
  link.setAttribute('href', post.url);

  var img = document.createElement('div');
  img.setAttribute('class', 'post-thumb-img');
  img.setAttribute('style', 'background-image:  url(' + post.image + ')');

  var title = document.createElement('h3');
  title.setAttribute('class', 'post-title');
  title.innerHTML = post.title;

  link.appendChild(img);
  link.appendChild(title);
  thumb.appendChild(link);
  col.appendChild(thumb);

  return col;

};

var createStoriesThumbs = function (post) {

  var link = document.createElement('a');
  link.setAttribute('href', post.url);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');

  var col = document.createElement('div');
  col.setAttribute('class', 'col-md-4');

  var thumb = document.createElement('div');
  thumb.setAttribute('class', 'histories-thumb');
  thumb.setAttribute('style', 'background-image:  url(' + post.image + ')');

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
  col.appendChild(thumb);
  row.appendChild(col);
  row.appendChild(d_col);
  link.appendChild(row);

  return link;

};

var loadPosts = function (posts) {

  var homePosts = $('.posts-thumb-area');
  if (homePosts.length) {
    homePosts.empty();
    for (var i = 0; i < 3; i++) {
      homePosts.append(createHomeThumbs(posts[i]));
    }
  }

  var storiesPosts = $('.stories-thumb-area');
  if (storiesPosts.length) {
      storiesPosts.empty();
      posts.forEach(function(post) {
        storiesPosts.append(createStoriesThumbs(post));
      });
  }
};

$(document).ready(function(){
  $.ajax({
    "type": "json",
    "method": "GET",
    "url": "https://medium-dsbr-proxy.herokuapp.com/",
    "success": loadPosts
  });
});
