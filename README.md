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

https://www.postgresql.org/download/windows/

Create a user via pgAdmin called `maranatha`. Give that user the password `christian`. Then create a database called `maranatha`.
If you want to use another database, make changes to the .env file.

### Download and init

Go into `~projects/athletics/server`

`go mod init github/com/maranathachristian/athletics`

### Install Fiber

`go get -u github.com/gofiber/fiber/v2`

### Create client app (OPTIONAL - I have not tested this yet)

`yarn create vite client -- --template react-ts`

### Install dependencies (OPTIONAL - I have not tested this yet)

`yarn add @mantine/hooks @mantine/core @mantine/form swr @primer/octicons-react`