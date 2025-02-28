# Setting Up
Install python

Ensure you are in the "Server" folder in your terminal window by using cd (change directory)

```shell
python -m venv .venv
set-executionpolicy remotesigned -Scope Process
.venv\Scripts\activate
python.exe -m pip install --upgrade pip
pip install -r requirements.txt
```

# Package management
```shell
pip install djangorestframework
pip install drf-writable-nested
```

```shell
python -m pip freeze > requirements.txt
```

```shell
pip install -r requirements.txt
```

# Creating a new app

```shell
python manage.py startapp gas
```

# Updating django settings.json

    Add installed apps in settings.py

# Every time you add/delete or change a model

Make change in models.py then run

```shell
python manage.py makemigrations accounts
python manage.py migrate
```

## Create a new superuser

```shell
python manage.py createsuperuser
```

# Running the server
```shell
python manage.py runserver
```

## Login to API

<http://127.0.0.1:8000>

## URLs (only when logged in)

### Test direct access to bgas

<http://127.0.0.1:8000/bgas>
Go straight to the court if we are logged in

### Get a list of games

<http://127.0.0.1:8000/gas/?format=json>
Gets the list of games with no details

### Get a single games details

<http://127.0.0.1:8000/gas/1>
Click this link and then paste in the update json and click PUT

<http://127.0.0.1:8000/gas/1?format=json>
Gets the details of game 1 in JSON format

### Create a new game

<http://127.0.0.1:8000/gas>
Click this then paste in the create json and click POST 

# Example game name data

```json
[
    {
        "id": 1,
        "name": "Warm Up routine",
        "created_date": "2025-02-01T09:38:36.442169Z",
        "user": 1
    },
    {
        "id": 2,
        "name": "Another",
        "created_date": "2025-02-02T01:24:41.386439Z",
        "user": 1
    }
]
```

# Example detail data

```json
{
    "id": 1,
    "points": [
        {
            "id": 4,
            "shots": [
                {
                    "id": 4,
                    "a1x": 5.0,
                    "a1y": 3.0,
                    "b1x": 0.0,
                    "b1y": 0.0,
                    "sx": 0.0,
                    "sy": 0.0,
                    "point": 4
                }
            ],
            "total": 2,
            "team_a": 0,
            "game": 1
        }
    ],
    "name": "Warm Up routine",
    "created_date": "2025-02-01T09:38:36.442169Z",
    "user": 1
}
```

# Example create data

```json
{
    "points": [
        {
            "shots": [
                {
                    "a1x": 5.0,
                    "a1y": 3.0,
                    "b1x": 0.0,
                    "b1y": 0.0,
                    "sx": 0.0,
                    "sy": 0.0
                }
            ],
            "total": 2,
            "team_a": 0
        }
    ],
    "name": "Warm Up routine",
    "created_date": "2025-02-01T09:38:36.442169Z",
    "user": 1
}
```

# Example update data

```json
{
    "id": 1,
    "points": [
        {
            "shots": [
                {
                    "a1x": 5.0,
                    "a1y": 3.0,
                    "b1x": 0.0,
                    "b1y": 0.0,
                    "sx": 0.0,
                    "sy": 0.0
                }
            ],
            "total": 2,
            "team_a": 0,
            "game": 1
        }
    ],
    "name": "Warm Up routine",
    "created_date": "2025-02-01T09:38:36.442169Z",
    "user": 1
}
```

# Deploying to Heroku

<https://medium.com/jungletronics/a-django-blog-in-vs-code-heroku-deploy-how-to-push-your-site-to-production-a3119c4bcb81>

# Stuck on this 
adding image to home page tried the following steps
on localserver  it works but not after it was deployed to heroku
I followed the following steps from gemini.
except for last part. didn't understand.

how do i ensure my url goes to the correct directory to add this image for a django app, step by step for beginner // #circle-cover-bg {

    background: url('..\images\badminton_courtBGAS.PNG') no-repeat top center / cover;

    height: 90vw;

    width: 90vw;

    margin-bottom: 20px;

    /* Makes the square image into a circle */

    border-radius: 50%;

    max-width: 300px;

    max-height: 300px;

}



#benefits-image {

    display: flex;

    align-items: center;

    justify-content: center;

}



Alright, let's get that image displaying correctly in your Django app. Here's a step-by-step guide for beginners:

1. Place the Image in the Correct Directory:

