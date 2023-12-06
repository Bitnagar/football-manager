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

The UI is responsive. At-least `1200px` width is necessary for viewing the project. The project is best viewed on `1500px` width but is adaptable to a minimum of `1200px` width. `Shadcn UI` was used to built the project, except for the `Formation` page which is fully custom built.

## Project Overview

The project is built using **Next.js + Typescript**. State management has been achieved with **Redux Toolkit**. All the UI designs are near to pixel perfect and matches with the Figma designs provided for the challenge.

The project is responsive and require a minimum width of `1200px` to view without breaking the layout.

The **Formation Page** is a fully **custom built** page. There is a separate route for accessing it. No custom libraries or components were used to make it.

The project is deployed on **Vercel**.

The reason for using Next.js was to take advantage of their optimised platform and to ease the routing process. Typescript allowed to have type safety. Redux toolkit makes it easy to manage state by creating a global store for storing state and accessing it anywhere in the app.

## How the project works

### Importing

When used imports the data, it is being parsed with the `Papaparse` library. After parsing it and extracting all the columns and their values the `Papaparse` library returns us the data in the following format:

```javascript
type RawCsvData = {
  data: Array<PlayerStats>, // contains all the players data
  errors: any[], // contains errors if any
  meta: {}, // contains meta information such as field names.
};
```

When the parsing complete, we iterate through the `data` array of players and do the following:

- Check the array for any missing values. If missing values are found, error is thrown.
- Lowercase every `key` of the `playerStats` object.
- Add a unique key in each of the `playerStats` object, so that it is easier to update/delete the player afterwards. Refer to `src/components/modal/ImportTeamModal.tsx`

### Displaying

After the above said operations are complete, we add the data into the global state. On the roster table page, we iterate through the data that we stored in state and display the fields and its respective data. See `src/app/page.tsx`

### Editing

We also display an `Actions Menu` along with the data on the roster table. Actions menu contains two options, `Edit player` , `Delete player`.

When user tries to edit the player, a modal opens. It contains every field that can be edited.

When user clicks the `Edit player` button inside the modal, we check for missing values/empty string, if all fields are filled, we edit the player by sending the `uniqueKey` along with all the fields to the reducer, else we don't and show a `toast` message. Refer to `src/components/modal/EditPlayerModal.tsx`

### Deleting

When user decides to delete a player, the selected players unique key is sent to the reducer. If the reducer found the same unique key inside the state, the it delete the entire player object associated with that key. Hence delete operation completes. Refer to `src/components/modal/DeletePlayerModal.tsx`

### Search

When the user hits `Enter` after typing a query or clicks on `Search` button displayed in the search bar, we execute the search. We filter the data based on the criteria that the query should be present in the `Position` or `Player Name` column of the roster table as a substring or full string. If the query matches with the values present in the roster table, we display all the matched results, otherwise nothing is shown.

### Team Name

`Team Name` is being stored in the state. When user types in a new name, the team name in the state is updated on every key down event.

### Formation Page

When we have all the required starter players for the `4-3-3` formation, that is:

```bash
Goalkeeper, of which one is required;
Defender, of which four are required;
Midfielder, of which three are required;
Forward, of which three are required;
```

we go ahead and create the formation over the field. If we don't have the starters players in above fashion, we display the respective error modals.

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
