Docker Command to run postgreSQL container

```bash
docker run --name kanban_board -e POSTGRES_DB=kanban_board -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

URL to access the database

```bash
postgresql://postgres:mysecretpassword@localhost:5432/kanban_board
```
