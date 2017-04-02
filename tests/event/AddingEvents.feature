Feature: User has possibility to add, edit, update or delete events

  Scenario: Adding new events
    Given I go to homepage
    When I click on "Add new event" button
    Then I should see "Add event" modal
     # with "Add event" as modal title
    When I fill in "Name" filed with "My new event"
    And I fill in "Priority" filed with "1"
    And I should see "04/01/2017" in date filed
    When I click on "Save" button
    Then I should see popup with text "New event was created"
    And I should see "My new event"
#    on main page in proper column

  Scenario: Adding new repeatable events
    Given I go to homepage
#     When I ...

  Scenario: Delete event
    Given I go to homepage
    When I click on "Edit event" button on "My event 666"
    Then I should see "Update event" modal
    When I click on "Delete" button
    Then I should see "Confirmation" modal
    When I click on "Yes" button
    Then I should see popup with text "Your event had been removed"
    And I should not see "My event 666" event


