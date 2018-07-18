<p align="center">
 <img src="https://i.imgur.com/frOxtcq.png" alt="Calepin" />
</p>

Calepin is a small self-hostable note-taking web app.

It is based on two packages:

 - The API, [calepin-api](https://github.com/orditeck/calepin-api). RESTful PHP API using Laravel 5.6.
 - The web app, [calepin-frontend](https://github.com/orditeck/calepin-frontend). Using React.

__Calepin is currently in active development, anything could break at any moment. You may try our services but do not store anything important as your account and all its data could be deleted at any moment.__

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

## Contribute to it

 1. `git clone git@github.com:orditeck/calepin-frontend.git`
 2. `npm install`
 3. `npm run start`

## To-do

- [ ] Public notes
- [ ] Notes versionning/history
- [ ] Mobile friendly
- [ ] Mobile app
- [ ] A website
- [ ] UI refactor
