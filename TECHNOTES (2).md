# Technical Notes

Initialise venv steps - WRITE the steps in CMD Terminal because powershell does not have access to run local scripts

## Followed the following tutorial to create django login and logout 
https://learndjango.com/tutorials/django-login-and-logout-tutorial#log-out-button

## To start webserver cmd type:
python manage.py runserver
Control c to - Kill webserver (do this after checking the webserver, so that it does not keep running locally)

# Project structuure
-- server - django webserver
-- django_project - webserver content
-- accounts - is the sign up page
-- templates - webpages html
-- db.sqlite3 - database - store users
-- index - move to Django project


## COMMANDS for COMMAND PROMPT TERMINAL
cd Server 
python.exe -m pip install --upgrade pip


## Check if Django is installed: $ python -m django --version
If Django is missing, install it: $ pip install django
run the Server: $ python manage.py runserver

### EXAMPLE OF info that will pop up onto the Terminal:

C:\Users\Home\Documents\GitHub\Project3_BadmintonGame\Server>python manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
January 19, 2025 - 21:17:26
Django version 5.1.5, using settings 'django_project.settings'
Starting development server at http://127.0.0.1:8000/ *copy paste this to browser to check*
**Quit the server with CTRL-BREAK.**

To customize the templates involved with password reset, they are located at the following locations; you need to create new template files to override them.

templates/registration/password_reset_confirm.html
templates/registration/password_reset_form.html
templates/registration/password_reset_done.html

### Install Django 
pip install django

Helpful links
- How to Extend User Model in Django
https://www.geeksforgeeks.org/how-to-extend-user-model-in-django/ 