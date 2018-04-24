# Stand-up Timer
Quit your jibber-jabbering and get to the point. Feel the pressure of the countdown timer as it inexorably ticks down towards zero. Watch as your team-mates crumble when the end bell chimes - absorb the shame emanating from them as they come to terms with their inability to succinctly share their activities yesterday, today, and what their current blockers are. DRINK IT IN!

This is a stand-up timer - although very useable, its main purpose was for me to have a little mess about with React, Docker and Hapi. It is, as a result, *massively over-architected in so many ways*.

## Useage
An internet connection is required to access the text-to-speech api, and to show the background and video links.
### Initialising
When the app is intialised you will be presented with a list of your team members. These can be toggled to remove them from the stand-up if they are not in attendance.

Clicking 'Start' will start the timer.

### The Timer
When the timer is started, each team member will be chosen in random order. You will see a flash screen displaying the team member's surname. If a background image is set, it will play the audio and show the background image. If a video is set, the video will be played in the background with its audio, and the surname audio will not be played.

### Setting Team Member attributes
Currently this cannot be done in GUI, but can be set in the db-data/setup.sql file using queries. The background and video fields should be links to the assets.

## Getting Started
### Pre-requisites
#### Node/NPM
Node and NPM are required to install the package dependencies, and to run the application if you are not using docker.
#### Docker
Docker is required due to the use of Docker secrets, and launching the database container.
#### Secrets
In dev, the secrets are pulled from files in the *secrets* folder. These should be named to match the secrets.
If running locally using `make start-local` the Docker swarm will be initialised and secrets added to the swarm for you.
When deploying, the secrets must be created on the docker swarm hosting the application.
The application uses the following secrets:
* VOICERSS_URL - The application makes use of the Voice RSS text to speech service [http://www.voicerss.org/]. To use this you must set up your own api key. This secret should be the url for the get request, minus the text you wish to convert to audio: http://api.voicerss.org/?key=(YOUR API KEY)&hl=en-us&src=
* MYSQLUSER_PW - Your chosen password for the mysql db user created by the application

### Installation
1. Install Docker.
2. Clone the repo.

### Develop
If you want to mess about with the code just run `make dev`.
Essentially, docker-compose up, but I'm too lazy to type those extra 9 characters. This will give you hot-reloading on the app. The server will automatically rebuild but the app needs to be manually refreshed to show changes.
To stop the app, use *ctrl/cmd + c*

### Docker Swarm/Stack
If you have Docker, you don't even need the rest of the repo, just the docker-stack-local and Makefile files (and the db-data folder for now, until I work that little conundrum out!).
Run `make start-local`. This will even create your secrets on the swarm for you.
To stop the app, run `make stop-local`.

## Deployment
Currently, it can't be deployed until I work out how to initially setup the database without relying on a dumpfile. Probably need to learn knex or something don't I.
You will also need to manually add the secrets to your host manager node.

## License
This project is licensed under the MIT License.

## Other Notes
The App uses webpack v4 zero config; this means there is no need to specify entry points and outputs but requires some config for babel ( which could be done with module binding in package.json script but I prefer to avoid big npm scripts).

## Coming Soon
### Configuration Settings
Basically, a GUI to set timer length. But who knows what could end up in there.
### Edit Team Members In-App
A GUI to edit team member attributes so you don't need to hack it through the sqldump file.
### Actual ability to deploy it
Yeah, so I can't work out how to deploy the database service in production and perform the initial set up gracefully (without copying the file to production node with scp). I'll get there though.
### Change Voice RSS secret to just be an API key!
Okay, that is overly complex so I will change it so you only have to put your API key in the secret!
### Error Handling
Yes yes I'm not handling errors properly. Or at all for that matter.
