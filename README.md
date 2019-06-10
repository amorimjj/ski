# Ceros Ski Code Challenge solution by Jeferson Amorim

### *There are comments across this document detailing my solution for this challenge.*

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* ~~**Fix a bug:**~~

  ~~There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code and fix it.~~
  
  * ~~Steps to Reproduce:~~
    1. ~~Load the game~~
    1. ~~Crash into an obstacle~~
    1. ~~Press the left arrow key~~
  * ~~Expected Result: The skier gets up and is facing to the left~~
  * ~~Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)~~
  
  ***Direction's changes after CRASH state wasn't handled properly. This bug is fixed as detailed in https://github.com/amorimjj/ski/commit/bec8548e635902aca13b8b5d3df6a15b5d95c293#diff-b293b801ed2cf1a350bb357417710a38***
  
* ~~**Write unit tests:**~~

  ~~The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.~~
  
  ***Unit tests to prevent this bug in the future was created and are available in https://github.com/amorimjj/ski/commit/bec8548e635902aca13b8b5d3df6a15b5d95c293#diff-eccd8900bb8aaa2df243f0e3d10b8497**
  
* ~~**Extend existing functionality:**~~

  ~~We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!~~
  * ~~Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.~~
  * ~~The skier should be able to jump over some obstacles while in the air.~~ 
    * ~~Rocks can be jumped over~~
    * ~~Trees can NOT be jumped over~~
  * Anything else you'd like to add to the skier's jumping ability, go for it!
    ***Sorry, but no new ideas about jumping ability, but skier is jumping like a charm. Press SPACE BAR key to see that***
  
  ***Skier jump ability added as detailed in https://github.com/amorimjj/ski/commit/9cf531fcc9dbbe4ab84c6aef6119c9455a2617bb***
  
* ~~**Build something new:**~~

  ~~Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.~~
  * ~~The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.~~
  * ~~If the rhino catches the skier, it's game over and the rhino should eat the skier.~~

  ***Rhino chaser was added as detailed in https://github.com/amorimjj/ski/commit/7a5b1f41049a79fe913d77691b9112e88850bb88***

* **Documentation:**

  * ~~Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.~~
  ***README file updated with comments about my work. No known bug until now.***
  * ~~Provide a way for us to view the completed code and run it, either locally or through a cloud provider.~~
    1. ***This changelle result is deployed on Heroku and it can be played here: https://amorimjj-ski.herokuapp.com/***
    2. ***Or deploy it locally by running: (nodejs is a prerequisite)***
        ```
        npm install
        npm run dev
        ```
    3. ***Or using docker. There is a [docker-compose.yml](https://github.com/amorimjj/ski/blob/master/docker-compose.yml) file created to allow developers start a deploy enviroment in a simple way. (docker is a prerequisite)***
        ```
        docker-compose build
        docker-compose up -d
        docker-compose exec node bash
        npm install
        npm run dev
        ```  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

### *Everything I did was following instructions to achieve all requirements done. I didn't create any comments or code documentation once this code is clear enough. By the way, it was really simple to understand what was done in the code shared by you and it maked possible to continue the work. I followed the same standards and it resulted in an auto-explained code.*

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* ~~Provide a way to reset the game once it's over~~ ***[ENTER/RETURN] key is used to reset the game once it's over***
* ~~Provide a way to pause and resume the game~~ ***[ENTER/RETURN] key is used to pause/resume game once it isn't over***
* ~~Add a score that increments as the skier skis further~~ ***Score is increased on left corner once skier is skiing***
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.) ***NOT DONE***
* ~~Deploy the game to a server so that we can play it without having to install it locally~~ ***It can be played here: https://amorimjj-ski.herokuapp.com/***
* ~~Write more unit tests for your code~~ ***72.89% of lines covered by 100 unit tests***

```bash
PASS  src/Core/Game.test.js
PASS  src/Entities/Skier.test.js
PASS  src/Entities/Rhino.test.js
PASS  src/Core/AnimationCtrl.test.js

Test Suites: 4 passed, 4 total
Tests:       100 passed, 100 total
Snapshots:   0 total
Time:        26.533s
Ran all test suites.
```

## TODO
1. Update PAUSE message placeholder with final version.
2. Update GAME OVER message placeholder with final version.
3. Create a smooth way to increase player score.
4. Increase the difficulty the longer the skier skis.

We are looking forward to see what you come up with!
