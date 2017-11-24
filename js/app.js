// Classes
// ====

class MediumPosts {
  constructor() {
    this.postsUrl = 'https://medium-dsbr-proxy.herokuapp.com/';

    this.buildPosts = this.buildPosts.bind(this);
    this.displayPosts = this.displayPosts.bind(this);
    this.createPostCard = this.createPostCard.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  loadPosts() {
    const request = fetch(this.postsUrl);
    
    request
      .then((data) => data.json())
      .then((data) => this.buildPosts(data))
      .catch((err) => this.handleError(err));
  }

  buildPosts(posts) {
    let homePosts = document.querySelectorAll('.posts-thumb-area');
    let storiesPosts = document.querySelectorAll('.histories-thumb-area');

    if (homePosts.length) {
      this.displayPosts(homePosts, posts, 3);
    }

    if (storiesPosts.length) {
      this.displayPosts(storiesPosts, posts);
    }
  }

  displayPosts(container, data, limit = data.length) {
    container.forEach((element) => element.innerHTML = '');

    data.slice(0, limit).forEach((post) => {
      container.forEach((el) => {
        el.append(
          this.createPostCard(post)
        )
      })
    })
  }

  createPostCard(post) {
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

  handleError(err) {
    throw new Error(err);
  }
}

// Initialize
// ====

const SerenataPosts = new MediumPosts();
SerenataPosts.loadPosts();