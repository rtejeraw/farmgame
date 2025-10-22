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

## Author

-   Raul Tejera (GitHub: [rtejeraw](https://github.com/rtejeraw))
