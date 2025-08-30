#! /bin/bash

BACKUP_FOLDER="/backup/$(date +%F_%R)"
mongodump -o $BACKUP_FOLDER
