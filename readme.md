# Testing how well Node.js can scale and cluster with Postgres

## Using

Node.js, express, cluster, Postgres, body-parser. Also used modern aync/awit and destructuring assignment.

- <https://nodejs.org/api/cluster.html>
- <https://www.npmjs.com/package/body-parser>
- <https://artillery.io?

## Run Load test

- npm install -g artillery
- artillery run .\test\artillery_loop_post.json
