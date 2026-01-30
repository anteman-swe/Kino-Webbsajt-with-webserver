# Kino webbserver API Documentation
Complete Documentation for the Kino webbserver API

## Version: 1.0.0

**Contact information:**  
Anders Eriksson  
anteman.swe@gmail.com  

**License:** [MIT](https://opensource.org/licenses/MIT)

### Available authorizations
#### bearerAuth (HTTP, bearer)
Bearer format: JWT

---
## default

### [GET] /movies
**Retrieve all movies**

Returns all movies

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | List of movies | **application/json**: { **"data"**: [ [Movie](#movie) ], **"meta"**: { **"page"**: integer, **"pageSize"**: integer, <br>**Default:** 5, **"total"**: number } }<br> |
| 400 | Bad request | **application/json**: [Error](#error)<br> |
| 404 | Resource not found | **application/json**: [Error](#error)<br> |
| 500 | Internal server error | **application/json**: [Error](#error)<br> |

### [GET] /movies/{id}
**Retrieve a specific movie**

Returns one movie

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | One movie | **application/json**: [Movie](#movie)<br> |
| 400 | Bad request | **application/json**: [Error](#error)<br> |
| 404 | Resource not found | **application/json**: [Error](#error)<br> |
| 500 | Internal server error | **application/json**: [Error](#error)<br> |

### [GET] /movies/popular
**Retrieve a list of the most popular movies**

Returns a list of the most popular movies with highest ratings within 30 days

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | List of popular movies | **application/json**: { **"data"**: [ [Movie](#movie) ], **"total"**: number }<br> |

---
## default

### [GET] /movies/{id}/reviews
**Retrieve all reviews for one movie**

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | List of reviews | **application/json**: { **"data"**: [ [Review](#review) ], **"meta"**: { **"page"**: integer, **"pageSize"**: integer, <br>**Default:** 5, **"total"**: number } }<br> |
| 400 | Bad request | **application/json**: [Error](#error)<br> |
| 404 | Resource not found | **application/json**: [Error](#error)<br> |
| 500 | Internal server error | **application/json**: [Error](#error)<br> |

### [POST] /movies/{id}/reviews
**Post a new review of current movie**

#### Request Body

| Required | Schema |
| -------- | ------ |
|  Yes | **application/json**: [ReviewPost](#reviewpost)<br> |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Review added successfully | **application/json**: [Review](#review)<br> |
| 400 | Bad request | **application/json**: [Error](#error)<br> |
| 404 | Resource not found | **application/json**: [Error](#error)<br> |
| 500 | Internal server error | **application/json**: [Error](#error)<br> |

---
## default

### [GET] /movies/{id}/screenings
**Retrieve all screening times for one movie**

Returns all screening times for one movie

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | List of screening times | **application/json**: { **"data"**: [ [Screening](#screening) ], **"total"**: number }<br> |

---
### Schemas

#### Movie

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | movie ID number from database API<br>*Example:* `1` | No |
| title | string | Movie title<br>*Example:* `"The Matrix"` | No |
| poster | { **"url"**: string } | An object containing the url to a movie poster image | No |
| intro | string | An short introduction to the movie plot<br>*Example:* `"Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring."` | No |

#### Review

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | number | Review ID number from database API<br>*Example:* `1621` | No |
| comment | string | Review written by user<br>*Example:* `"Best movie ever!"` | No |
| rating | number | Rating given by user, 0-5<br>*Example:* `4` | No |
| author | string | Name choosen by user<br>*Example:* `"King Louie"` | No |
| verified | boolean | Is the review verified by system checks<br>*Example:* `true` | No |
| createdAt | string | When was the review created<br>*Example:* `"2026-01-27T16:16:45.565Z"` | No |
| updatedAt | string | When was the review last updated<br>*Example:* `"2026-01-27T16:16:45.565Z"` | No |

#### ReviewPost

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| comment | string | Users comment about a movie<br>*Example:* `"Interesting plot-twists!"` | No |
| rating | integer | Users rating of movie, 0-5<br>*Example:* `3` | No |
| author | string | Users alias name<br>*Example:* `"Kaiser Bose"` | No |
| movie | string | Movie identifier, ID number<br>*Example:* `12` | No |

#### Screening

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer | ID number of one particular screening announcement<br>*Example:* `1231` | No |
| room | string | Which room is the screening in<br>*Example:* `"Large cinema"` | No |
| start_time | string | Date and time of screening<br>*Example:* `"2026-01-31T17:30:00Z"` | No |
| createdAt | string | Date and time of this posts creation<br>*Example:* `"2026-01-28T16:55:30Z"` | No |
| updatedAt | string | Date and time of this posts last update<br>*Example:* `"2026-01-28T16:55:30Z"` | No |

#### Error

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| name | string | Type of Error<br>*Example:* `"NotFoundError"` | No |
| message | string | Error message<br>*Example:* `"Movie was not found"` | No |
| status | number | HTTP Response status code<br>*Example:* `404` | No |
