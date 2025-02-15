# Project3_BadmintonGameAnalysis
Check out the deployed Badminton Game (PASTE LINK)

## Table of Contents
### 1. [Introduction](#Introduction)
### 2. [Desired Outcome](#desired-outcome)
### 3. [Proposed Features](#proposed-features)
### 4. [Wireframe](#wireframe)
### 5. [Design and Features](#design-and-features)
### 7. [Testing](#testing)
### 8. [Deployment](#deployment)
### 9. [Future Improvements](#future-improvemnts)
### 10.[Credits](#credits)

# Introduction 

## Game Analysis System (GAS) Application
I will be extending my project 2 https://github.com/heli-t-00/Project2_badmintonCourt where I’ve created an interactive badminton court. Project 3 will be a Game Analysis System (GAS) Application to analyse and evaluate a game, by collecting, storing, processing relevant game data. This can therefore provide an insight into performance, tactics, outcome, helping users improve their gameplay or strategy for badminton.
Given the time constraint on this project, I will create a Minimal Viable Product (MVP) that can record the number of shots per rally and playback the games, specify outcome of game ie. winner or loser and finally track rally sequence and playback.

For future improvements, the application will record the number of shots and specify the type of shots (ie. smash, drop, clears, nets), specify type of outcomes (ie. unforced error, forced error). 

## Data Storage
I’ve used the Entity Relationship Diagram to give a visual representation of the data in the database, which will form the basis of my database creation.
<img src="assets\images\ERD_P3.PNG" alt="Entity Relationship Diagram">


## Potential Challenges
###### [Back to the top](#table-of-contents)
As I am in the process of upskilling, the challenges I will face is as follow:
- Backend learning curve: Frameworks - Python / Django I may need extra time to understand the basics
- Debugging & testing: Integrating frontend and backend, handling database queries and testing on Heroku could take longer than expected if issues arise
- Unfamiliar tasks: authentication and database is new to me, therefore trying to achieve this in a short space of time can be difficult.
    
## Main Technologies:
- **Frontend:** HTML, CSS, JavaScript 
- **Backend:**  Python with Django.
- **Database:** SQLite.
- **Deployment:** Host on Heroku.

The tech stack I plan to use are:
**HTML** this will provide the content for user interface and structure for login/ registration pages, game input forms (game names, points and shots) and replay interface.

**CSS and Bootstrap** will be used to style the application and user experience, taking into consideration responsiveness.

**JavaScript** will be used for the interactivity, dynamic game replay animations, form validation and submission, fetching and displaying data.

The front end will contribute to the user interface and experience as follows:
HTML & CSS – provides a visually appealing accessible structure for users. Utilising bootstrap will allow design process to be faster.

JavaScript – this will add dynamic elements enabling a smooth user experience.


# Desired Outcome
###### [Back to the top](#table-of-contents)

## Core components of MVC
Model (Data level)
Storing the data at Model level:
User – store login information, user specific game details
Game – store game information (name, points, shot details)
Replay – store sequences of shots and playback

View (Frontend / UI)
Login and Registration – allows the user to register and login to their data (game)
Game input – a form to input name, points, shot details
Game replay – a visual representation of game sequences

Controller (Backend/Logic)
User Authentication – login and register user
Game data handling – save game details and shots into database
Replay functionality – fetch and playback game sequences

<img src="/assets/images/MVC_P3.PNG", alt="MVC for Project 3>


This project intends to satisfy the following Learning Objectives:

- LO1: Use an Agile methodology to plan and design a Full-Stack Web application using an MVC framework and related contemporary technologies.
- LO2: Implement a data model, application features and business logic to manage, query and manipulate data to meet given needs in a particular real-world domain.
- LO3: Identify and apply authorisation, authentication and permission features in a Full-Stack web application solution
- LO4: Create manual and/or automated tests for a Full-Stack Web application using an MVC framework and related contemporary technologies
- LO5: Use a distributed version control system and a repository hosting service to document, develop and maintain a Full-Stack Web application using an MVC framework and related contemporary technologies.
- LO6: Deploy a Full-Stack Web application using an MVC framework and related contemporary technologies to a cloud-based platform.
- LO7: Understand and use object-based software concepts.

###### [Back to the top](#table-of-contents)
# Proposed Features
I have used EPIC to define this project's high-level goal and or objectives on this project 3. 

## User Stories Implementation
### User Story - As a badminton enthusiast:
- "I want to have an interactive platform that helps me to improve my gameplay so that I can enhance my skills and knowledge on a real court"

