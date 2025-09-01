#! /bin/bash

BACKUP_DIR="/backup"
MAX_BACKUP=5
OUT="selvetto_db_$(date +"%Y-%m-%d_%H-%M-%S")"
COUNT=$(find "$BACKUP_DIR" -maxdepth 1 -type d -name "selvetto_db_*" | wc -l)

if [ "$COUNT" -ge $MAX_BACKUP ]; then
  # remove the oldest
  OLDEST=$(find "$BACKUP_DIR" -maxdepth 1 -type d -name "selvetto_db_*" | sort | head -n 1)
  rm -rfd "$OLDEST";
fi

mongodump --host mongodb --db selvetto_db --out="$BACKUP_DIR/$OUT"

#restore
# mongorestore --host mongodb --drop --nsInclude="selvetto_db.*" "/backup/$FOLDER"

echo "Cron job executed at $(date)" >> "$BACKUP_DIR/backup.log"
