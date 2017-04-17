Feature: User has possibility to add events

  Scenario: Add new event
    Given I go to homepage
     When I click on "Add new event" button
     Then I should see "Add event" modal
     # with "Add event" as modal title
     When I fill in "Event name" filed with "My new event"
      And I fill in "Position" filed with "1"
      And I should see "2017-04-24" in "Date" filed
     When I click on "Save event" button
     Then I should see popup with text "New event was successfully created"
      And I should see "My new event"
#    on main page in proper column

  Scenario: Add new repeatable event
    Given I go to homepage
#     When I ...
