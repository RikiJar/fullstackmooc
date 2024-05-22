const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/for_testing')
const fs = require('fs');


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const blogs = require('../tests/blogs.json')

  test('over 7 likes', () => {
    const result = listHelper.totalLikes([blogs[0]])
    assert.strictEqual(result, 7)
  })
  test('over 5 likes', () => {
    const result = listHelper.totalLikes([blogs[1]])
    assert.strictEqual(result, 5)
  })
  test('over 12 likes', () => {
    const result = listHelper.totalLikes([blogs[2]])
    assert.strictEqual(result, 12)
  })
  test('over 10 likes', () => {
    const result = listHelper.totalLikes([blogs[3]])
    assert.strictEqual(result, 10)
  })
})

describe('most liked blog', () => {
  const blogs = require('../tests/blogs.json')

  test('most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })
})

describe('most blogs', () => {
  const blogs = require('../tests/blogs.json')
  test('should be 3 with Robert C. Martin', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, 3)
  })
})

describe('most likes', () => {
  const blogs = require('../tests/blogs.json')
  test('should be 17 from Edsger W. Dijkstra', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, 17)
  })
})