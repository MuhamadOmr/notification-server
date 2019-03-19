# Api notification backend!
example of a backend soultion for sending push notifications and sms messages consists of :
- Api service
- Push notification service
- SMS service

# start services
```sh
docker-compose up --build
```

# run tests for services
```sh
docker-compose -f docker-compose.test.yml up --build
```

# api requests example 
[go here for postman examples of the group, personalized, sms requests](https://documenter.getpostman.com/view/1483846/S17nVB2d)


#### Api Endpoints Documentation
```url
localhost:3000/documentation
```

# testing for each service 
include a .env file in push-notification-service folder

```json

MONGODB_URL=mongodb://localhost:27017/swvltesting

REDIS_URL=redis://localhost:6379

```
