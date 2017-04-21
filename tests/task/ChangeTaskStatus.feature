Feature: User has possibility to change task status

  Scenario: User change task status form NEW to IN PROGRESS
    Given I go to homepage
     When I click on "Task more" button on "Some task name"
      And I click on "IN PROGRESS" button
     Then I should see "Some task name" on "light green" background