Create an images directory:
Within your Django app's directory (the one containing views.py, models.py, etc.), create a folder named static.
Inside the static folder, create another folder named images.
This static/images structure is where Django will look for your images.
Move your image:
Place your badminton_courtBGAS.PNG image file into the static/images folder.
2. Configure Django to Serve Static Files:

settings.py:
Open your project's settings.py file.
Add the following lines to the bottom of the file (if they're not already there):
Python

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'your_app_name', 'static'), #replace your_app_name
]
Explanation:
STATIC_URL: This tells Django the base URL for your static files (e.g., /static/).
STATICFILES_DIRS: This tells Django where to look for static files in your project. Replace your_app_name with the actual name of your Django app.
os.path.join(BASE_DIR, 'your_app_name', 'static'): this creates the full path to the static folder.
3. Update Your CSS to Use the Correct URL:

CSS File:
Open the CSS file where you have the #circle-cover-bg rule.
Change the background: url(...) line to:
CSS

#circle-cover-bg {
    background: url('/static/images/badminton_courtBGAS.PNG') no-repeat top center / cover;
    /* ... rest of your CSS ... */
}
Explanation:
/static/images/badminton_courtBGAS.PNG: This is the correct URL for your image, relative to the STATIC_URL you defined in settings.py.
4. Load Static Files in Your Template:

HTML Template:
In the HTML template where you're using the #circle-cover-bg element, add the following line at the top of the file:
HTML

{% load static %}
Explanation:
This template tag tells Django to load the static files.
5. Run the Django Development Server:

Terminal:
Open your terminal and navigate to your project's directory (where manage.py is located).
Run the following command:
Bash

python manage.py runserver
6. Verify the Image:

Browser:
Open your web browser and go to the URL where your Django app is running.
The image should now be displayed correctly.
Troubleshooting:

Image Not Showing:
Double-check the file path and file name in your CSS.
Make sure the image is actually in the static/images folder.
Clear your browser's cache.
Make sure you have correctly replaced your_app_name in the settings.py file.
Static Files Not Serving:
Ensure you've added the STATIC_URL and STATICFILES_DIRS settings correctly.
If you are in production, you will need to run the command python manage.py collectstatic and configure your webserver to serve static files.
By following these steps, you should be able to successfully display your image in your Django app.





how do i import OS, have this error //Traceback (most recent call last):

  File "C:\Users\Home\Documents\GitHub\badminton-gas\manage.py", line 22, in <module>

    main()

  File "C:\Users\Home\Documents\GitHub\badminton-gas\manage.py", line 18, in main

    execute_from_command_line(sys.argv)

  File "C:\Users\Home\Documents\GitHub\badminton-gas\.venv\Lib\site-packages\django\core\management\__init__.py", line 442, in execute_from_command_line

    utility.execute()

  File "C:\Users\Home\Documents\GitHub\badminton-gas\.venv\Lib\site-packages\django\core\management\__init__.py", line 382, in execute

    settings.INSTALLED_APPS

  File "C:\Users\Home\Documents\GitHub\badminton-gas\.venv\Lib\site-packages\django\conf\__init__.py", line 81, in 

__getattr__

    self._setup(name)

  File "C:\Users\Home\Documents\GitHub\badminton-gas\.venv\Lib\site-packages\django\conf\__init__.py", line 68, in 

_setup

    self._wrapped = Settings(settings_module)

                    ^^^^^^^^^^^^^^^^^^^^^^^^^

  File "C:\Users\Home\Documents\GitHub\badminton-gas\.venv\Lib\site-packages\django\conf\__init__.py", line 166, in __init__

    mod = importlib.import_module(self.SETTINGS_MODULE)

          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  File "C:\Python312\Lib\importlib\__init__.py", line 90, in import_module

    return _bootstrap._gcd_import(name[level:], package, level)

           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  File "<frozen importlib._bootstrap>", line 1387, in _gcd_import

  File "<frozen importlib._bootstrap>", line 1360, in _find_and_load

  File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked

  File "<frozen importlib._bootstrap>", line 935, in _load_unlocked

  File "<frozen importlib._bootstrap_external>", line 995, in exec_module

  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed

  File "C:\Users\Home\Documents\GitHub\badminton-gas\django_project\settings.py", line 142, in <module>

    os.path.join(BASE_DIR, 'django_project', 'static'),

    ^^

NameError: name 'os' is not defined. Did you forget to import 'os'?



