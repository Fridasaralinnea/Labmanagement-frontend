/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const firefox = require('selenium-webdriver/firefox');
const webdriver = require("selenium-webdriver");

const By = webdriver.By;

// var driver = null;
var profile = new firefox.Profile();
var opts;
var builder;

profile.setAcceptUntrustedCerts(true);
profile.setAssumeUntrustedCertIssuer(false);

let browser;

// Does not work with WSL!! Use cygwin
// Test suite
test.describe("Labmanagement-App", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        opts = new firefox.Options();
        opts.setProfile(profile);
        // opts.addArguments('--headless');
        // builder = new webdriver.Builder().forBrowser('firefox').withCapabilities(opts.toCapabilities());
        builder = new webdriver.Builder().forBrowser('firefox');
        // builder = new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless().windowSize(screen))
        // builder.setFirefoxOptions(opts);
        builder.setFirefoxOptions(new firefox.Options().headless());
        browser = builder.build();

        browser.get("http://localhost:4200/login");

        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    // test.beforeEach(function(done) {
    //     this.timeout(20000);
    //     browser = new webdriver.Builder().
    //         withCapabilities(webdriver.Capabilities.firefox()).build();
    //
    //     // browser.get("http://localhost:4200/");
    //     browser.get("https://jsramverk.fridasaralinnea.me/");
    //
    //     done();
    // });
    //
    // test.afterEach(function(done) {
    //     browser.quit();
    //     done();
    // });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }


    function assertH2(target) {
        browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }



    // Test case
    test.it("Test index", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "LabManagement");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "LabManagement");
        });

        // assertH2("WELCOME");
        matchUrl("/");

        done();
    });



    test.it("Test go to Register", function(done) {
        goToNavLink("Register");

        // get h1 text
        assertH2("REGISTER NEW USER");
        matchUrl("/register");

        done();
    });



    test.it("Test go to Log in", function(done) {
        goToNavLink("Log in");

        // get h1 text
        assertH2("LOG IN");
        matchUrl("/login");

        done();
    });
});
