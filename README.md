CIP-FRONT
This project is a Node JS based front-end server application  for Aeroflot operators to work on ivestigations and social network analisys.
There are to indepndent ARM's in the app ARM-DOS and ARM-INV.

PREREQUIREMENTS
To be abble to work and build applicaction you need to install Node JS library at least 7.0 version

TO INSTALL
You can download repository by this link:
$ git clone https://username@bitbucket.org/aflcip/cip-front.git
where "username" your name on BitBucket.
To be abble to download this repository you have to have acsess to this repository.
When repositiory is cloned,you need to go to the repository from terminal using "cd" command and enter the command "npm install" to download all needed packages for this project that are listed at package.json file.

TO LAUNCH

If you want to launch ARM-DOS app:
1)"mock:prd": to launch mock server 
2)"start:brd":to launch app

If you want to launch  ARM-PRD:
1)"mock:inv":to lauch mock server
2)"start:inv":to lauch the app

TO BUILD APP IN PRODUCTION:

"build:inv":to build ARM-INV
"build:prd":to build ARM-DOS

To run tests
There is a general command to run tests on the project that is:
"test"

If you want run spectial test on certain part of the project you need to check the test tree:
                                  test
                                    |
                            ________|__________
                            |                  |
                            |                  |
                        test:jest            lint 
                                              |
                                    __________|________
                                   |                   |
                                   |                   |
                              lint:js              lint:css 

WHERE
"test:jest" is jest based tests on sagas,selectors and ducks
"lint" sytaxis tests on the whole project 
"lint:js" sytaxis tests on JavaScrip Syntax
"lint:css"  sytaxis tests on CSS Syntax
