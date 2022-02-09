# 2022-02-09
* Created git repo for this project.
* Set up index.js file in line with react-bootstrap example at https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic-v5?file=/src/App.js:392-614
  This was necessary to import the bootstrap CSS file.
* Added a CSS loader to the webpack.config.js file.
* Copied some webpack config from https://medium.com/@vladbezden/webpack-configuration-for-using-bootstrap-in-react-a6ef2dfa1d95
  but ended up not using the source-map stuff - there was some weird error during build I couldn't figure out.
* Needed to npm-install some style-loader and css-loader stuff.
* added npm `start` script to actually build the bundle.js dist file.
* Still need to figure out true hot-reloading - page reloads now, but I feel like it's not picking up changes.
** Mitigated this by adding a publicPath of `/src/` to my webpack output and re-enable the source-map devtool
(but don't use a source map as output).
* Added a loading state Toast to my app, important insight here was that I needed `setIsLoading(false)` inside the
  `fetch(...).then(...)`, because fetch() is async and I don't want the app to appear loaded until the data is
  actually received and assigned to my `allPerformances` state variable.
* Changed code to fetch all performances instead of songs, idea is to have one card per performance, and on card click,
  somehow render all the songs as buttons that can be clicked to play.
* Tried playing with bootstrap rows and columns, remember you have to check for something to be truthy before trying
 to map() it into components.
* CardGroup and Card are more what I want.
* TODO:
** get some images loaded into the API response payload.
** make some kind of container on the side to show rows of songs to click/play
** on show card click, something like `setCurrentPerformance(performance)`
** probably want a dict of performances by identifier, rather than a single list.
** put the audio player in that side container.
** pagination
** search box so we can play things other than moe.