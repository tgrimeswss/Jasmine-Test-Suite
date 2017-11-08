
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */



$(function () {

    //On the DOM load, the variable defined below are created
    var allFeedsLength = allFeeds.length,
        $body = $('body'),
        entries_before,
        entries_after;

    /* First test suite, about the RSS feeds definitions,
    * and the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {

        /* 'are defined' tests to make sure that the allFeeds
         * variable has been defined and that it is not empty.
         */
        it('are defined', function () {//Suite to test if the feeds are created and defined
            expect(allFeeds).toBeDefined();//Expects allFeeds variable to be created and set to something
            expect(allFeedsLength).not.toBe(0);//Expects the length of allFeeds to be greater than 0
        });

        it('have URL and is not empty', function () {//Suite to test if the URL's in all feeds are created
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined();//Expects each URL in each feed to be defined
                expect(allFeeds[i].url.length).not.toBe(0);//Expects the URL string to be greater than 0
            }
        });

        it('have name and is not empty', function () {//Suite to test if there is a name present for each feed
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].name).toBeDefined();//Expects the name of each feed to be defined
                expect(allFeeds[i].name.length).not.toBe(0);//Expects the length of each string name to be greater than 0
            }
        });
    });

    /* Second test suite, about the sidebar menu */
    describe('The menu', function () {

        it('is hidden by default', function () {//Suite to test if the sidemenu is hidden by default
            expect($body.hasClass('menu-hidden')).toEqual(true);
            /*NOTE: There is a class labeled 'menu-hidden' that holds the functionality to toggle
            the menu visiblity on or off the page. This first test checks to see if the class is
            within the DOM on the load*/
        });

        /* 'changes visibility' ensures that the menu changes visibility
         * when the menu icon is clicked: the menu is displayed when
         * clicked the first time, and is hidden when clicked again.
         */
        it('changes visibility when menu icon is clicked', function () {//Suite to test if the menu actually slides on or of
            $('.menu-icon-link').trigger('click');//Trigger the actual click of the menu icon
            expect($body.hasClass('menu-hidden')).toBeFalsy();//Expects the body class to not contain the 'menu-hidden' class, thus removing the visibility of the menu

            $('.menu-icon-link').trigger('click');//Trigger the actual click of the menu icon again
            expect($body.hasClass('menu-hidden')).toBeTruthy();//Expects the body class to append the 'menu-hidden' class to the body
        });
    });

    describe('Initial Entries', function () {

        beforeEach(function (done) {//Making sure the data is loaded to in loadFeed() to test the results
            loadFeed(0, function () {//Calling the loadFeed method
                done();
            });
        });

        it('has an .entry element after loading', function (done) {//Test suite to check if there is at least one .entry element after DOM load
            var entry = $('.feed .entry')[0];//Storing the entry
            expect(entry).toBeGreaterThan('');//Expect the entry variable to be something
            done();
        });
    });

    /* Fourth test suite, about the new feeds loaded */
    describe('New Feed Selection', function () {

        /* This test ensures that when a new feed is loaded
         * by the loadFeed function, the content actually changes.
         */
        beforeEach(function (done) {
            $('.feed').empty();//Empty the feeds

            loadFeed(0, function () {
                entries_before = $('.feed').find("h2").text();//Locate the h2 elements in the feed variable
                done();//Waits for the loadFeed to finish its work
            });
        });

        it('changes the content when new feed is loaded', function (done) {//Test suite to check that the feeds loaded after it was empty

            loadFeed(1, function () {//Call the loadFeed for test data
                entries_after = $('.feed').find("h2").text();//Same as before, storing the H2 headers in the feed
                expect(entries_before).not.toEqual(entries_after);//Expect the first entries defined above (entries_before) to be different than the new entries (entries after)
                done();//Finish its work before moving on
            });
        });
    });
} ());
