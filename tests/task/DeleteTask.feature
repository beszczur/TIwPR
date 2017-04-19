Feature: User has possibility to delete tasks

  Scenario: Delete event
    Given I go to homepage
    And I click on "Edit task" button on "Prepare sth"
    When I click on "Delete" button
    Then I should see "Confirmation" modal
    When I click on "Yes" button
    Then I should see popup with text "Your task had been removed"
    And I should not see "Prepare sth" event
