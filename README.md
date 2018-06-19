# Welcome to CatChat!

## Why CatChat?!

Have you ever been chatting on an app with a friend who is also using your computer and wanted to know a cat fact?

*WHO HASN'T?!*

CatChat is the premier unstyled, locally deployed, lightweight and also feature-light application for chatting about our feline friends (or at least I couldn't find any after a very cursory repo search) with built in support for getting *infinite semi-random cat facts.

*NOTE: While users may technically chat about anything on CatChat, talking negatively about cats, talking about dogs, talking about anything but cats, etc. is highly discouraged.*

**infinite meaning around 900 individual facts*

## Getting Started

#### Standard Startup Steps

*Disclaimer: This project was built using Node 8.11.2 which was LTS at the point when this project was created.* 

*Some testing was done on other minor versions of Node v.8, but support may be limited or nonexistent for other Node.js major versions.*

0. Clone the repo

1. Install required dependencies

> `yarn`

OR

> `npm i`


**yarn was used for development, although npm should work just fine*

2. Run the project.

**Standard Project (Server and one(1) client instance):**

`yarn start-all`

**Optional Configurations:**

One Server with Two Clients (Chat with your friend(s) ... or just yourself. *No judgement.):

`yarn twin-clients`

Server Only:

`yarn start-server`

Client Only: (maybe useful for testing more cat features or adding more (read: any) styling)

`yarn start`

Run Tests:

`yarn test`

**'No Judgement' may in fact constitute some judgement.*