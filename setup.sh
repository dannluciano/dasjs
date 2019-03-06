#! /bin/sh

if psql -U postgres -w -lqt | cut -d \| -f 1 | grep -qw "dasdb"; then
    echo "Database \"dasdb\" already exists"
    psql -U postgres -w -d dasdb -f schema.sql
else
    createdb -U postgres -w dasdb && psql -U postgres -w -d dasdb -f schema.sql
fi

echo "Database \"dasdb\" setup finished"
