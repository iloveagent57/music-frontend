# 2022-02-09
* Set up index.js file in line with react-bootstrap example at https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic-v5?file=/src/App.js:392-614
  This was necessary to import the bootstrap CSS file.
* Added a CSS loader to the webpack.config.js file.
* Copied some webpack config from https://medium.com/@vladbezden/webpack-configuration-for-using-bootstrap-in-react-a6ef2dfa1d95
  but ended up not using the source-map stuff - there was some weird error during build I couldn't figure out.
* Needed to npm-install some style-loader and css-loader stuff.
* added npm `start` script to actually build the bundle.js dist file.
* Still need to figure out true hot-reloading - page reloads now, but I feel like it's not picking up changes.
* Added a loading state Toast to my app, important insight here was that I needed `setIsLoading(false)` inside the
  `fetch(...).then(...)`, because fetch() is async and I don't want the app to appear loaded until the data is
  actually received and assigned to my `allPerformances` state variable.
* Changed code to fetch all performances instead of songs, idea is to have one card per performance, and on card click,
  somehow render all the songs as buttons that can be clicked to play.