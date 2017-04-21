Feature: User has possibility to edit task

  Scenario: Edit new event
    Given I go to homepage
     When I click on "Task more" button
      And I click on "Edit task" button
     Then I should see "Edit task" modal
     # with "Edit task" as modal title
     When I fill in "Task name" filed with "My new task changed"
     When I click on "Save task" button
     Then I should see popup with text "New task was successfully updated"
      And I should see "My new task changed"
#    on main page in proper column

