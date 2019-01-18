## React Custom Hook Example

This project contains 2 components with identical functionality. One component implements react's new Hooks API, the other does not contain hooks. 


The project used create-react-app with a minor package.json update.

If you'd like to use hooks in your create-react-app update the following:

```
// in package.json
"dependencies": {
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-scripts": "2.1.3"
  },
```
update to...

```
// in package.json
"dependencies": {
    "react": "next",
    "react-dom": "next",
    "react-scripts": "2.1.3"
  },
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

