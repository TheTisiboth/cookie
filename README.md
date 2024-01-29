# cookie

A website to host recipes

## Dev environment

- [Node.js 18.17](https://nodejs.org/en) or later.

### Start

- Run the command `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### DB

The DB is setup with prisma. Whenever a change is made to the DB schema, run the following command to update the DB:

`npx prisma migrate dev --name <migration_name>`

In order to use a GUI to view the DB, run the following command:

`npx prisma studio`
