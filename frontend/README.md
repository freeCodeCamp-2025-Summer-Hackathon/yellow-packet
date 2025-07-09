# Preface

For each component and page design, ensure that the design has been reviewed and approved in FIGMA before proceeding to implement. 

#### Pick a component
If someone is working on a component, <strong>DO NOT TOUCH THAT COMPONENT WITHOUT ASKING FIRST!!!!</strong> This will be noted in the issues section of GitHub, where each component is a separate issue. I understand that not everyone can finish each component on their own, as they require a lot of cross communication, so we will work issue by issue, as the sprints will outline. 

#### Descriptions
Each Component has a small description of what it is and what it is for, but if you have questions, feel free to DM me on Discord @UhOhGio.

#### Assets
The assets folder will hold any images or logos (or sounds?) used in our app. 

#### Styling
As needed, you may add .css files in the frontend/src/styles folder, but try to keep .css files to one file per page at most, so that we do not crowd our frontend directory or add too much repetitive code.

#### FIGMA
Here is the link to our current Figma project:
- [PetMatch Figma](https://www.figma.com/files/team/1498099156884966604/project/374818830/PetMatch?fuid=1486104229419102860)


# Structure Overview

```
frontend
├── node_modules
├── public
│   └── pet-match.svg
├── src
│   ├── assets
│   │   ├── *.png
│   │   ├── *.svg
│   │   └── pet-match.svg 
│   ├── components
│   │   ├── BrowsePetsHeading.jsx
│   │   ├── BrowsePetsPreview.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── LandingPageHero.jsx
│   │   ├── Navbar.jsx
│   │   ├── PetCard.jsx
│   │   ├── PetFilter.jsx
│   │   └── PetGrid.jsx
│   ├── pages
│   │   ├── BrowsePets.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ManagePetsPage.jsx
│   │   ├── ShelterProfile.jsx
│   │   ├── UserProfile.jsx
│   │   └── PetProfile.jsx 
│   ├── styles
│   │   ├── *.css
│   │   └── LandingPage.css 
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└──vite.config.js
```
# Workflow Hierarchy

**Note:** The root of each tree and its subtree can not be complete until all its children are complete. (Pet Card Implementation can not be done until Pet Card Design is done, Pet Browsing Page can not be completed until Pet Filter Implementation and Pet Grid Implementation are both done, etc.)

Click a component to read it's description.

[App.jsx](#appjsx)  
├── [BrowsePets.jsx](#browsepetsjsx)  
│   ├── [PetGrid.jsx](#petgridjsx)  
│   │   └── [PetCard.jsx](#petcardjsx)  
│   └── [PetFilter.jsx](#petfilterjsx)  
├── [LandingPage.jsx](#landingpagejsx)  
│   ├── [BrowsePetsPreview.jsx](#browsepetspreviewjsx)  
│   │   └── [PetCard.jsx](#petcardjsx)  
│   └── [LandingPageHero.jsx](#landingpageherojsx)  
├── [LoginPage.jsx](#loginpagejsx)  
├── [RegisterPage.jsx](#registerpagejsx)  
├── [ManagePetsPage.jsx](#managepetspagejsx)  
├── [ShelterProfile.jsx](#shelterprofilejsx)  
├── [UserProfile.jsx](#userprofilejsx)  
├── [PetProfile.jsx](#petprofilejsx)  
├── [Header.jsx](#headerjsx)  
└── [Navbar.jsx](#navbarjsx)  


# Component Descriptions

### App.jsx
- App.jsx handles the routing logic, passing parameters from one page to another, ensuring the entire app is running cohesively (on the same page for lack of a better expression).

### BrowsePets.jsx
- A page consisting of the PetGrid and PetFilter that allows you to scroll through and view pets with and without filters.
- **Users** can view, filter, and favorite pets.

### PetCard.jsx
- Represents a single clickable pet card containing the name, age, and a picture of a given pet. Clicking on the pet card should take you to that pet's [PetProfile](#petprofilejsx)
  
### PetGrid.jsx
- This is a grouping of pet cards.
- You should USE the <PetCard /> component to build a resizable grid of pet cards.
- You should use the PetFilter function to determine which pets to show in the grid.

### PetFilter.jsx
- This component filters the pet cards that are being shown, but also has filters of its own to change which filters are being shown. For example: don't show the breeds filter unless type == 'dog'.

### LandingPage.jsx
- The first impression of our app. It should be the easiest to navigate and simple but inviting.

### BrowsePetsPreview.jsx
- A part of the Landing Page that will allow us to move to the [BrowsePets](#browsepetsjsx) page!
- This consists of 3 pet cards in a row, each showing a different pet, and a browse pets title that takes you to the BrowsePets page.
- Some card previews would be a very nice touch here, but if the code for that gets too messy, then maybe just add like fake pets here (I mean they are all fake pets but yk what i mean, not connected to backend).

### LandingPageHero.jsx
- The "Hero" of a web app usually refers to a large, prominent image or section at the top of a webpage, often used to immediately capture a visitor's attention and convey the website's core message or purpose. -> in the words of Google's AI.
- This will consist of a small image or two, where the images consist of some cute family and pet pics and an inspirational "Take home a furry new friend" quote, BUT it shouldn't be taken lightly since it is the first impression of our page.
- There is already a design for this on FIGMA!

### LoginPage.jsx
- This will assume the user/shelter has an account with a username and password and can log in.
- Allows the user to enter a username and password to log in to PetMatch with previously stored info.

### RegisterPage.jsx
- Allows the user to create an account with PetMatch if they do not yet have one.
- Shelters can not make accounts without contacting us.
- If not registered with Google Authentication API or other external API, registration will ask for a username, password, and confirm password at the bare minimum.

### ManagePetsPage.jsx
- This is a page viewable by shelter profiles that allows shelters to add and delete pets.
- Shelters may only delete pets that they themselves have added.
- Upon addition of a new pet, they should fill out the information that would be on a [PetProfile](#petprofilejsx).

### ShelterProfile.jsx
- This page will be rendered when a viewer, user, or shelter is viewing a shelter's profile. This will contain information regarding the shelter, including but not limited to: Name, time on that app, contact information, and a biography.
- We may also consider adding pets here, but that may be beyond the scope of our hackathon.

### UserProfile.jsx
- This page will be rendered when a user or shelter is viewing a user's profile. This will contain information regarding the user, including but not limited to: Name, age, gender, contact information, and a biography.

### PetProfile.jsx
- This page will be rendered when a user, visitor, or shelter is viewing a pet. This will contain information regarding the pet, including but not limited to: Name, age, sex, type, breed/species (if applicable), related shelter, and a biography.

### Header.jsx
- This is going to be rendered on all pages, keep it simple, functional.
- It should include a login/sign-out button and our PetMatch logo that takes us back to our Landing Page.
- When a user is logged in, their profile picture will show up next to the sign-out button. Otherwise, this button will be for logging in.

### Navbar.jsx
- The navigation bar gives a clear, consistent way for users to navigate between pages.
- Currently it should consist of: "Home", "About", "Browse Pets", "Shelters". If logged in, it should include "My Profile" and a "Manage Pets" if you are a shelter.