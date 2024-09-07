# Maranatha Christian Athletics
This repo will contain the code needed for our first project, the Maranatha Athletics website.

Maranatha Web Development Team Contributors:
- Daniil
- Joelle
- Josh
- Zach
- Nevaeh

## Initialize Dev Environment
### Install Git: https://git-scm.com/downloads

Create a `projects` folder.
In that folder, run:
git clone https://github.com/maranathachristian/athletics

### Install Visual Studio Code

https://code.visualstudio.com/

### Install Go

https://go.dev/doc/install

### Install Node

https://nodejs.org/en/download/prebuilt-installer

### Install Yarn

https://github.com/yarnpkg/yarn/releases/download/v1.22.4/yarn-1.22.4.msi

### Install database

https://sbp.enterprisedb.com/getfile.jsp?fileid=1259129

Create a user via pgAdmin called `maranatha`. Give that user the password `christian`. Then create a database called `maranatha`.
If you want to use another database, make changes to the .env file.

### Set up

**Windows:** run `setup.bat`
**Mac:** run `setup.zsh`
**Linux:** run `setup.sh`

### Execution

**Client:** run `yarn run` in `client/`
**Server:** run `go build` in `server/` and then run the `.exe` file generated
