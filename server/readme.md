# Example POST & GET body for ExpressJs 

## Example GET for /getEvents:

_id is UserID

type == 0 
returns a list of events

type == 1
returns a list of dated_events

```
http://localhost:3001/getEvents?_id=670f69032155ac0b081d125e&type=0
```

Response:

```json
{
  "events": [
    {
      "name": "Event1",
      "desc": "EventDesc",
      "color": "Red",
      "_id": "670f6c1fef382a3e70780dad"
    },
    {
      "name": "Event2",
      "desc": "EventDesc",
      "color": "Blue",
      "_id": "670f6c7d73eae9d6aa10dd97"
    }
  ]
}
```


## Example POST body /updateEvent:
```json
{
  "_id": "670f69032155ac0b081d125e",
  "_eventId": "670f6c1fef382a3e70780dad",
  "updatedEvent": {
    "name": "New event name",
    "desc": "NewDesc",
    "color": "Red"
  }
}
```

## Example POST body /deleteEvent:
```json
{
  "_id": "670f69032155ac0b081d125e",
  "_eventId": "670f6c1fef382a3e70780dad"
}
```