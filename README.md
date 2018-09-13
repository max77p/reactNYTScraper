# reactNYTScraper
NYT scraper and article saver using Reactjs

## How does it work?

- Uses NYT Search API and orders results by New
- Algorithm checks to see how many records users requested
            - on search, the program checks to see if local data has axios response data
            - if it doesnt, then an axios call is made
            - if the records user requested is less than the number of items in the temporary local data
              then just pull from the local data instead of making a server request
            - once the records requested is greater than the number of items in the temporary hold,
              then make an axios call to get more data and add to the temporary hold
            - all of this prevents unnecessary server calls
- if new search is made everything is cleared and program starts again
- on saving of article, socket.io sends a notification to all users connected to app except the person who saved it
- 

## Technologies Used
- React.js
- Socket.io
- Node
- Bootstrap
- HTML
- CSS

## Future implementation
- modal view, so user can quick view an article before visiting the site
- implementation of bootstrap pagination for better presentation
- user login so saved articles is specific to the user

