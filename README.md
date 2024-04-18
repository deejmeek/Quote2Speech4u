Project Name
Quote2Speech4u

Deployed App URL-
https://funkystud.github.io/Quote2Speech4u/

Table of Contents
Overview
Screenshot
External API(s)
Unsolved Problems
Future Features

Overview-
Quote2Speech4u allows users to listen to random quotes fetched from an API and favorite them for later listening.

How to Use-
Click on the center widget to fetch a random quote and listen to it.
To favorite a quote, click the "Favorite This Quote" button.
Favorited quotes will appear in the "Favourite Quotes" section. Clicking on a favorited quote will replay it.

Features-
Fetch Random Quotes: Clicking on the center widget fetches a random quote from the quotable.io API. The quote is then displayed along with its author.
Listen to Quotes: The app utilizes the SpeechSynthesis API to read out the quotes aloud.
Favorite Quotes: Users can click the "Favorite This Quote" button to add the currently displayed quote to the favorite list.
Re-listen to Favorite Quotes: Clicking on a favorited quote in the "Favourite Quotes" section replays the quote.

Screenshot
https://imgur.com/GyqZpv4.png

External API(s)-

SpeechSynthesis API: Text-to-speech functionality.
quotable.io API: Source of random quotes.

Solved Problems
Toggling the active state depending on the quote being read state
Toggling whether an element was allowing a click event or not depending if a quote was being read.
Making quotes in the favourite list clickable and fetching from the API
Extracting a substring to be used for the fetch
Refactoring - One large function was used, breaking it into small functions caused some issues. Especially with toggling clickable events.

Unsolved Problems
Inital API used did not allow access for all available quotes.
Could not get dropdown filter search bar to work.
Work around for chrome specific issue with speechSynthesis not allowing character limits over ~250

Discuss any challenges, issues, or major hurdles encountered during the development process that are yet to be resolved.

Future Features
A dropdown search bar for Authors & Categories.
Multi quote API for richer quote pool.
Accessibility options for those with vision impairment.
Better stylings - especially the favourite list.
Multi device compatibilty
Media buttons to change pitch/rate/language of quote. Also play/pause buttons.
Improve UX/UI - make widget more obvious - explain the quote ID.
Add author wiki data or a link to wiki for more infomation.

Quote2Speech4u

-Daniel Meek
