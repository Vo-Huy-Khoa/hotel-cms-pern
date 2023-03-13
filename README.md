![Typescript](https://img.shields.io/badge/-TypeScript-007acc?logo=typescript&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-339933.svg?style=for-the-badge&logo=Node%2Ejs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

<h1>CMS MERN</h1>
CMS Application built using Typescript, React, Express.

## Index

- [Demo](#demo)
- [Features](#features)
- [Special Thanks](#special)
- [Installation](#installation)
- [Structure](#structure)

## Demo

<h3 name="demo">Live <a href="https://blog-vo-huy-khoa.vercel.app/">CMS</a></h3>
<!-- https://ezgif.com/ -->
<br>
<img src="https://s3.amazonaws.com/creativetim_bucket/products/488/original/material-tailwind-react-dashboard.jpg" alt="cms" />
<br>

## Features<a name="features"></a>

- Use Express to build the backend.
- Use React to build the frontend.


## Special thanks<a name="special"></a>

During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [Material Tailwind](https://material-tailwind.com/) - Material Tailwind is an easy to use components library for Tailwind CSS and Material Design.
- [Hero Icons](https://heroicons.com/) - Beautiful hand-crafted SVG icons.
- [Apex Charts](https://apexcharts.com/) - Modern & Interactive open-source Charts.

## Installation<a name="installation"></a>

### Running Locally

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone repository:

   ```
   $ git clone https://github.com/Vo-Huy-Khoa/Blog_MERN.git
   $ cd Blog_MERN
   ```

   Run Backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Run Frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```




## Structure of the project: <a name='structure'></a>

### BackEnd

```text
src
|
├── configs
|   └── db.ts
├── controllers
|   └── UserController.ts
│   └── MessageController.ts
├── middleware
|   └── auth.ts
│   └── token.ts
├── models
|   └── User.ts
|   └──Message.ts
├── routes
|   └── index.ts
└── server.ts
```

### FrontEnd

```text
src
├── assets
|   └── icons
│   └── scss
├── components
│   └── Account.tsx
│   └── Image.tsx
│   └── index.ts
├── hooks
│   └── useDebounce
│   └── index
├── layouts
│   └── auth.tsx
│   └── dashboard.tsx
│   └── index.ts
├── pages
│   └── auth
│       └── sign-in.tsx
│       └── sign-up.tsx
│       └── index.ts
│   └── dashboard
│       └── home.tsx
│       └── notification.tsx
│       └── sidebar.tsx
│       └── index.ts
├── route.tsx
├── App.tsx
└── index.tsx

```

<!-- Folder structure is based on productivity and some personal preferences:

src
├── App.css                 * Main app styles.
├── App.tsx                 * Main app component.
├── api                     * Abstractions for making API requests
├── assets                  * Assets that are imported into your components(images, custom svg, etc).
│   └── ...
├── components              * Components of the projects that are not the main views.
│   └── ui                  * Generic and reusable across the whole app. Presentational components eg. Buttons, Inputs, Checkboxes.
│   └── layout              * Unique and one time use components that will help with app structure.
│   └── <domain component>  * Belong to a specific domain. Reusable in different pages.
│   └── ...
├── plugins                 * Init and config plugins(moment, material-ui, adal, etc).
│   └── ...
├── index.tsx               * Entry point of the application.
├── services                * All the common services. e.g. Authentication, hubs, etc.
├── store                   * The Redux action types in action-type.ts, reducers, selectors and main store in the sub-folders.
│   ├── index.ts
│   └── middlewares         * Store middlewares.
│   └── sagas               * Saga files in case of redux-saga.
│   └── modules             * Store modules/ducks structure.
│       └── smallModule.ts  * Small modules can contain actions, action types, reducers and selectors in the same file.
│       └── bigModule       * Big modules should be composed by separated files for actions, action types, reducer and selectors.
│           └── index.ts
│           └── actions.ts
│           └── ...
├── styles/theme            * All common styles (css) or theme (sass, styled-components).
├── utils                   * Functions (for tests, for regex value testing, constants or filters.)
│   └── ...
├── pages                   * Routed components that represents pages(Presentational Components Only).
│   └── ...
└── .vscode                 * VS Code workspace settings to work with ESLint rules and formatting
                              (you can also lint or fix on save 😉). -->
