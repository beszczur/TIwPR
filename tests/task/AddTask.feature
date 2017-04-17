Feature: User has possibility to add task

  Scenario: Add task
    Given I go to homepage
      And I click on "Add new task" button
     Then I should see "Add task" modal
      And I fill in "Task name" filed with "My new task"
      And I fill in "Priority" filed with "1"
     Then I click on "Save task" button
      And I should see popup with text "New task was successfully created"
      And I should see "My new task"

  Scenario: Add repeatable task
    Given I go to homepage
      And I click on "Add new task" button
     Then I should see "Add task" modal
      And I fill in "Task name" filed with "My new task"
      And I fill in "Priority" filed with "1"
      And I click on "Repeatable task" checkbox
     Then I click on "Save task" button
      And I should see popup with text "New task was successfully created"
      And I should see "My new task"

