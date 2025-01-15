# Example POST & GET Body for Express.js

Whenever 
- `_id` id of User
- `type == 0` for list of events.
- `type == 1` for list of dated_events.
- `_eventId` id of either event ot dated_event (depends of type mentioned before)


## POST for `/register`

Body:
```json
{
  "nick": "UserNickname",
  "email": "user@example.com",
  "password": "userPassword"
}
```

Response:
- 201 - 'Account created'
- 500 - 'Error'

---

## POST for `/login`

Body:
```json
{
  "email": "user@example.com",
  "password": "userPassword"
}
```

### Response
- 200 - Body:
  ```json
  {
    "_id": "{user_id}",
    "nick": "UserNickname"
  }

  ```
- 400 - 'Invalid username or password'
- 500 - 'Error logging in'

---

## PUT for `/changeNick`

Body:
```json
{
  "_id": "{user_id}",
  "password": "currentPassword",
  "newNick": "NewNickname"
}
```

### Response
- 200 - 'Nick changed'
- 404 - 'User not found'
- 500 - 'Error'

---

## PUT for `/changePassword`

Body:
```json
{
  "_id": "{user_id}",
  "oldPassword": "currentPassword",
  "newPassword": "newPassword"
}
```

### Response
- 200 - 'Password changed'
- 404 - 'User not found'
- 500 - 'Error'

---

## GET for `/getEvents`

### URL:
```
/getEvents?_id={user_id}&type={0|1}
```

### Response:
- 200 - Body:
#### for `type == 0`:
```json
{
  "events": [
    {
      "_id": {
        "$oid": "605c72e3a6401f001f02d0ed"
      },
      "name": "Event 1",
      "desc": "Description for Event 1",
      "color": "Red"
    },
    // ... other events
  ]
}
```

#### for `type == 1`:
```json
{
  "dated_events": [
    {
      "_id": {
        "$oid": "605c72e3a6401f001f02d0f7"
      },
      "name": "Dated Event 1",
      "desc": "Description for Dated Event 1",
      "color": "Red",
      "start": {
        "$date": "2025-01-09T11:35:00.000Z"
      },
      "duration": 480, //duration in minutes
    },
    // ... other dated events
  ]
}
```

- 400 - 'Missing parameters or invalid dates'
- 404 - 'User not found'
- 500 - 'Error retrieving events'

---

## GET for `/getEventsByDate`

### URL:
```
/getEventsByDate?_id={user_id}&from={date_from}&to={date_to}
```

### Response:
- 200 - Body:
```json
[
  {
    "_id": {
      "$oid": "605c72e3a6401f001f02d0fb"
    },
    "name": "Dated Event 2",
    "desc": "Description for Dated Event 2",
    "color": "Green",
    "start": {
      "$date": "2023-10-10T00:00:00Z"
    },
    "duration": 75
  }
  // ... other events
]
```
- 400 - 'Missing parameters or invalid dates'
- 404 - 'User not found'
- 500 - 'Error retrieving events'

---

## POST for `/createEvent`
```json
{
  
  "_id": "{user_id}",
  "event": {
    "name": "New Event",
    "desc": "Description for the new event",
    "color": "Blue"
  }
}
```

### Response:
- 201 - Body:
```json
  "event": {
    "_id": {
      "$oid": "605c72e3a6401f001f02d0fb"
    },
    "name": "New Event",
    "desc": "Description for the new event",
    "color": "Blue"
  }
```
- 400 - 'Missing parameters'
- 404 - 'User not found'
- 500 - 'Error creating event'

---

## POST for `/createDatedEvent`
```json
{
  
  "_id": "{user_id}",
  "event": {
    "name": "New Event",
    "desc": "Description for the new event",
    "color": "Blue",
    "duration": 10,
    "start": "2023-10-01T00:00:00Z"
  }
}
```

### Response
201 - Body:
```json
  "event": {
    "_id": {
      "$oid": "605c72e3a6401f001f02d0fb"
    },
    "name": "New Event",
    "desc": "Description for the new event",
    "color": "Blue",
    "duration": 10,
    "start": "2023-10-01T00:00:00Z"
  }
```
- 400 - 'Missing parameters'
- 404 - 'User not found'
- 500 - 'Error creating dated event'

---

## POST for `/updateEvent`
```json
{
  "_id": "{user_id}",
  "_eventId": "{event_id}",
  "updatedEvent": {
    "name": "Updated Event Name",
    "desc": "Updated Description",
    "color": "Green"
  },
  "type": 0 // 0 for regular events, 1 for dated events
}
```

### Response
- 200 - 'Event updated'
- 400 - 'Missing required fields or invalid input'
- 404 - 'User or event not found'
- 500 - 'Error updating event'

---

## POST for `/deleteEvent`
```json
{
  "_id": "{user_id}",
  "_eventId": "{event_id}",
  "type": 0 // 0 for regular events, 1 for dated events
}
```

### Response
- 200 - 'Event deleted'
- 400 - 'Missing required fields or invalid input'
- 404 - 'User or event not found'
- 500 - 'Error deleting event'

---

## POST for `/moveEvent`
```json
{
  "_id": "{user_id}",
  "_eventId": "{event_id}",
  "start": "2023-10-01T00:00:00Z",
  "duration": 30
}
```

### Response
- 200 - 'Event moved'
- 400 - 'Missing required fields or invalid input'
- 404 - 'User or event not found'
- 500 - 'Error moving event'