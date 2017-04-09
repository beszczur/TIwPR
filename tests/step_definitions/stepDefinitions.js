var chai = require('chai'),
    chaiAsPromised = require('chai-as-promised')
config = require('../config/protractor.conf.js');

chai.use(chaiAsPromised);
var expect = chai.expect;

var buttons = {
  "Add new event": "addButton"
};

var modals = {
  "Add event": "eventModal"
};

var inputFields = {
  // **** EVENT MODAL ****
  "Event name": "eventName",
  "Priority": "priority",
  "Date": "date",
};

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
    element(by.id(buttons[buttonText])).click()
      .then(callback);
  });

  this.Then(/^I should see "([^"]*)" modal$/, function (modalTitle, callback) {
    expect(element(by.id(modals[modalTitle])).isPresent())
      .to.eventually.be.true.and.notify(callback);
  });

  this.When(/^I fill in "([^"]*)" filed with "([^"]*)"$/, function (inputFieldLabel, fieldContent, callback) {
    element(by.id(inputFields[inputFieldLabel])).clear(); // ************************** creepy ***********************************
    element(by.id(inputFields[inputFieldLabel])).sendKeys(fieldContent);
    browser.driver.sleep(2000)
      .then(callback);
  });

  this.When(/^I should see "([^"]*)" in "([^"]*)" filed$/, function (fileContent, inputFieldLabel, callback) {
    //expect(element(by.id(inputFields[fileContent])).getValue().to.eventually.be.true.and.notify(callback);
    expect(element(by.id(inputFields[inputFieldLabel])).getAttribute('value')).to.eventually.equal(fileContent)
      .then(callback);
/*    page.getCurrentUser().then(function(text) {
      expect(text).toEqual("Randy Savage");*/
  });

  this.Then(/^I should see popup with text "([^"]*)"$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
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
