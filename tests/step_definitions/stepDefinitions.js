var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

var buttons = {
  "Add new event": "addButton"
};

var modals = {
  "Add event": "eventModal"
};

module.exports = function() {
  this.Given(/^I go to homepage$/, function () {
    browser.get("http://localhost:4200/");
    // browser.baseUrl
    // expect(element(by.id('clock')).isPresent()).toBeTruthy();//.then(callback);
    // expect(element(by.id('clock')).isPresent()).toBe(true);
    // expect(element(by.id('clock'))).not.toBe(0);
   // expect(true).to.be.true;
   //  var myElement = element(by.id('clock'));
   //  expect(myElement.isPresent()).toBeFalsy();
  });

  this.When(/^I click on "([^"]*)" button$/, function (buttonText) {
    element(by.id(buttons[buttonText])).click();
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
