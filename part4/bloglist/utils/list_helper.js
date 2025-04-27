const dummy = (blogs) => 1

const totalLikes = (bloglists) => {
  // sum = 0
  // bloglists.forEach(list => {
  //   sum += list.likes
  // });
  // return sum 
  return bloglists.reduce((total,list) => total + list.likes,0)
}

const favoriteBlog = (blogs) => {
  
  const favoriteblog =  blogs.reduce((favourite,blog) => favourite = favourite.likes > blog.likes?favourite:blog,0)

  return {
    'title' : favoriteblog.title,
    'author' : favoriteblog.author,
    'likes': favoriteblog.likes
  }
}

const mostBlogs = (blogs) => {
  let max = 0
 let maxAuthor = null
 let maxBlogs = 0
  const count = {}
  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });

  for (let author in count){
    if(count[author] > max){
      maxAuthor = author
      maxBlogs = count[author]
    }
  }
  return {
    'author' : maxAuthor,
    'blogs' : maxBlogs
  }
}
const mostLikes = (blogs) => {
  let max = 0
 let maxAuthor = null
 let maxLikes = 0
  const count = {}
  blogs.forEach(blog => {
    count[blog.author] = (count[blog.author] || 0) + blog.likes;
  });

  for (let author in count){
    if(count[author] > max){
      maxAuthor = author
      maxLikes = count[author]
    }
  }
  return {
    'author' : maxAuthor,
    'likes' : maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

