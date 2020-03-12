<p align="center">
 <img src="https://i.imgur.com/frOxtcq.png" alt="Calepin" />
</p>

Calepin is a small open source self-hostable note-taking web app.

It is based on two packages:

 - The API, [calepin-api](https://github.com/orditeck/calepin-api). RESTful PHP API using Laravel 5.6.
 - The web app, [calepin-frontend](https://github.com/orditeck/calepin-frontend). Using React.

__Please note:__ A complete rewrite of Calepin, both frontend & backend, is planned in mid-2020. Star & Watch the repo to get updated on the progress!

## Use it

There are several ways you can use Calepin.

 1. Use [calepin.io](https://app.calepin.io/) services for free. You can encrypt your notes in AES-256 client-side, so the server will never know what's inside your notes.
 2. Use [calepin.io](https://app.calepin.io/) with [your self-hosted API](https://github.com/orditeck/calepin-api). You can set the API URL in the settings.
 3. Hosting everything, see below.

## Host it

Hosting the front-end is quite simple, it's only HTML/CSS/JS, so you can host it wherever you'd like.

 1. `git clone git@github.com:orditeck/calepin-frontend.git`
 2. `cd calepin-frontend`
 3. `npm install`
 4. `npm run build`
 5. Upload the content of the `build` folder to your web server

You can then either use the Calepin public API (at https://api.calepin.io/api/v1) or [install the API on your server](https://github.com/orditeck/calepin-api).

By default, when you open your self-hosted Calepin's frontend, it'll use the default API, `api.calepin.io`. You can change the API URL in the settings and it'll be remembered on your device as long as don't clear the app storage, but you'd have to do this on every devices you use and when sharing a note to someone that never set your API URL in the settings, it'd try to fetch the note from `api.calepin.io` (feature to be added later). And anyway, at this point, I expect you'll want to use your own API all the time. 

### Set your API as the default one

 1. Go to https://github.com/orditeck/calepin-frontend/blob/master/src/stores/Settings.js#L5
 2. Replace the URL with yours
 3. Build and enjoy!

## Contribute to it

 1. `git clone git@github.com:orditeck/calepin-frontend.git`
 2. `npm install`
 3. `npm run start`

## To-dos

Non-exhaustive and unordered
- [ ] Button to clear local/session storage after logout
- [ ] Tags/folders + folder sharing with navigation + search
- [ ] Some kind of pagination on notes listing
- [ ] Autosave
- [ ] Notes versionning/history
- [ ] Mobile friendly
- [ ] Mobile app
- [ ] A website
- [ ] UI refactor
- [ ] Export notes
- [ ] Import notes
- [ ] Handle custom server when sharing public note

## License

Copyright (C) 2018 Keven "orditeck" Lefebvre
