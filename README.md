# Team Tracker
Team Tracker is a web application using Django REST Framework and ReactJS which allows users to track progress of their team on their respective projects.

# Features
- Simple registration for new users
- Users can track progress of all members of user's team for the week
- Users can add their own finished task/accomplishment for the day
- Contains Project Summary which is the overall total of hours rendered by the team members for each project
- Contains a whole page of members of the team the user belongs to
- Accomplishments will only be visible within the team

# Installation
To start using Team Tracker, run the following commands:
```sh
$ cd team-tracker
$ sudo docker-compose build
$ sudo docker-compose up
```
In a separate terminal while ```sudo docker-compose up``` is running, run the following commands:
```sh
$ sudo docker exec -it django_team_tracker python3 manage.py migrate
$ sudo docker exec -it django_team_tracker python3 manage.py loaddata team_projects
```

# Testing
```django_tests.sh``` is a script composed of two curl commands which will return all Teams and all Projects. To do the testing, make sure to be in ```team-tracker``` folder and run the following command:
```sh
$ ./django_tests.sh
```