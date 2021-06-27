#!/bin/sh

psql -f db/install.sql -U postgres
PGPASSWORD=qwerty psql -d sushi -f db/structure.sql -U odmen
PGPASSWORD=qwerty psql -d sushi -f db/data.sql -U odmen

npm run build && npm start

