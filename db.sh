#! /bin/sh

if psql -lqt | cut -d \| -f 1 | grep -qw "dasdb"; then
    echo "Database \"dasdb\" already exists"
    psql -d dasdb -f schema.sql
else
    createdb dasdb && psql -d dasdb -f schema.sql
fi

echo "Database \"dasdb\" setup finished"
