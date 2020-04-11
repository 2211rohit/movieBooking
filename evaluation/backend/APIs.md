### APIs for Unlu Admin Dashboard

Login for Manager and Admins
```
/login [POST]
{
    "email" : "abc@xyz.com",
    "password" : "password"
}
```

All Managers
```
/allusers [GET]
{
  "users": [
    {
      "admin": 1,
      "email": "rohit@gmail.com",
      "name": "Rohit Goyal",
      "password": "rohit",
      "user_id": 1
    },
    {
      "admin": 0,
      "email": "mohit@gmail.com",
      "name": "Mohit Goyal",
      "password": "mohit",
      "user_id": 2
    }
  ]
}
```

Particular User
```
/allusers/1 [GET]
"user": [
    {
      "admin": 1,
      "email": "rohit@gmail.com",
      "name": "Rohit Goyal",
      "password": "rohit",
      "user_id": 1
    }
  ]
}
```

Add an Editor
```
/addEditor [POST]
{
    "email": "mohit@gmail.com",
    "name": "Mohit Goyal",
    "password": "mohit",
}
```
Edit an Editor
```
/editEditor/1 [POST]
{
    "user_id" : 1
    "email": "mohit@gmail.com",
    "name": "Mohit Goyal",
    "password": "mohit",
    "admin" : 0
}
```


Change an Editor to Admin
```
/addAdmin [PATCH]
{
    "user_id" : 2,
    "admin": 1
}
```

Celebrity Table
```
/allCelebs [GET]
{
  "data": [
    {
      "celeb_id": 1,
      "celeb_name": "Amitabh",
      "contact_details": "9876543210",
      "fulfilled": 3,
      "payment_pending": 10000,
      "request": 5,
      "total_videos": 3
    },
    {
      "celeb_id": 2,
      "celeb_name": "Alia",
      "contact_details": "9876543211",
      "fulfilled": 7,
      "payment_pending": 20000,
      "request": 12,
      "total_videos": 7
    },
    {
      "celeb_id": 3,
      "celeb_name": "Shradha",
      "contact_details": "9876543212",
      "fulfilled": 12,
      "payment_pending": 9000,
      "request": 15,
      "total_videos": 12
    }
  ],
  "total_celebs": 3
}
Also need the sorted data as per [ Max number of requests received ], [ Least number of requests received ]
```

Particular Celebrity
```
/allCeleb/1 [GET]
{
  "data": [
    {
      "celeb_id": 1,
      "celeb_name": "Amitabh",
      "contact_details": "9876543210",
      "fulfilled": 3,
      "payment_pending": 10000,
      "request": 5,
      "total_videos": 3
    }
  ]
}
```

Create celebrity profile
```
/createCeleb [POST]
{
    "celeb_name": "Amitabh",
    "contact_details": "9876543210",
    "password" : "password"
}
```

Edit celebrity profile
```
/editCeleb/1 [PATCH]
{
    "celeb_id" : 1
    "celeb_name": "Amitabh",
    "contact_details": "9876543210",
    "passwprd" : "password"
}
```

All Tasks
```
/allTasks [GET]
{
  "data": [
    {
      "amount": 5000,
      "celeb_id": 1,
      "completed": "NO",
      "content": "Birthday",
      "date": "01 Jan 2020",
      "days_left": 7,
      "task_id": 1,
      "user_id": 1
    },
    {
      "amount": 5000,
      "celeb_id": 2,
      "completed": "NO",
      "content": "Birthday",
      "date": "02 Jan 2020",
      "days_left": 6,
      "task_id": 2,
      "user_id": 5
    },
    {
      "amount": 7000,
      "celeb_id": 3,
      "completed": "NO",
      "content": "Anniversary",
      "date": "03 Jan 2020",
      "days_left": 5,
      "task_id": 3,
      "user_id": 20
    }
  ]
}
Also need the sorted data as per [ The least remaining response time ] [ Celeb with Request received but not fulfilled: Show number of days left for that request ]
```

Payment Status
```
/payment/1 [POST]
{
  "data": [
    {
      "amount": 5000,
      "celeb_id": 1,
      "paid": "NO",
      "payment_id": 1,
      "time": "01 Jan 2020"
    }
  ]
}

```

All Videos
```
/allVideos [Get]
{
  "videos": [
    {
      "celeb_id": 1,
      "task_id": 1,
      "time": "01 Jan 2020",
      "video_id": 1,
      "video_url": "www.abc.com/xyz"
    },
    {
      "celeb_id": 2,
      "task_id": 2,
      "time": "02 Jan 2020",
      "video_id": 2,
      "video_url": "www.abcd.com/uxyz"
    }
  ]
}
```

