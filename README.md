# Plotly-challenge
## Web App: Interactive dashboard for dataset exploration

### Description
The scope of this project is to showcase an interactive dashboard to explore the [Belly Button Biodiversity dataset](data/samples.json), which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


### Script Summary
This web application was built using HTML & Bootstrap for the webpage elements and JavaScript, D3 & Plotly for interactive loading, rendering and plotting data.

### Workflow

1. Load JSON dataset using D3 library
2. Render dropdown data (sample names)
3. Render panel data (default sample metadata)
4. Plot data (default sample):
    + Horizontal bar chart
    + Gauge chart
    + Bubble chart
5. Listen dropdown "on-change" option:
    + Rerender panel (selected sample metadata)
    + Restyle charts (selected sample)

### Screenshot
![Dashboard_Screenshot](screenshots/dashboard-940.png)

### [Explore the Dashboard!](https://rperezme-data.github.io/H15_Plotly-challenge/)
<br>

--- 

##### References

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

--- 

**Contact:** [rperezme.data@gmail.com](mailto:rperezme.data@gmail.com)

