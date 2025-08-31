#! /bin/bash

# change the out name and create 5 different backups
# change the time (no every minute)

mongodump --host mongodb --db selvetto_db --out=/backup

echo "Cron job executed at $(date)" >> "/backup/backup.log"
