var lodash = require('lodash');

const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
      return sum + item.likes
    }
    return blogs.length === 0 ? 0: blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  }
  return blogs.length === 0 ? null: blogs.reduce(reducer, blogs[0])
}

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, 'author')
  const author = lodash.maxBy(Object.keys(authors), (author) => authors[author])
  return authors[author]
}

const mostLikes = (blogs) => {
  const authors = lodash.groupBy(blogs, 'author')
  const author = lodash.maxBy(Object.keys(authors), (author) => totalLikes(authors[author]))
  return totalLikes(authors[author])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}