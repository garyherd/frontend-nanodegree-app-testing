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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* The two tests verify all the feeds have a name and url that is
         * defined and not empty
         */
        it('URLs are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }, this);
        });

        it('names are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }, this);
        });

    });

    // This test suite checks the menu icon works as expected
    describe('The menu', function() {
        it('element is hidden on load', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('changes visibility when icon clicked', function() {
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });

    // This test suite checks that new loads actually do something
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(3, function() {
                done();
            });
        });

        it('load at least one entry on the page', function(done) {
            var feed = document.getElementsByClassName('feed')[0];
            var entries = feed.getElementsByClassName('entry');
            expect(entries.length).not.toEqual(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var before;

        // Use loadFeed to force two reloads. Due to asynchronous nature of
        // loadFeed, the callback function of the first load fires the second
        // loadFeed. The second loadFeed triggers the start of the test spec
        beforeEach(function(done) {
            loadFeed(1, function() {
                before = $(".feed").html();
                loadFeed(3, function() {
                    done();
                });
            });
        });

        // Test that the content changes by loading feed 1, then feed 3,
        // then comparing the html from each
        it('load makes content change', function(done) {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            var after = $(".feed").html();
            expect(before === after).toBe(false);
            done();
        });
    });

}());
