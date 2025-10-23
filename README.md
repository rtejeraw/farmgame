# Farm game - CTD React course Final Project

## Overview

This project is a TODO list as part of a weekly work assignment of the Code The Dream course.

## Features

-   Home Page: A welcome message introducing the project and its main features. Also host the "Inventory" functionality which shows the products and the possibility to consume the crops for energy.
-   Land Page: Seeds can be planted in the plots of land for harvest. The crops can be harvested for consumption in the "Inventory" or sale in "Market".
-   Market Page: From the marketplace, you can buy and sell the seeds you need for farming. You can also sell the produce for a profit.
-   About Page: Shows basic information about the project and its author.

## Project Structure

-   `index.html`: Main HTML file for the site.
-   `index.css`: Custom styles for layout and colors.
-   `app.jsx`: Core logic for navigation and content loading.
-   `app.module.css`: Custom styles for layout, typography, and visual effects.
-   `index.css`: Custom styles for layout and colors.
-   `main.jsx`: Main layout.
-   `assets`: Folder containing the png resourses.
-   `features`: Folder containing the simple components used in pages.
-   `--CardItem.jsx`: Component used to present a single unit.
-   `--CardList.jsx`: Component used to present a list of units.
-   `--Crop.jsx`: Component used to present data of the crop and "Harvest" action.
-   `--Plot.jsx`: Component used to present a unit planted in the land.
-   `pages`: Folder containing the pages.
-   `--About.jsx`: Shows basic information about the project and its author.
-   `--Home.jsx`: Shows welcome message and Inventory functionality.
-   `--Home.module.css`: CSS styles for the Home Page.
-   `--Land.jsx`: Shows the plots of the land and the functionalities of "Plant" and "Harvest" a crop.
-   `--Land.module.css`: CSS styles for the Land Page.
-   `--Market.jsx`: Shows the funcionalities of "Buy seeds" and "Sell seed or crops".
-   `--Market.module.css`: CSS styles for the Market Page.
-   `--NotFound.jsx`: Shows wellcome message and Inventory functionality.
-   `reducers/States.reducer.js`: File containing the "states", "actions" and "reducer" function.
-   `shared`: Folder containing the shared components
-   `--Header.jsx`: Shows the app title and navigation bar. It is displayed throughout the entire app.
-   `--Header.module.css`: CSS styles for the Header component.
-   `--StatBar.jsx`: Shows the "Energy" and "Currency" data. It is displayed throughout the entire app.
-   `.env.local`: Environment variables used for connecting to the database.

## How to Run

1. **Clone the Repository**:
    - Use `git clone https://github.com/rtejeraw/farmgame.git` in your terminal, or download the ZIP from GitHub.
2. **Open the Project**:
    - Navigate to the project folder and open `index.html` in a web browser.

## Airtable database layout

### Table: Base (Stores general system data. Normally, this data would be specific to each user, but that feature wasn't included in this demo.)

    -Fields:
        -Energy (Number): Stores the amount of energy available. Energy is used to plant seeds and harvest crops; it can be obtained by consuming crops from your inventory.
        -Currency (Number): Stores the available amount of currency. Currency is used to buy seeds at the market and can be obtained by selling seeds or crops there.
        -TimeStamp (Date & Time): Stores the exact time at which any of the previous values ​​(Energy and Currency) were updated.

    *Clarification*: The intention was for energy to gradually recover over time, and "TimeStamp" would allow for calculating how much time had passed and therefore how much energy should exist at the time of the calculation. This feature was ultimately discarded.

### Table: UnitType (Stores the list of all possible units (seeds, crops and products) and their relevant data.)

    -Fields:
        -Id (Autonumber): Unit identifier and allows you to identify it in its relationship with other tables.
        -Name (Text): Unit name.
        -Description (Text): Description of the unit and its use.
        -EnergyCost (Number): Cost in "Energy" of the unit for its "plant" or "harvest" in a plot of land.
        -CurrencyCost (Number): Cost in "currency" of the unit for purchase or sale in the market.
        -Time (Duration): The length of time that must be waited before the crop can be harvest.

    *Clarification*: The intention was that after planting the seed, the crop would have to wait this "Time" before being able to harvest. This "Time" would be calculated using the current date and the time at which it was planted. This feature was ultimately discarded.

### Table: Plots (Stores the list of land plots where seeds can be planted)

    -Fields:
        -Id (Autonumber): Plot identifier.
        -UnitTypeId (Number): Identifier of the unit that is currently planted in that plot.
        -TimeStamp (Date & Time): Exact time of planting of the unit.

    *Clarification*: The intention was that after the seed was planted, the user would have to wait this "Time" before being able to harvest the crop. This would be calculated using the unit's "Time", the current date, and this "TimeStamp." This feature was ultimately discarded.

### Table: Inventory (Stores the units that are in the user's possession at the moment)

    -Fields:
        -UnitTypeId (Number): Unit identifier.
        -Quantity (Number): Quantity of said unit.

## Author

-   Raul Tejera (GitHub: [rtejeraw](https://github.com/rtejeraw))
