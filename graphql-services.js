module.exports = [
  {
    name: 'service1',
    gqlx: `
scalar Upload
type User {
  name: String
}

type Query {
  helloWorld(name: String): String { 'hello, ' + name }
  users: [User] { get('/users/') }
}

type Mutation {
  uploadFile(file: Upload): Boolean {
    post({ url: '/upload', formData: form(file, { foo: 'bar' }) })
  }
}
        `,
    data: { url: 'http://localhost:3000' },
    api: { get: true, post: true, form: true },
  },
  {
    name: 'service2',
    gqlx: `
scalar Upload
type User1 {
  name: String
}

type Query {  
  users1: [User1] { get('/users/') }
}
   `,
    data: { url: 'http://localhost:3000' },
    api: { get: true },
  }
]
