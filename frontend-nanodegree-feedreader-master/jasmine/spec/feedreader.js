
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('Feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        function testFeedProperties (allFeeds) {//Test function for URL's in allFeeds object
          it(allFeeds + ' is a defined property of allFeeds',function() {
            expect(allFeeds).toBeDefined();
          })
        }

        for (var i = 0; i < allFeeds.length; i++) {//Looping through each URL in the allFeeds object
          testFeedProperties(allFeeds[i].url);
          testFeedProperties(allFeeds[i].name);
        }

        //^^^^
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });
//------------------------------------------------------------------------------

    describe('The Menu', function() {
      /* Write a new test suite named "The menu" */
      var hiddenMenu = $('.menu-hidden');
      var menuIcon = $('.menu-icon-link');
      var slideMenu = $('.slide-menu');
      menuIcon.on('click', function() {
          $('body').toggleClass(hiddenMenu);
      });

      it('is hidden by default', function() {//Ensures that the CSS class 'menu-hidden' hides the menu when the page is opened
        expect(hiddenMenu).toBeInDOM();//Expects the 'menu-hidden' class to be in the DOM
        });

      it('changes visibility when clicked', function() {//Ensures that the CSS class 'menu-hidden' toggles the menu when it is clicked
        spyOn(menuIcon,'click');//Using the spy method to call the click event on menuIcon to reveal the menu
        menuIcon.click();//Calling the click event
        expect(menuIcon.click).toHaveBeenCalled();
        expect(hiddenMenu.css('transform')).toEqual('none');
        });


      });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
//------------------------------------------------------------------------------

    describe('Initial Entries',function() {

      beforeEach(function(done) {
        init()
        done();
      });



      function loadFeed(id, cb) {
          var feedUrl = allFeeds[id].url,
              feedName = allFeeds[id].name;

          $.ajax({
            type: "POST",
            url: 'https://rsstojson.udacity.com/parseFeed',
            data: JSON.stringify({url: feedUrl}),
            contentType:"application/json",
            success: function (result, status){

                      var container = $('.feed'),
                          title = $('.header-title'),
                          entries = result.feed.entries,
                          entriesLen = entries.length,
                          entryTemplate = Handlebars.compile($('.tpl-entry').html());

                      title.html(feedName);   // Set the header text
                      container.empty();      // Empty out all previous entries

                      /* Loop through the entries we just loaded via the Google
                       * Feed Reader API. We'll then parse that entry against the
                       * entryTemplate (created above using Handlebars) and append
                       * the resulting HTML to the list of entries on the page.
                       */
                      entries.forEach(function(entry) {
                          container.append(entryTemplate(entry));
                      });

                      if (cb) {
                          cb();
                      }
                    },
            error: function (result, status, err){
                      //run only the callback without attempting to parse result due to error
                      if (cb) {
                          cb();
                      }
                    },
            dataType: "json"
          });
      }

      it('loadFeed function is called and performs proper methods', function() {
        expect(null).toBe(null);
      });

    });
    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
