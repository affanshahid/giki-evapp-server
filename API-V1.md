# API Reference

## Index

* **[Modules](#modules)**
* **[Announcements](#announcements)**
* **[News](#news)**

## Modules
All requests must use multipart/form-data

### `GET /module`

#### Response
The response will be a JSON document.

* **On failure:** It will be empty.

* **On success:** It will have a `modules` property which will be an array of module objects with the following properties:

##### Module Object
name | description | Note
---- | ---- | ----
title | Name of the module | 5-60 characters
description | A short description | 5-200 characters
link  | A url for further information | Valid URL
category | A category name |
startTime | The starting date-time | Human-readable
endTime | The ending date-time | Human-readable
startEpoch | The starting epoch time in milliseconds | UNIX time-stamp
endTime | The ending epoch time in milliseconds | UNIX time-stamp
locTag | The venue for the module | See [Location Tags](#location-tags) below
fileUrl | A link to fetch the image | In production it will be a valid URL, however in development it will be a file ID that must be prepended with `/image/`
id | ID number |
createdAt | Date of record creation |
updatedAt | Date of record update |

###### Location Tags
The server uses tags to communicate actual venues, according to the following table

Venue | Tag
---- | ----
FES | FES
FCSE | FCSE
FME | FME
FMCE | FMCE
Brabers building | BRABERS
GIKafe | CAFE
GIKI Market | TUC
Sports ground | SPORTS_GROUND
Sports complex | SPORTS_COMPLEX
Admin block | ADMIN_BLOC
Hostel 8 | H8
Hostel 9 | H9
Hostel 10 | H10
Hostel 11 | H11
Library | LIB
Faculty club | FACULTY_CLUB
Guest house | GUEST_HOUSE
Girl's Hostel | GH

### `POST /module`

#### Request parameters

name | description | Note
---- | ---- | ----
title | Name of the module | 5-60 characters
description | A short description | 5-200 characters
link  | A url for further information | Valid URL<br/>*optional*
category | A category name |*optional*
startTime | The starting date-time | See [Dates](#dates) below
endTime | The ending date-time | See [Dates](#dates) below
locTag | The venue for the module | See [Location Tags](#location-tags) above
image | An image for the module |*optional*

##### Dates
Dates can either be in the form of a UNIX time-stamp in milliseconds or the following format:

`mm/dd/yyyy hh:mm (a/pm) timezone`

Examples:
* `26/02/1994 08:14 pm GMT+5`
* `26/02/1994 20:14 UTC`

#### Response
The response will be a JSON document.

* **On failure:** It will have the following properties:
     * `success` - Set to false
     * `error` - An object describing the error


* **On success:** It will have the following properties:
 * `success` - Set to true
 * `module` - A [module object](#module-object)

## Announcements
All requests must use multipart/form-data

### `GET /announcements`

#### Response
The response will be a JSON document.

* **On failure:** It will be empty.

* **On success:** It will have an `announcements` property which will be an array of announcement objects with the following properties:

##### Announcement Object
name | description | Note
---- | ---- | ----
title | Name of the announcement | 5-60 characters
description | A short description | 5-200 characters
id | ID number |
createdAt | Date of record creation |
updatedAt | Date of record update |

### `POST /announcement`

#### Request parameters

name | description | Note
---- | ---- | ----
title | Name of the announcement | 5-60 characters
description | A short description | 5-200 characters

#### Response
The response will be a JSON document.

* **On failure:** It will have the following properties:
     * `success` - Set to false
     * `error` - An object describing the error


* **On success:** It will have the following properties:
 * `success` - Set to true
 * `announcement` - An [announcement object](#announcement-object)

## News
All requests must use multipart/form-data

### `GET /news`

#### Response
The response will be a JSON document.

* **On failure:** It will be empty.

* **On success:** It will have a `newsList` property which will be an array of news objects with the following properties:

##### News Object
name | description | Note
---- | ---- | ----
title | Name of the news item | 5-60 characters
description | A short description | 5-200 characters
link  | A url for further information | Valid URL
category | A category name |
fileUrl | A link to fetch the image | In production it will be a valid URL, however in development it will be a file ID that must be prepended with `/image/`
id | ID number |
createdAt | Date of record creation |
updatedAt | Date of record update |

### `POST /news`

#### Request parameters

name | description | Note
---- | ---- | ----
title | Name of the news item | 5-60 characters
description | A short description | 5-200 characters
link  | A url for further information | Valid URL<br/>*optional*
image | An image for the news item |*optional*

#### Response
The response will be a JSON document.

* **On failure:** It will have the following properties:
    * `success` - Set to false
    * `error` - An object describing the error


* **On success:** It will have the following properties:
 * `success` - Set to true
 * `news` - A [news object](#news-object)