You're absolutely right! The error message NameError: name 'os' is not defined. Did you forget to import 'os'? tells you exactly what's missing: you need to import the os module.

Here's how to fix it, step by step:

1. Open Your settings.py File:

Navigate to your Django project's directory (the one containing manage.py).
Open the django_project folder (or whatever you named your project's main folder).
Open the settings.py file.
2. Add the import os Line:

At the very top of your settings.py file, add the following line:
Python

import os
It's standard practice to put imports at the beginning of your Python files.
3. Ensure BASE_DIR is Correct:

While you're in settings.py, double-check that your BASE_DIR variable is defined correctly. It's usually near the top of the file and should look something like this:
Python

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
This line is crucial because it helps Django find the root directory of your project.
4. Check the STATICFILES_DIRS Variable:

In your settings.py file, find the STATICFILES_DIRS variable. It should look like this:
Python

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'your_app_name', 'static'), #replace your_app_name
]
Make sure you replace 'your_app_name' with the actual name of your Django app folder.
5. Save the settings.py File:

Save the changes you made to settings.py.
6. Run Your Django Server Again:

Open your terminal or command prompt.
Navigate to your project's directory (where manage.py is located).
Run the following command:
Bash

python manage.py runserver
Explanation:

import os: The os module in Python provides functions for interacting with the operating system, such as working with file paths (like os.path.join).
os.path.join(): This function is used to construct file paths in a way that is compatible with different operating systems (Windows, macOS, Linux).
By adding import os at the top of your settings.py file, you're telling Python to make the os module's functions available for use in that file. Your error should now be resolved.





BASE_DIR current shows this // BASE_DIR = Path(__file__).resolve().parent.parent do i need to change it to BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))



No, you do not need to change BASE_DIR if it currently shows BASE_DIR = Path(__file__).resolve().parent.parent.

Here's why:

Path(__file__).resolve().parent.parent (using pathlib) and os.path.dirname(os.path.dirname(os.path.abspath(__file__))) (using os.path) both achieve the same result: they find the root directory of your Django project.
pathlib is a more modern and often preferred way to work with file paths in Python. It's generally considered more readable and object-oriented.
Since your BASE_DIR is already correctly set using pathlib, there's no need to switch to the older os.path method.
Just make sure you add import os to the top of the file, and your problem will be solved.

In short:

If your BASE_DIR is Path(__file__).resolve().parent.parent, leave it as is.
Add import os to the top of your settings.py file.
Your error should be fixed.




i now have this issue // WARNINGS:

?: (staticfiles.W004) The directory 'C:\Users\Home\Documents\GitHub\badminton-gas\django_project\static' in the STATICFILES_DIRS setting does not exist.



System check identified 1 issue (0 silenced).

February 25, 2025 - 15:20:33

Django version 5.1.5, using settings 'django_project.settings'

Starting development server at http://127.0.0.1:8000/

Quit the server with CTRL-BREAK.



The warning message WARNINGS: ?: (staticfiles.W004) The directory 'C:\Users\Home\Documents\GitHub\badminton-gas\django_project\static' in the STATICFILES_DIRS setting does not exist. clearly indicates that Django cannot find the static directory you've specified in your settings.py.

Here's how to fix it:

1. Verify the Directory Structure:

Double-check the path:
Carefully examine the path shown in the warning message: C:\Users\Home\Documents\GitHub\badminton-gas\django_project\static.
Make sure this path accurately reflects the location of your static folder.
Confirm the folder exists:
Open your file explorer and navigate to the django_project directory.
Verify that the static folder is actually present. If it's not, create it.
2. Correct STATICFILES_DIRS in settings.py:

Open settings.py:
Open your django_project/settings.py file.
Review STATICFILES_DIRS:
Locate the STATICFILES_DIRS setting.
Ensure that the path within the list is correct.
The most common error is that the app name is incorrect.
If your static folder is at the project root level, and not within a specific app, then the STATICFILES_DIRS should look like this:
Python

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
If the static folder is within a specific app (e.g., if you have an app named "my_app"), it should look like this:
Python

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'my_app', 'static'),
]
Replace 'my_app' with the actual name of your app.
Save settings.py:
Save the changes you've made.
3. Restart the Django Development Server:

Terminal:
Stop the currently running server (CTRL+C or CTRL+BREAK).
Run the server again: python manage.py runserver.
Explanation:

