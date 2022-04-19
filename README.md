
# Het Blog / The Blog
### PLEASE NOTE: The development of this project has been paused until further notice.
A simple and intuitive website where every registered user can post anything on their mind. Built with the MERN stack.

## Demo

Live demo at http://het-blog.ofekasido.xyz/

Click here for a short video https://youtu.be/8urJIWFl-gw

## Roadmap

- [x] Add logout route
- [x] Connect everything to MongoDB instead of json-server
- [x] Reverse blogs so that new posts would be at the top
- [x] Add server side checks to see if a user tries to delete other users' posts, make sure deletion only works on his posts
- [x] Add profile pictures
- [x] Beautify home page
- [x] Add sorting feature
- [x] Beautify post creation page
- [x] Beautify post itself page
- [x] Make pinned messages go on top
- [x] Add profile page
- [x] Style Profile Page & Add User properties
- [x] Fix avatars so that they will show the correct ones for users / ON HOLD => API for pictures
- [x] Learn & Use React Context https://reactjs.org/docs/context.html#dynamic-context
- [x] Change from POST to GET
- [x] Add user settings page
- [x] Posts by user (in profile)
- [x] Basic mobile compatability
- [ ] Upload button beautify + show errors & upload status
- [ ] Likes feature
- [ ] Add admin page where you can pin posts & manage users (maybe add canPost in user model)
- [ ] Add markdown support for adding blogs, pictures in blog
- [ ] Add commenting system
- [ ] Add edit functionality
- [ ] Pages functionality

Minor
- [ ] Go through errors/unused variables
- [ ] Value=value
- [X] Navbar hide create post button when on create post page, show Create Post as text
- [ ] Rearrange every component into subfolders
- [ ] Add minimum user/password length
- [ ] Ternary operator if DB is off
- [ ] Convert to axios instead of fetch?

## API Reference

Default server port: `3080`


### Blog posts related
#### Get all blog posts

```http
  GET /api/blogs
```

#### Get specific user's blog posts

```http
  GET /api/user-posts/:id
```

#### Blog schema response:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `_id` | `string` | Blog ID |
| `title` | `string` | Blog title |
| `description` | `string` | Blog desc. |
| `body` | `string` | Blog body |
| `author` | `string` | User name of author |
| `authorID` | `string` | User ID of author |
| `email` | `string` | Email address of author |
| `date` | `string` | Post date and time |
| `pinned` | `boolean` | Whether the post is pinned or not |




#### Get user session

```http
  GET /api/session
```
#### User schema response:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `isAuthenticated`      | `boolean` | **Always available**, if `false` - no user is logged |
| `username`      | `string` | User name |
| `userID`      | `string` | User ID |
| `email`      | `string` | Email address |
| `profilePicture`      | `string` | Profile picture location |

If the user is not logged in, only `isAuthenticated` would show.



## Screenshots

![App Screenshot](https://i.imgur.com/dbTiaPx.png)
![App Screenshot](https://i.imgur.com/Qo1Coaf.png)
![App Screenshot](https://i.imgur.com/BpeyYs2.png)
![App Screenshot](https://i.imgur.com/fdjAAjX.png)
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@oasido](https://www.github.com/oasido)

