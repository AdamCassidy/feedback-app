<img src="https://user-images.githubusercontent.com/43080428/94694595-0181c880-0303-11eb-8f4b-ba93ecbeca20.png" alt="logo" width="
300" />

A responsive social media forum that's focused on discussion of constructive feedback. It was made with Vue.js and Firebase. It uses Vuex to manage state and makes RESTful API calls to Firebase's realtime database where it holds user's content. It uses Firebase's authentication service and funnels alert messages from them. The app also uses custom form validation of its own to get the full authentication flow. Users can upload avatars, or images to their posts, and they are kept in Firebase storage.

The site is secure through SSL. Performance is optimized with asynchronous components. SEO is optimized with meta tags. Also, all posts throughout time can be viewed because of an infinite scroll implementation. They can also comment and reply to each other in realtime on their posts and delete or edit all of their content. Users can also tag a topic to their post if they please or view posts on a specific topic. JS cookie and vuex are used to persist state, and Sass is used for the styling.
 
# Demo
<a href="https://secondopinionforum.com/about">secondopinionforum.com/about</a>
</br>
</br>

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
