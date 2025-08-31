FROM mongo:6

# apt-get install -y iputils-ping && \
RUN apt-get update && \
    apt-get install -y cron && \
    rm -rf /var/lib/apt/lists/*

COPY backup.sh /backup.sh
COPY crontab.txt /crontab.txt
RUN chmod +x /backup.sh
RUN crontab /crontab.txt

CMD ["cron", "-f"]

# CMD [ "tail", "-f", "/dev/null" ]
