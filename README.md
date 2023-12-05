# Football Manager - Built by [Shivam Bhatnagar](https://www.bitnagar.dev)

[Football Manager](https://football-manager-ruby.vercel.app/) is a fully functional Web App that allows you to manage the data of a football team, created for **Beam Dynamics**'s Frontend Engineer hiring challenge 2023.

**Live Demo**: https://football-manager-ruby.vercel.app/

> **Note**: Use the exact files given in clickup document. An error will be thrown if the fields are different. Make sure to use the same files given in [clickup document](https://doc.clickup.com/31162583/d/h/xq06q-7851/f8266dc69a1571b/xq06q-7071).

## All requirements have been met

This project fulfils every feature request that was given in the [clickup document](https://doc.clickup.com/31162583/d/h/xq06q-7851/f8266dc69a1571b/xq06q-7071)/specification sheet.

Features built (including all sub requirements)

- Roster Details ✅
  - Editable Team name ✅
  - Search field. ✅
  - Roster importer. ✅
  - Roster Table. ✅
- Formation Overview ✅
  - Formation preview in `4-3-3` Formation. ✅
  - Not enough / too many starters formation screen. ✅
  - Player Details. ✅

## The UI is responsive

The UI is responsive. At-least `1200px` width is necessary for viewing the project. The project is best viewed on `1500px` width but is adaptable to a minimum of `1200px` width.

## Project Overview

The project is built using **Next.js + Typescript**. State management has been achieved with **Redux Toolkit**. All the UI designs are near to pixel perfect and matches with the Figma designs provided for the challenge.

The project is responsive and require a minimum width of `1200px` to view without breaking the layout.

The **Formation Page** is a fully **custom built** page. There is a separate route for accessing it. No custom libraries or components were used to make it.

The project is deployed on **Vercel**.

The reason for using Next.js was to take advantage of their optimised platform and to ease the routing process. Typescript allowed to have type safety. Redux toolkit makes it easy to manage state by creating a global store for storing state and accessing it anywhere in the app.

## State Structure

The state has been structured in the following fashion:

```javascript

// state for metadata - total
metadata: {
    goalkeepers: 0,
    defenders: 0,
    midfielders: 0,
    forwards: 0,
    starters: 0,
    total: 0
},
// state required for roster table and formation
rosterData: {
    team: 'My Team', // team name. Defaults to "My Team"
    players: [], // contains players data parsed from csv file
    fields: [], // contains column names/fields present in csv file.
    starters: [] // contains the data of the starter players.
}
```

## Project Structure

```bash
my-app
├── public
│   └── assets
│       └── (icons, svgs)
└── src
    ├── app
    │   ├── formation
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components
    │   ├── formation
    │   ├── modal
    │   └── {...}
    ├── lib
    │   ├── nationalities.json
    │   └── utils.ts
    ├── store
    │   ├── store.ts
    │   └── {...slices(.ts)}
    └── types
        └── shared.types.ts
```

## Tech Stack

### Next.js, Typescript, React, Redux/Redux Toolkit, TailwindCSS.

## Run Locally

Clone the project

```bash
  git clone https://github.com/Bitnagar/football-manager.git
```

Go to the project directory

```bash
  cd football-manager
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Demo

Live Demo: https://football-manager-ruby.vercel.app/

## 🚀 About Me

I'm a frontend Engineer and an open source contributor based out of Noida, India. I love creating fully functional web apps.

I am skilled in Next.js, React, JavaScript, MongoDB, tailwind + several other developer tools.

Visit my **portfolio**: [Bitnagar](https://www.bitnagar.dev)

**Linkedin**: [Shivam Bhatnagar](https://www.linkedin.com/in/shivambhatnagar01/)
