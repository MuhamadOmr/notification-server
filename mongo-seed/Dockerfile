FROM alpine

RUN apk add --update mongodb-tools netcat-openbsd

COPY customers.json /customers.json

COPY wait-for /wait-for

RUN chmod +x /wait-for

CMD ./wait-for mongodb:27017 && mongoimport --host mongodb --db swvl --collection customers --mode merge --type json --file /customers.json --jsonArray
