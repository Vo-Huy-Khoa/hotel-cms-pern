![Typescript](https://img.shields.io/badge/-TypeScript-007acc?logo=typescript&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-339933.svg?style=for-the-badge&logo=Node%2Ejs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

# Hotel CMS PERN Stack

A CMS (Content Management System) application built using the PERN stack is a powerful and versatile solution for managing digital content. PERN is an acronym for PostgreSQL, Express.js, React.js, and Node.js, which are all open-source technologies that work seamlessly together to create web applications.

## Index

- [Demo](#demo)
- [Features](#features)
- [Special Thanks](#special)
- [Installation](#installation)
- [Structure](#structure)

## Demo

<h3 name="demo">Live: <a href="https://cms-vo-huy-khoa.vercel.app/">HOTEL CMS</a></h3>
<br>
<img src="https://s3.amazonaws.com/creativetim_bucket/products/488/original/material-tailwind-react-dashboard.jpg" alt="cms" />
<br>

## Features<a name="features"></a>

- Use Express to build the backend.
- Use React to build the frontend.
- Use PostgreSQL to build the database.

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
   $ git clone https://github.com/Vo-Huy-Khoa/hotel-cms-pern.git
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
|   └── index.ts
├── controllers
│       └── userController.ts
│       └── bookingController.ts
├── middleware
│       └── auth.ts
├── routes
│       └── user.ts
│       └── booking.ts
│       └── index.ts
├── test
│       └── userController.test.ts
│       └── authController.test.ts
└── server.ts
└── type.ts

```

### FrontEnd

```text
src
├── components
|   └── CustomButton.tsx
│   └── index.ts
├── configs
│   └── index.ts
├── hooks
│   └── useDebounce.ts
│   └── useReadLocalStorage.ts
│   └── index.ts
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
│       └── user
│           └── create.tsx
│           └── edit.tsx
│           └── list.tsx
│       └── home.tsx
│       └── index.ts
├── redux
│   └── actions
│       └── visibility.ts
│       └── index.ts
│   └── reducer
│       └── visibility.ts
│       └── rootReducer.ts
│   └── initState.ts
│   └── store.ts
├── App.tsx
├── main.tsx
└── routes.tsx

```