Django's static file handling relies on the STATICFILES_DIRS setting to know where to look for static files.
If the specified directory does not exist, Django will issue a warning.
By correcting the path in settings.py and ensuring the folder exists, you resolve the issue.
If you have your static files in various apps, then you can add multiple paths to the STATICFILES_DIRS list.
By following these steps, you should eliminate the warning and have your static files served correctly.





this worked on loal, but when i deployed it on heroku the image disappeared, explain how to fix this step by step beginner use powershell


Okay, let's get your image displaying correctly on Heroku after it worked locally. Here's a step-by-step guide using PowerShell:

Understanding the Issue

When you deploy to Heroku, it creates a new, ephemeral environment. This means:

No Local File Paths: Your local file paths (like C:\Users\...) don't exist on Heroku.
Static File Collection: Heroku needs to know where to find your static files and how to serve them.
Steps to Fix the Image on Heroku

1. Ensure Correct Static File Setup (Locally):

Verify STATICFILES_DIRS:
Open your django_project/settings.py file.
Confirm that STATICFILES_DIRS is set correctly. If your static folder is in your project root, it should be:
Python

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
Verify STATIC_ROOT:
Add this line to your settings.py file, this is very important for heroku.
Python

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
Place images:
Make sure that your badminton_courtBGAS.PNG image is placed in the static/images folder.
2. Collect Static Files (Locally):

Open PowerShell:
Open PowerShell in your Django project's directory (where manage.py is located).
Run collectstatic:
Execute the following command:
PowerShell

python manage.py collectstatic
Explanation:
This command gathers all your static files (images, CSS, JavaScript) from your project and its apps and copies them into the STATIC_ROOT directory.
This is crucial for Heroku, as it creates a centralized location for static files.
3. Update Your requirements.txt:

Open PowerShell:
If you don't already have a requirements.txt file, or if you have made changes to your python packages, run this command.
PowerShell

pip freeze > requirements.txt
Explanation:
This ensures that Heroku installs all the necessary Python packages.
4. Update Your Procfile:

Verify Procfile:
Make sure you have a Procfile in your project's root directory.
It should contain a line like this:
web: gunicorn django_project.wsgi --log-file -
Add Static File Serving (Optional but Recommended):
For production, it's best to use a dedicated static file server. However, for simpler deployments, you can use whitenoise.
Install whitenoise.
PowerShell

pip install whitenoise
Update settings.py:
Add whitenoise.middleware.WhiteNoiseMiddleware to your MIDDLEWARE setting:
Python

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # Add this line
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... other middleware ...
]
Configure WhiteNoise:
In your settings.py file, add the following line under your STATIC_ROOT variable.
Python

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
5. Commit and Push to Heroku:

Git:
Add your changes to Git:
PowerShell

git add .
git commit -m "Fix static files for Heroku"
Push to Heroku:
PowerShell

git push heroku main
6. Verify on Heroku:

Open your Heroku app in your browser.
Check if the image is now displayed.
If not:
Use your browser's developer tools (usually F12) to check the "Network" tab.
Look for any 404 errors related to your image.
If you see a 404, double-check the path in your CSS.
Heroku logs can be viewed with this command. heroku logs --tail
Key Points:

collectstatic is essential for Heroku.
STATIC_ROOT is where the collected static files go.
whitenoise is a simple way to serve static files on Heroku.
Always check your Heroku logs for errors.
By following these steps, you should be able to get your image displaying correctly on Heroku.





this is what i currently have // STATIC_URL = '/static/'

STATICFILES_DIRS = [

    os.path.join(BASE_DIR, 'accounts', 'static'),

]



Okay, based on your STATICFILES_DIRS setting, it looks like you're organizing your static files within an app named accounts. Let's clarify how to adjust your setup for Heroku based on this:

Understanding Your Setup:

STATICFILES_DIRS = [os.path.join(BASE_DIR, 'accounts', 'static')]: This tells Django that your static files are located in the static folder inside your accounts app.
Steps for Heroku Deployment (Adjusted for Your App)

Verify Static File Placement:

Ensure that your badminton_courtBGAS.PNG image is located in the correct directory: accounts/static/images/badminton_courtBGAS.PNG. Create the images folder if it does not exist.
Add STATIC_ROOT and STATICFILES_STORAGE to settings.py:

Open your django_project/settings.py file.
Add the following lines:
Python

import os #make sure this is at the top of the document.
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'accounts', 'static'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
Install WhiteNoise:
If you haven't already, install WhiteNoise:
PowerShell

