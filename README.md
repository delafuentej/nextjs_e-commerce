# Description

# Setting-Up

## Bringing-Up in dev mode.

1. Clone the repository.
2. Create a copy of the file ```.env.template``` and rename it to ```.env```, and modify the environmet variables.
3. Install dependencies: ```npm install```
4. Launch the DB: ```docker compose up -d```
5. Run prisma's migrations: ```npx prisma migrate dev```
6. Execute command SEED ```npm run seed```
6. Launch the application: ```npm run dev```

## Bringin-Up in prod mode. 
