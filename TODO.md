# TODO: Migrate Backend to Railway.app

## Completed Tasks

- [x] Update `server/config/mysqlDb.js` to use connection pool for Railway (persistent server)
- [x] Verify `server/server.js` uses `process.env.PORT` correctly
- [x] Add Railway start script to `package.json`
- [x] Create environment variables documentation for Railway
- [x] Automate table creation on server startup (no manual script needed)

## Remaining Manual Steps

- [ ] Set up Railway project and MySQL database (add MySQL plugin in Railway dashboard)
- [ ] Deploy backend to Railway (tables will be created automatically on first run)
- [ ] Test data persistence
