Feature: User has possibility to delete events

  Scenario: Delete event
    Given I go to homepage
      And I click on "Edit event" button on "My event 666"
     Then I should see "Update event" modal
     When I click on "Delete" button
     Then I should see "Confirmation" modal
     When I click on "Yes" button
     Then I should see popup with text "Your event had been removed"
      And I should not see "My event 666" event
