
# tut-jobopas REST API
Documentation for tut-jobopas API. Demo is found at http://tut-jobopas.herokuapp.com.

### `/api/tag` - Tags for courses

#### `GET /api/tag`
List all tags.
##### Example
```HTTP
GET /api/tag HTTP/1.1
Host: tut-jobopas.herokuapp.com
```
```HTTP
HTTP/1.1 200 OK

[
  {
    "name": "node.js",
    "id": 17,
    "createdAt": "2016-04-10T20:55:37.000Z",
    "updatedAt": "2016-04-10T20:55:37.000Z"
  },
  {
    "name": "c++",
    "id": 18,
    "createdAt": "2016-04-13T05:10:25.000Z",
    "updatedAt": "2016-04-13T05:10:25.000Z"
  },
  {
    "name": "sisällönhallinta",
    "id": 19,
    "createdAt": "2016-04-13T16:20:19.000Z",
    "updatedAt": "2016-04-13T16:20:19.000Z"
  }
]
```
#### `POST /api/tag`
Create a new tag.
##### Example
```HTTP
POST /api/tag HTTP/1.1
Host: tut-jobopas.herokuapp.com
Authorization: Bearer YOUR_TOKEN_HERE

{
    "name": "Ember.js"
}
```
```HTTP
HTTP/1.1 201 Created

{
  "name": "Ember.js",
  "id": 25,
  "createdAt": "2016-05-05T09:00:52.000Z",
  "updatedAt": "2016-05-05T09:00:52.000Z"
}
```


#### `GET /api/tag/:id`
Get single tag.
##### Example
```HTTP
GET /api/tag/25 HTTP/1.1
Host: tut-jobopas.herokuapp.com
```
```HTTP
HTTP/1.1 200 OK

{
  "name": "Ember.js",
  "id": 25,
  "createdAt": "2016-05-05T09:00:52.000Z",
  "updatedAt": "2016-05-05T09:00:52.000Z"
}
```

#### `PUT /api/tag/:id`
Update tag's details.
##### Example
```HTTP
PUT /api/tag/25 HTTP/1.1
Host: tut-jobopas.herokuapp.com
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "Angular.js"
}
```
```HTTP
HTTP/1.1 200 OK

{
  "name": "Angular.js",
  "id": 25,
  "createdAt": "2016-05-05T09:00:52.000Z",
  "updatedAt": "2016-05-05T09:10:24.000Z"
}
```

#### `DELETE /api/tag/:id`
Delete a tag.
##### Example
```HTTP
DELETE /api/tag/25 HTTP/1.1
Host: tut-jobopas.herokuapp.com
Authorization: Bearer YOUR_TOKEN_HERE

```
```HTTP
HTTP/1.1 200 OK

{
  "name": "Angular.js",
  "id": 25,
  "createdAt": "2016-05-05T09:00:52.000Z",
  "updatedAt": "2016-05-05T09:10:24.000Z"
}
```
