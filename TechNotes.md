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

# How to Zip file
Shift down all files without (dot prefix)
right click - ZIP > Add to XXX.zip
MOVE the zip file into the .zip folder  
Select Compare info for both files
-Tick both files - CONTINUE
Check the .zip folder to make sure the file is there with the latest date and latest number after the file
Send to code reviewer