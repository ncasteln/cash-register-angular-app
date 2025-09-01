FROM mongo:6

# apt-get install -y iputils-ping && \
RUN apt-get update && \
    apt-get install -y cron && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /backup

# to avoid this maybe separate concerns
COPY backup.sh /backup/backup.sh
COPY crontab.txt /backup/crontab.txt
RUN chmod +x /backup/backup.sh
RUN crontab /backup/crontab.txt

CMD ["cron", "-f"]

# CMD [ "tail", "-f", "/dev/null" ]