### Frontend Interaction
- As a user... "I want to see a responsive badminton court on the screen, so that I can visualise different court position and strategies"

### User Progress Tracking
- As a user... "I want to save my learning progress, so I can pick up where I left off when I return."


### Backend Integration
- As a user... "I want to create an account and login in securely, so I can save my game analysis learning experience"
- As a user... "I want the app to save my games and shots, so that I can playback the sequence to analyse a game"

### Deployment
- As an administrator... I want the app to be deployed online and accessible on different devices, so that users can access it from anywhere"

# WireFrame - CHECK THIS
###### [Back to the top](#table-of-contents)


# Design and Features
###### [Back to the top](#table-of-contents)
Given the aggresive deadline, I will focus on the Minimal Viable Product (MPV) approach.
For an MVP, I will ensure core functionality works without worrying about advanced features or intricate design. Here's the breakdown of essential features, that project 3 will focus on:

### MVP for Game Analysis System (GAS) Application
1. **Frontend Features**
    -
2. **Backend Features**
   
3. **Deployment**
    - Basic Deployment: Deploy the application to a cloud platform (e.g., Heroku or Vercel). Make sure the app works on both desktop and mobile browsers.
4. **Testing & Validation**
    - Manual Testing: Focus on manual testing of core features like user registration, court interactivity, and progress tracking.
-   - Basic Automated Testing: Implement a few unit tests for core functionalities, like user registration.
**Key Priorities**
- 
- Ensure backend systems (like authentication and data storage) are working, but don't worry about advanced features or perfect security for now.

---------------------------------------------------------------------------------------------------------



# Testing
###### [Back to the top](#table-of-contents)
To ensure all features work as intended. The following test was performed
## Responsive
The website used [Am I Responsive](https://ui.dev/amiresponsive?url=https://heli-t-00.github.io/Project2_badmintonCourt/)
<img src="">

## Browser Friendly
The site has been tested for the following browsers: Chrome, Firefox, Edge, Vivaldi, Brave, and Tor Browser.
Checked use this [Browserling.com](https://www.browserling.com/browse/win10/tor13.5/https://heli-t-00.github.io/Project2_badmintonCourt/)
<img src="">

## Accessible - Lighthouse test 
Used this to test the quality of the website. Providing a comprehensive audit of the website's performances, accessibility, SEO (Search Engine Optimisation), best practices, and Progressive Web App (PWA) capabilities. 
<img src="">
<img src="">

## Validator Testing
### HTML & CSS & JavaScript
No errors were returned when passing through the official [W3C Nu HTML Checker](https://validator.w3.org/nu/).
<img src="" alt="results validation test">

No errors were found when passing through the official validator - [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator). The document validates as CSS level 3 + SVG.
<img src="">
<img src="">
There were warnings, which has been checked and resolved."vendor extesnion" means that the property is specific to a particular browser engine.

For JavaScript I installed SonarQube for IDE to check and validate the javascript code. 

# Deployment
###### [Back to the top](#table-of-contents)
The site was deployed to GitHub pages. 
The steps to deploy are as follows:
In the GitHub repository, navigate to the Settings tab
From the source section drop-down menu, select the Master Branch
Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

I have used GitHub to deploy the website. [Live Link]()
Visual Studio Code editor from Microsoft to write the codes and linked to GitHub for deployment. 
Deploy the web application to a cloud platform for public access via [github](https://github.com/heli-t-00/Project2_badmintonCourt)
Maximised future maintainability through clear documentation (this readme file) and organised code structure, the three tech stack used, html, css and javascript has their own files and each has clear comments to allow future maintainability.

# Future Improvements
Here are future feature ideas to further improvements on this project:



# Credits
###### [Back to the top](#table-of-contents)
The following links and websites were used to asisst with my development of the code and content of the website.
Code Institute bootcamp materials, ChatGPT, W3 Schools was used as part of research to learn the concept of for loop, if/else statements, switch, functions.
* [W3 Schools](https://www.w3schools.com/)
* Javascript 
* SVG Tutorials 
https://www.w3schools.com/graphics/svg_intro.asp
https://www.youtube.com/watch?v=WzxBfkUtM1Y
https://webdesign.tutsplus.com/svg-viewport-and-viewbox-for-beginners--cms-30844t


* Code Reviewer: M.P (Friend who has not given permission to share his fullname)

* Lucid Chart - creation
* Followed the following tutorial to create django login and logout - https://learndjango.com/tutorials/django-login-and-logout-tutorial#log-out-button

###### [Back to the top](#table-of-contents)

