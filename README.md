# Udemy Planner
This app makes a plan based on your start date, planned end date, and current progress

## Available Scripts
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Where to get the data

In the udemy lecture page, go to the network tab and get the response from an API which look something like this `courses/2196488/subscriber-curriculum-items API`.\
Paste this response in the `src/constants/data.js` file