pip install whitenoise
Add WhiteNoise Middleware:
In your settings.py, add whitenoise.middleware.WhiteNoiseMiddleware to your MIDDLEWARE setting:
Python

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # ... other middleware ...
]
Collect Static Files (Locally):
Open PowerShell in your Django project's directory.
Run:
PowerShell

python manage.py collectstatic
Update requirements.txt:
PowerShell

pip freeze > requirements.txt
Commit and Push to Heroku:
Add your changes to Git:
PowerShell

git add .
git commit -m "Fix static files for accounts app"
* Push to Heroku:
PowerShell

git push heroku main
Verify on Heroku:
Open your Heroku app in your browser.
Check if the image is displayed.
Use browser developer tools to check for errors.
Use the command heroku logs --tail to view the heroku logs.
Important Notes:

App-Specific Static Files: By placing your static files within the accounts/static directory, you're keeping them organized and specific to that app. This is good practice.
collectstatic: This command is essential for gathering your static files into the STATIC_ROOT directory, which Heroku can then serve.
WhiteNoise: Using WhiteNoise simplifies static file serving on Heroku.
By following these steps, your image should now be correctly displayed on your Heroku deployment.





the image has not deployed to heroku


Alright, let's troubleshoot why your image isn't deploying to Heroku. We'll go through a systematic process to pinpoint the issue.

1. Double-Check Local Setup:

File Location:
Confirm that badminton_courtBGAS.PNG is exactly in accounts/static/images/. Case matters!
collectstatic:
Run python manage.py collectstatic again locally.
Carefully examine the output. It should indicate that badminton_courtBGAS.PNG was collected. If it's not listed, there's a problem with the file's location or name.
Local Testing:
Run your Django development server locally (python manage.py runserver).
Inspect the page in your browser. Use the browser's developer tools (F12) to:
Check the "Elements" tab to see if the <img> or CSS background-image URL is correct.
Check the "Network" tab to see if the image is being loaded and if there are any 404 errors.
2. Heroku-Specific Checks:

Heroku Logs:
Run heroku logs --tail in your PowerShell.
Look for any errors related to static files, file paths, or WhiteNoise.
Pay close attention to any 404 errors.
Git and Deployment:
Verify that you committed all changes (git add ., git commit -m "...").
Double-check that you pushed to Heroku (git push heroku main).
Sometimes, a failed deployment can leave behind a corrupted state. Redeploy your application.
Clear Heroku Cache:
Sometimes heroku caches old static files. Run this command in your powershell.
heroku restart
CSS Path:
Ensure that the path in your CSS is correct. If the image is in accounts/static/images/, then the CSS should point to /static/images/badminton_courtBGAS.PNG.
If you are using an <img> tag, then the src should point to {% static 'images/badminton_courtBGAS.PNG' %}. And make sure that {% load static %} is at the top of your html file.
3. Potential Issues and Solutions:

Case Sensitivity:
Linux (which Heroku uses) is case-sensitive. "image.PNG" is different from "image.png". Verify that the file name and extension in your code and file system match exactly.
File Permissions (Unlikely on Heroku):
While less likely on Heroku, ensure that the file has read permissions.
WhiteNoise Configuration:
Double-check your settings.py for correct WhiteNoise setup (middleware and STATICFILES_STORAGE).
Incorrect STATIC_URL:
Verify that the STATIC_URL is set to /static/
Troubleshooting Steps:

Simplify: Temporarily, place a very simple test image (e.g., a small, solid-color PNG) in the same directory. Change your CSS to use this test image. If it works, the problem is with your original image.
Isolate: If you're using a complex CSS rule, try a very basic rule: background-image: url('/static/images/badminton_courtBGAS.PNG');.
Inspect Network Tab: The Network tab of your browser's developer tools is crucial. It will tell you exactly what's happening when the browser tries to load the image.
By systematically going through these checks, you should be able to identify and resolve the issue. If you continue to have problems, please provide the following information:

The exact output of python manage.py collectstatic (locally).
The relevant section of your settings.py file.
Any error messages from your Heroku logs.
The html and css code that is used to display the image.




this is the result i got after run python.manage.py collectstatic //

(.venv) PS C:\Users\Home\Documents\GitHub\badminton-gas> python manage.py collectstatic



You have requested to collect static files at the destination

location as specified in your settings:



    C:\Users\Home\Documents\GitHub\badminton-gas\staticfiles



