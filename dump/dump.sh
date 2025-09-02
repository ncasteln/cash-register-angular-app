#! /bin/bash

# Make a database backup every 10 minutes with a maximum limit of 5.
# In case they are 5 or more, the oldest is overwritten and so on.

# MONGODB CMDS
# mongosh "mongodb://mongodb:27017"
# mongodump --host mongodb --db selvetto_db --out=/backup
# mongorestore --drop /backup/selvetto_db_dump
# mongorestore --db=selvetto_db backup/name-of-dump

DUMPS="/dump/dumps"
MAX_BACKUP=5
OUT="selvetto_db_$(date +"%Y-%m-%d_%H-%M-%S")"
COUNT=$(find "$DUMPS" -maxdepth 1 -type d -name "selvetto_db_*" | wc -l)

if [ "$COUNT" -ge $MAX_BACKUP ]; then
  # remove the oldest
  OLDEST=$(find "$DUMPS" -maxdepth 1 -type d -name "selvetto_db_*" | sort | head -n 1)
  rm -rfd "$OLDEST";
fi

mongodump --host mongodb --db selvetto_db --out="$DUMPS/$OUT"

#restore
# mongorestore --host mongodb --drop --nsInclude="selvetto_db.*" "/backup/$FOLDER"

echo "Cron job executed at $(date)" >> "$DUMPS/dump.log"
