# Opportunities

## Contents

- Introduction
- Design Process
- Prototypes

## Introduction

In this repository seven prototypes for visualizing the opportunities can be explored. These dataviz tried to cover a wide range of layouts and D3.js elements, while keeping the core message the opportunities provide: a low number of clicks compared to the total number of queries for each term. All the dataviz are structured based on a very basic HTML file with the complementary CSS and JS files with the bits of D3.js. The dataviz are static without any update function. Within this week I tried to explore variety rather than interactivity. I have other dataviz examples with interactivity on the [Acidoscope](http://acidoscope.ipsl.fr/index.html) project or the [Topography of K-means](https://graphicprototype.net/topography/) dataviz. 

## Design Process

The design process followed a series of steps: 

- Proposal
- Concept
- Inspiration
- Development
- Prototypes

The path is described in a Figma diagram here: [Figma Layout](https://www.figma.com/file/7M2e54IB8ZEo4mFqgUJdXz/Opportunities?node-id=0%3A1 "DESIGN PROCESS"). From left to right, all the details about the different steps are described, from the abstract concept to precise prototypes and their evolution. 

## Prototypes

Seven prototypes were developed in this exercise. I have focused on architectures built from simple elements such as circles and polygons, some using volume, some individual units. 

### 01
### Stacked Dots

[Stacked Dots](https://graphicprototype.net/empathy/Stackeddots/) follows the intuitive principle of cumulative quantities piling up. Despite its classical representation in a straight vertical direction, I tilted the orientation to be able to pack as many as possible, expecting larger datasets. The total number of queries were displayed in gray in order to add another layer of perception and highlight what matters: the click count. 

### 02 Sky

[Sky](https://graphicprototype.net/empathy/Sky/) tries to highlight the constant proportion of clicks compared to the queries. The larger the number of queries, the larger the number of clicks. In this dataviz the density of 'stars', or clicks, can be intuitively explored for all the different terms. In all the scenarios the density of stars is similar. The color of the terms remains arbitrary without any related information. Color could be further used in case another layer of information is required. 

### 03 Planets

[Planets](https://graphicprototype.net/empathy/Planets/) compares the magnitude of queries and clicks in all terms by combining volume and number of individual elements. This dataviz helps to cluster the terms by volume of queries at a glance, and spot the difference between the maxima and minima among terms. Again, the color remains arbitrary and allows an additional layer of information. 

### 04 Mountain Ridge

[Mountain Ridge](https://graphicprototype.net/empathy/Mountains/) is a classic. It facilitates clustering of the different terms, but geometries have to be carefully estimated as the volume might be misleading. In this case, the click count is x20 times enhanced to allow visibility. Color is also subject to increase the related information. 

### 05 Beehives

[Beehives](https://graphicprototype.net/empathy/Beehives/) clearly reminds of the Stacked Dots with two basic differences. On the one hand, the hexagon shape. Hexagons are beautiful and they inspire a sense of order and robustness of a particular system. On the other hand, the selected items representing the clicks are randomly picked. This is more realistic than in the Stacked Dots dataviz, as successful navigations up until the final click are not correlative as the Stacked Dots might suggest. 

### 06 Waterfall

[Waterfall](https://graphicprototype.net/empathy/Waterfall/) is quite likely the most realistic of all the representations, taking some risks too. Lines aim at every single (or five in this case) query, and how they get somehow 'lost'. Only the clicks complete the trajectory of the navigation for each term. Explicit representation of a process are useful, although they require to contextualize properly. Many elements are subject too to add more information, such as the position of the start of each flow or the color of the successful clicks among others. 

### 07 Daisies

[Daisies](https://graphicprototype.net/empathy/Daisies/) definitely requires interactivity. Repetition of the pattern for all terms would overload the layout. Quite likely updating the distribution for each term would give a better idea of the ratio of clicks to queries in each scenario. Color remains an additional useful feature to be explored in this case. 
