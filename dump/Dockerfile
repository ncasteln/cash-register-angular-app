FROM mongo:6

RUN apt-get update && \
    apt-get install -y cron && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /dump

COPY dump.sh dump.sh
COPY crontab.txt crontab.txt
RUN chmod +x dump.sh
RUN crontab crontab.txt

CMD ["cron", "-f"]
