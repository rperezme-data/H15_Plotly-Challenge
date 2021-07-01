// SELECT ELEMENTS
var dropdown = d3.select("#selDataset");
var demographicInfo = d3.select("#sample-metadata");


// LOAD DATA
// Read JSON dataset using D3 library (samples.json)
d3.json("data/samples.json").then((data) => {

    // Assign data to variables
    var names = data.names.map((row) => parseInt(row));
    var metadata = data.metadata;
    var samples = data.samples;

    // Render dropdown (sample names)
    renderDrowpdown(names);

    // SET DEFAULT VALUE
    // DEBUG
    console.log("Sample Range (min/max): ");
    console.log(Math.min(...names), Math.max(...names));

    // Default value for initial dashboard metadata & plots
    var defaultName = 940;

    // Set dropdown default value
    dropdown.property('value', defaultName);

    // Get sample metadata
    var defaultMetadata = metadata.find(metadata => metadata.id === defaultName);
    // Render sample metadata
    renderMetadata(defaultMetadata);

    // Get sample data
    var defaultSample = samples.find(sample => parseInt(sample.id) === defaultName);
    console.log("Default sample: ");
    console.log(defaultSample);


    // HORIZONTAL BAR CHART
    var data = {
        x: defaultSample.sample_values.slice(0, 10).reverse(),
        y: defaultSample.otu_ids.slice(0, 10).map(row => `OTU ${String(row)}`).reverse(),
        type: 'bar',
        orientation: 'h',
        text: defaultSample.otu_labels.slice(0, 10)
    };

    var layout = {
        title: "Top 10 Bacteria Cultures Found"
    };

    Plotly.newPlot('bar', [data], layout);

})


// RENDER DROPDOWN FUNCTION
function renderDrowpdown(names) {
    // Render dropdown options
    names.forEach(name => {
        dropdown.append('option').text(name);
        console.log(`Rendered dropdown`);   //DEBUG
    });
}


// RENDER METADATA FUNCTION
// Pending: d3.remove
function renderMetadata(sampleMetadata) {
    demographicInfo.html("");
    for (const [key, value] of Object.entries(sampleMetadata)) {
        demographicInfo.append('p').text(`${key.toUpperCase()}: ${value}`);
    }
}


// SORT SAMPLE DATA FUNCTIONS (by sample_value)
// Ascending
function sortDesc(a, b) {
    return b.sample_value - a.sample_value;
}

// Descending
function sortAsc(a, b) {
    return a.sample_value - b.sample_value;
}


// CHANGE OPTION FUNCTION
function optionChanged() {

    // Get input values (from elements)
    var name = parseInt(dropdown.property('value'));

    // LOAD DATA
    d3.json("data/samples.json").then((data) => {

        // Assign data to variables
        var metadata = data.metadata;
        var samples = data.samples;

        // Get selected sample metadata
        var selectedMetadata = metadata.find(metadata => metadata.id === name);
        // Render metadata
        renderMetadata(selectedMetadata);


    });

}

console.log("Script successfully read");
