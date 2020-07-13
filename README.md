How to run a project?

1. Clone the fork `git clone git@github.com:dimabory/gqlx-apollo-express-server.git`
2. Create the link `cd gqlx-apollo-express-server && npm link`
3. Go to the project and link it `cd gqlx-apollo-express-server-2-example && npm link gqlx-apollo-express-server`
4. Run it `npm start` or `npm run dev` (hot-reload) 

----

Running a project register an initial service and graphql schema.
Open playground http://localhost:3000/graphql in order to test it.

- http://localhost:3000/update-service-1 updates the current schema in the runtime
- http://localhost:3000/insert-service-2 registers the new service

- In order to test upload functionality you can utilize Postman feature. Change `<absolute_path_to_the_file>` to the file absolute path on your machine. You can also use UI (https://i.imgur.com/r8gt1bI.png).
```curl
curl --location --request POST 'http://localhost:3000/graphql' \
--header 'Content-Type: application/json' \
--form 'operations={"query": "mutation fileUpload($file: Upload) { uploadFile(file: $file) }"}' \
--form 'map={"0": ["variables.file"]}
' \
--form '0=@<absolute_path_to_the_file>'
```