This will overwrite existing files!

Are you sure you want to do this?



Type 'yes' to continue, or 'no' to cancel:



The output you're seeing from python manage.py collectstatic is perfectly normal. It's asking you to confirm that you want to overwrite any existing files in your staticfiles directory.

Here's what you need to do and why:

Understanding the collectstatic Confirmation:

collectstatic's Purpose:
As we've discussed, collectstatic gathers all your static files (images, CSS, JavaScript) into a single directory (STATIC_ROOT) for deployment.
Potential Overwriting:
If you've run collectstatic before, or if there are already files in your staticfiles directory, the command will overwrite them with the latest versions.
Confirmation Prompt:
To prevent accidental data loss, Django asks you to confirm that you want to proceed.
How to Proceed:

Type yes and Press Enter:

In your PowerShell window, type yes (all lowercase) and press the Enter key.
This will tell Django that you're aware of the potential overwriting and that you want to continue.
Observe the Output:

After you press Enter, collectstatic will start copying your static files.
Pay close attention to the output. It should list the files that are being copied, including your badminton_courtBGAS.PNG image.
If your image is not listed, this is a sign that the image is not in the correct location.
Check the staticfiles Folder:

After collectstatic finishes, go to your project's root directory and look for the staticfiles folder.
Inside, you should see your static files, including your image.
If your image is not there, then there is a problem with the path in your settings.py file.
Important Considerations:

Version Control:
Make sure that your staticfiles folder is not included in your Git repository. It should be generated during deployment, not tracked. Add staticfiles/ to your .gitignore file.
Deployment Workflow:
You should run collectstatic before each deployment to Heroku to ensure that you're deploying the latest versions of your static files.
By typing yes and observing the output, you'll be able to confirm that your static files are being collected correctly. If they are not being collected, then you will know to look at your file paths.






this is the result i got, after typing Yes // Found another file with the destination path 'css\styles.css'. It will be ignored since only the first encountered file is collected. If this is not what you want, 

make sure every static file has a unique path.

Found another file with the destination path 'images\badminton_courtBGAS.PNG'. It will be ignored since only the first encountered file is collected. If this is not what you want, make sure every static file has a unique path.



0 static files copied to 'C:\Users\Home\Documents\GitHub\badminton-gas\staticfiles', 165 unmodified.



The output you've provided reveals a critical issue:

Found another file with the destination path 'css\styles.css'. It will be ignored since only the first encountered file is collected. If this is not what you want, make sure every static file has a unique path.
Found another file with the destination path 'images\badminton_courtBGAS.PNG'. It will be ignored since only the first encountered file is collected. If this is not what you want, make sure every static file has a unique path.

0 static files copied to 'C:\Users\Home\Documents\GitHub\badminton-gas\staticfiles', 165 unmodified.
Understanding the Problem:

Duplicate Static File Paths: Django is finding multiple files with the same destination paths (css\styles.css and images\badminton_courtBGAS.PNG). This means you have duplicate static files in different locations that are trying to be copied to the same location in your staticfiles folder.
"First Encountered" Rule: Django's collectstatic command only copies the first file it encounters with a given path. Subsequent files with the same path are ignored.
"0 static files copied" This means that because of the duplicate path issue, no new static files were copied.
How to Fix It:

Identify Duplicate Static Files:

You need to find all the locations where you have copies of css\styles.css and images\badminton_courtBGAS.PNG.
Use your file explorer or a code editor's "Find in Files" feature to search your entire project for these file names.
Organize Your Static Files:

Decide which location is the correct location for your static files.
Recommended Approach: Keep your static files within your app's static folder. Since you have your badminton_courtBGAS.PNG in the accounts app, then ensure that the css folder is also within the accounts app.
Remove the duplicate files from other locations.
Verify STATICFILES_DIRS:

Double-check your settings.py file to ensure that STATICFILES_DIRS correctly points to the location of your static files.
If you have static files in multiple apps, then you will need to add multiple paths to the STATICFILES_DIRS list.
Run collectstatic Again:

After removing the duplicate files, run python manage.py collectstatic again.
This time, it should copy your static files correctly.
Example:

If you find images\badminton_courtBGAS.PNG in both accounts/static/images/ and project_root/static/images/, remove the one in project_root/static/images/.
If you have the css folder in the project root, move that folder into the accounts/static/ folder.
Important:

Make sure that all your static files have unique paths.
Keep your static files organized within your app's static folder.