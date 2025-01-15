# Example POST & GET Body for Express.js

Whenever 
- `_id` id of User
- `type == 0` for list of events.
- `type == 1` for list of dated_events.
- `_eventId` id of either event ot dated_event (depends of type mentioned before)

## GET for `/getEvents`

### URL:
```
/getEvents?_id={user_id}&type={0|1}
```

### Response for `type == 0`:
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

### Response for `type == 1`:
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
      // Event dates here
    },
    // ... other dated events
  ]
}
```

## GET for `/getEventsByDate`

### URL:
```
/getEventsByDate?_id={user_id}&from={date_from}&to={date_to}
```

### Response:
```json
[
  {
    "_id": {
      "$oid": "605c72e3a6401f001f02d0fb"
    },
    "name": "Dated Event 2",
    "desc": "Description for Dated Event 2",
    "color": "Green",
    "dates": [
      {
        "_id": {
          "$oid": "605c72e3a6401f001f02d0fc"
        },
        "start": {
          "$date": "2023-10-10T00:00:00Z"
        },
        "duration": 75
      }
      // ... other dates within range
    ]
  }
  // ... other events
]
```

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

## POST for `/deleteEvent`
```json
{
  "_id": "{user_id}",
  "_eventId": "{event_id}",
  "type": 0 // 0 for regular events, 1 for dated events
}
```

## POST for `/moveEvent`
```json
{
  "_id": "{user_id}",
  "_eventId": "{event_id}",
  "start": "2023-10-01T00:00:00Z",
  "duration": 30
}
```


