var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    config = require('../config/protractor.conf.js'),
    elements = require('./elements.json');

chai.use(chaiAsPromised);
var expect = chai.expect;

/*
  ********* HELP **********
  browser.driver.sleep(2000);
 */

module.exports = function() {
  this.Given(/^I go to homepage$/, function (callback) {
    browser.get(config.config.baseURL)
    // .then(function() {
    //   element(by.className('beata')).isPresent()
    //     .then(function(res) {
    //       console.log("************************************");
    //       console.log(res);
    //     })
    // })
      .then(function () {
        expect(element(by.id('day5')).isPresent()).to.eventually.be.true.and.notify(callback);
      })
  });

  this.When(/^I click on "([^"]*)" button$/, function (buttonText, callback) {
    element(by.id(elements.buttons[buttonText])).click()
      .then(callback);
  });

  this.When(/^I click on "([^"]*)" checkbox$/, function (checkboxText, callback) {
    element(by.id(elements.checkboxes[checkboxText])).click()
      .then(callback);
  });

  this.Then(/^I should see "([^"]*)" modal$/, function (modalTitle, callback) {
    expect(element(by.id(elements.modals[modalTitle])).isPresent())
      .to.eventually.be.true.and.notify(callback);
  });

  this.When(/^I fill in "([^"]*)" filed with "([^"]*)"$/, function (inputFieldLabel, fieldContent, callback) {
    element(by.id(elements.inputFields[inputFieldLabel])).sendKeys(fieldContent);
    browser.driver.sleep(2000)
      .then(callback);
  });

  this.When(/^I should see "([^"]*)" in "([^"]*)" filed$/, function (fieldContent, inputFieldLabel, callback) {
    expect(element(by.id(elements.inputFields[inputFieldLabel])).getAttribute('value')).to.eventually.equal(fieldContent)
      .and.notify(callback);
  });

  this.Then(/^I should see popup with text "([^"]*)"$/, function (popupText, callback) {
    callback(null, 'pending');
    // TODO:
    //expect(element(by.className("toast-title")).isPresent())
    //expect(element(by.cssContainingText(".toast-title", popupText)).isPresent())
    //expect(element(by.xpath('//*[.="New event was successfully created"]')).isPresent())
    //  .to.eventually.be.true.and.notify(callback);
  });

  this.Then(/^I should see "([^"]*)"$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.When(/^I click on "([^"]*)" button on "([^"]*)"$/, function (arg1, arg2, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.Then(/^I should not see "([^"]*)" event$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });


};
