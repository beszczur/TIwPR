Feature: User has possibility to edit events

  Scenario: Edit existing event
    Given I go to homepage
     When I click on "Edit event" button
     Then I should see "Edit event" modal
     # with "Edit event" as modal title
     When I fill in "Event name" filed with "My new event changed"
     When I click on "Save event" button
     Then I should see popup with text "New event was successfully updated"
      And I should see "My new event changed"
#    on main page in proper column

