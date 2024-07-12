Project Name
Quote2Speech4u

Deployed App URL
[Quote2Speech4u](https://deejmeek.github.io/Quote2Speech4u/)

Table of Contents
-Overview
-How to Use
-Features
-Screenshot
-External APIs
-Solved Problems
-Known Bugs
-Unsolved Problems
-Future Features
-Todo

--Overview--

Quote2Speech4u is a web application that allows users to listen to random quotes fetched from an API and favorite them for later listening. The app utilizes the SpeechSynthesis API to read the quotes aloud and stores the user's favorite quotes in local storage for easy access.

--How to Use--
-Fetch a Quote: Click on the center widget to fetch a random quote from the quotable.io API.
-Listen to a Quote: The fetched quote will be read aloud using the SpeechSynthesis API.
-Favorite a Quote: Click the "Favorite This Quote" button to add the currently displayed quote to your list of favorites.
-Replay a Favorite Quote: Click on any quote in the "Favourite Quotes" section to have it read aloud again.

--Features--
-Fetch Random Quotes: Clicking on the center widget fetches a random quote from the quotable.io API and displays it along with its author.
-Listen to Quotes: Utilizes the SpeechSynthesis API to read the quotes aloud.
-Favorite Quotes: Users can click the "Favorite This Quote" button to add the current quote to their favorites.
-Replay Favorite Quotes: Clicking on a favorited quote in the "Favourite Quotes" section replays the quote.

--Screenshot--

https://i.imgur.com/c1pXGD5.png

--External APIs--
-SpeechSynthesis API: Provides text-to-speech functionality.
-quotable.io API: Source of random quotes.

--Solved Problems--
-Toggling the active state based on whether a quote is being read.
-Managing click events depending on the reading state of a quote.
-Making quotes in the favorite list clickable and fetching the corresponding quote from the API.
-Extracting and using substrings for API fetch requests.
-Refactoring large functions into smaller ones while maintaining functionality, particularly with toggling clickable events.

--Known Bugs--
-When the remove quote button is clicked, the quote is then read aloud. This behavior is not intended.

--Unsolved Problems--
-Workaround for a Chrome-specific issue with SpeechSynthesis API character limits (>~250 characters).

--Future Features--
-Implementing a dropdown search bar for filtering by authors and categories.
-Integrating multiple quote APIs for a richer quote pool.
-Adding accessibility options for users with vision impairments.
-Adding media controls to adjust pitch, rate, and language of quotes, as well as play/pause buttons.
-Adding Wikipedia section to give context on author.
-Add light/dark mode.
-Add user registration.
-Allow comment section on favourited quotes
-Implement favourite quote limit for non-registered users.

--Todo-- (priority order)
1.Favourite and remove button needs adjusting/repositioning.
-Move 'favourite' button below quote div
-'Remove favourite' button justify to the right of quote.
2.Tweak media queries.
3.Improving UX/UI.
-Adjust styling to handle 10+ favourited quotes.
-Displaying favourite quote is jarring.
4.Richer error handling.
5.Refactor large functions.
6.Refactor soundwave animation to dynamically create .bar element to reduce html.index bloat.
7.Tweak media queries.

Quote2Speech4u was developed by Daniel Meek.
