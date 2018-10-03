# Testing how well Node.js can scale and cluster with Postgres

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/456c1b63ef2444da8055387f3ec135cf)](https://app.codacy.com/app/mkeeneth/nodejs-clustering-postgres?utm_source=github.com&utm_medium=referral&utm_content=mkeeneth/nodejs-clustering-postgres&utm_campaign=Badge_Grade_Dashboard)

## Using

Node.js, express, cluster, Postgres, body-parser. Also used modern aync/awit and destructuring assignment.

- <https://nodejs.org/api/cluster.html>
- <https://www.npmjs.com/package/body-parser>
- <https://artillery.io>

## Run Load test

- npm install -g artillery
- artillery run .\test\artillery_loop_post.json
