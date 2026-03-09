#!/bin/bash
echo "Restoring MongoDB data..."
mongorestore --db twistslook /docker-entrypoint-initdb.d/dump/twistslook
echo "MongoDB data restored successfully!"
