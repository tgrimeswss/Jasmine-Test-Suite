# RSS Feed Tester

## Directions
To run the program, please open and select the  "Index.html" file located in the directory labeled "feedReader."

#### Utilizing Jasmine Test Suite

The purpose of this project is to create a test suite for a sample RSS feed. It checks to see if certain CSS classes as well as DOM elements are formatted properly when the page is loaded.

### Test 1. (Establishing the RSS feeds)

a) Expects RSS feeds to be toBeDefined

b) Expects each RSS feed to contain a string url

c) Expects each RSS feed to contain a string name


### Test 2. (Toggling the side menu functionality)

a) Expects the side menu to be hidden off the screen by default

b) Expects to change visibility when the side menu is clicked

c) Expects to revert back to original visibility when the side menu is clicked again


### Test 3. (RSS Entries)

a) Expects at least one entry in the RSS feeds after the page loads

b) Expects the RSS content to change from empty to full after the DOM is loaded
