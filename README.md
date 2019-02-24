# Treehouse Techdegree unit-05
## Employee Directory

This page displays an employee directory, using data requested from a public API. This page was built using jQuery but no other frameworks or libraries.

### API request

The data is retrieved from a request to randomuser.me. The request is sent on page load, and then not repeated. The request also has two options in the query string: one option requests 12 records (the default is 1) and the other option forces the nationality to US.

### Card view

The display defaults to a card view showing data for 12 artificial people from the API. Each card contains a name, picture, email and location. Clicking a card will open a detail view of the clicked user. The search bar can be used to narrow the results.

### Search bar

The search bar will narrow the viewable cards in the card view. The search bar is unavailable in the detail view. After text is typed into the search bar, the filter may be applied by pressing enter or clicking the search button. Clearing all text and submitting will display all 12 of the results.

### Detail view

The detail view displays a modal containing some additional information about the employee selected from the card view. While the modal is open, the cards and search bar are inactive. There is a close button in the upper right corner, and on the bottom are buttons to display the next or the previous record. If the card view has been filtered, then the prev/next buttons will cycle through the filtered list. The cards are displayed behind the modal, and the prev/next buttons will follow the arrangement displayed in the card view, smoothly handling the beginning/end transition. The details are displayed in a Times New Roman serif font, while the rest of the page uses a serif font.

## Graphical styling

This page was built from a template, with several styling changes made.

### Serif fonts

The font family on the modal was switched to use Times New Roman, a serif font.

### Background

The background was changed to a gradient fading from black to dark blue.

### Heading color

The main heading was changed to yellow to complement the dark blue background