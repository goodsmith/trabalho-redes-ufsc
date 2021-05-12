# Matt's SSR React Boilerplate
This is a opinionated SSR React App boilerplate, using Next.js, Node.js with Express.js and MongoDB, Babel and Nodemon.

## Requirements
- Yarn v1+
- Node v11.10+

## How to run
### Without Docker
1. Install the dependencies: `yarn`
2. Put a JWT key and a URL for your Mongo database in a env file
3. Start the dev server: `yarn dev`

### With docker-compose
1. Run the command `docker-compose -f docker-compose.dev.yml up`

## Production mode
Running `yarn build` webpack will build the app into a `dist` folder and then express server will be started.

## Folder Structure
### Backend
- The api apps are in the `src/api` folder
- The apps consist of a collection of the app's models and a router and folder for each of the endpoints versions, the folder consists of a router and a controller.

### Frontend
- Pages are kept in the `src/pages` folder
- Components are organized using [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)