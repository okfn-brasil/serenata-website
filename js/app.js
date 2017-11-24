// Classes
// ====

class Posts {
  constructor() {
    this.postsUrl = 'https://medium-dsbr-proxy.herokuapp.com/';

    this.buildPosts = this.buildPosts.bind(this);
    this.handleError = this.handleError.bind(this);
    this.createHomeThumbs = this.createHomeThumbs.bind(this);
    this.createStoriesThumbs = this.createStoriesThumbs.bind(this);
  }

  loadPosts() {
    const request = fetch(this.postsUrl);
    
    request
      .then((data) => data.json())
      .then((data) => this.buildPosts(data))
      .catch((err) => this.handleError(err));
  }

  handleError(err) {
    throw new Error(err);
  }

  buildPosts(posts) {
    let homePosts = document.querySelectorAll('.posts-thumb-area');
    
    if (homePosts.length) {
      homePosts.forEach((el) => el.innerHTML = '');

      for (let i = 0; i < 3; i++) {
        homePosts.forEach((el) => el.append(this.createHomeThumbs(posts[i])));
      }
    }

    let storiesPosts = document.querySelectorAll('.histories-thumb-area');

    if (storiesPosts.length) {
      storiesPosts.forEach((el) => el.innerHTML = '');

      posts.forEach((post) => {
        storiesPosts.forEach((el) => el.append(this.createStoriesThumbs(post)));
      });
    }
  }

  createHomeThumbs(post) {
    const { image, snippet, title, url } = post;

    let postCard = document.createElement('article');
    postCard.setAttribute('class', 'post-card');

    let postImage = document.createElement('figure');
    postImage.setAttribute('class', 'post-card_image');
    
    let postImg = document.createElement('img');
    postImg.setAttribute('src', image);
    
    let postTitle = document.createElement('h3');
    postTitle.setAttribute('class', 'post-card_title');
    postTitle.innerHTML = title;

    let postLink = document.createElement('a');
    postLink.setAttribute('class', 'post-card_link');
    postLink.setAttribute('href', url);
    postLink.setAttribute('rel', 'noopener');
    postLink.setAttribute('target', '_blank');
    postLink.innerHTML = 'Ler';

    // append
    postImage.appendChild(postImg);

    postCard.appendChild(postImage);
    postCard.appendChild(postTitle);
    postCard.appendChild(postLink);

    return postCard;
  }

  createStoriesThumbs(post) {
    // const { image, snippet, title, url } = post;

    let link = document.createElement('a');
    link.setAttribute('href', post.url);

    let row = document.createElement('div');
    row.setAttribute('class', 'row');

    let col = document.createElement('div');
    col.setAttribute('class', 'col-md-4');

    let thumb = document.createElement('div');
    thumb.setAttribute('class', 'histories-thumb');
    thumb.setAttribute('style', 'background-image:  url(' + post.image + ')');

    let d_col = document.createElement('div');
    d_col.setAttribute('class', 'col-md-8');

    let d_thumb = document.createElement('div');
    d_thumb.setAttribute('class', 'histories-description');

    let title = document.createElement('h3');
    title.innerHTML = post.title;

    let text = document.createElement('p');
    text.innerHTML = post.snippet;

    // append
    d_thumb.appendChild(title);
    d_thumb.appendChild(text);

    d_col.appendChild(d_thumb);

    col.appendChild(thumb);

    row.appendChild(col);
    row.appendChild(d_col);

    link.appendChild(row);

    return link;
  }
}

// Initialize
// ====

const SerenataPosts = new Posts();
SerenataPosts.loadPosts();