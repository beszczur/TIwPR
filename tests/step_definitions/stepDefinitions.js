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

module.exports = function() {
  this.Given(/^I go to homepage$/, function (callback) {
    browser.get(config.config.baseURL)
      // .then(function() {
      //   element(by.className('beata')).isPresent()
      //     .then(function(res) {console.log(res);})
      // })
      .then(callback);
      // .then(function () {expect(element(by.id('clock')).isPresent()).to.eventually.be.false.and.notify(callback);})
  });

  this.When(/^I click on "([^"]*)" button$/, function (buttonText, callback) {
    element(by.id(buttons[buttonText])).click()
      .then(callback);
  });

  this.Then(/^I should see "([^"]*)" modal$/, function (modalTitle) {
    expect(element(by.id(modals[modalTitle])));
  });

  this.When(/^I fill in "([^"]*)" filed with "([^"]*)"$/, function (arg1, arg2, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  this.When(/^I should see "([^"]*)" in date filed$/, function (arg1, callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
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
