# Het Blog / The Blog

To be edited

## API Reference

Default API port: `3080`

#### Get all blogs

```http
  GET /api/blogs
```

| Parameter     | Type      | Description                       |
| :------------ | :-------- | :-------------------------------- |
| `_id`         | `string`  | Blog ID                           |
| `title`       | `string`  | Blog title                        |
| `description` | `string`  | Blog desc.                        |
| `body`        | `string`  | Blog body                         |
| `author`      | `string`  | User name of author               |
| `authorID`    | `string`  | User ID of author                 |
| `email`       | `string`  | Email address of author           |
| `date`        | `string`  | Post date and time                |
| `pinned`      | `boolean` | Whether the post is pinned or not |

#### Get user session

```http
  GET /api/session
```

| Parameter         | Type      | Description                                          |
| :---------------- | :-------- | :--------------------------------------------------- |
| `isAuthenticated` | `boolean` | **Always available**, if `false` - no user is logged |
| `username`        | `string`  | User name                                            |
| `userID`          | `string`  | User ID                                              |
| `email`           | `string`  | Email address                                        |
| `profilePicture`  | `string`  | Profile picture URL                                  |

If the user is not logged in, only `isAuthenticated` would show.

#### add(num1, num2)

Takes two numbers and returns the sum.
