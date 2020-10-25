# Timed Coding Quiz
Timed Coding Quiz to practice JavaScript knowledge


## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

Pseudo Code

Storange Questions on Array of objects(questions) with properties of question, answers(object) and correctAnswer.
Create a timer variable to keep track of the time left (Score).
Show a welcome menu and instructions and start button.
When Start button is pressed, 
Create a interval that goes from 100 to 0. 
Show the first question. 
If answers selected is incorrect, reduce timer by 10 seconds.
Show the next question on the array.
Stop interval when reached 0 or all question are answer.
Ask user for Initials and save score on local storange
