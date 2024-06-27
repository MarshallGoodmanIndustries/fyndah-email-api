## Overview

This project uses TypeScript to build a Node.js application. The `package.json` file includes scripts to aid in the development, building, and running of the application.

## Scripts

The `package.json` file includes the following scripts:

1. **dev**: `nodemon app.ts`
2. **build**: `npx tsc`
3. **start**: `node dist/app.js`

### Script Details

#### 1. `dev`

```json
"dev": "nodemon app.ts"

Purpose: This script is used for development. It runs the application using nodemon, which automatically restarts the Node.js server whenever a file changes, making it easier to see changes in real-time without manually restarting the server.
Command: nodemon app.ts
Usage: Run npm run dev to start the development server.
2. build

"build": "npx tsc"
Purpose: This script compiles the TypeScript files into JavaScript. The TypeScript compiler (tsc) is used for this purpose.
Command: npx tsc
Usage: Run npm run build to compile the TypeScript code.
3. start

"start": "node dist/app.js"

Purpose: This script starts the application using the compiled JavaScript files. It assumes that the TypeScript code has been compiled into the dist directory.
Command: node dist/app.js
Usage: Run npm start to start the application.
Installation
Clone the repository.
Run npm install to install the dependencies.
Usage
Development
To start the development server with automatic restarts on file changes, run:

npm run dev

Build
To compile the TypeScript code to JavaScript, run:
npm run build
Start
To start the application using the compiled JavaScript files, run:

npm start

Ensure you have run npm run build before running npm start to compile the TypeScript code.

Dependencies
Make sure you have the following installed:

Node.js
npm (Node Package Manager)
TypeScript (installed as a project dependency)

License
This project is licensed under the MGI License.


