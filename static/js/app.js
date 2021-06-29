
// Q0: Uncaught SyntaxError: Unexpected token ':'


// UNPACK FUNCTION
function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}


// SELECT ELEMENTS (dropdown)
var dropdown = d3.select("#selDataset");
var demographicInfo = d3.select("#sample-metadata")

// Q1: HTML inline handling??
// HANDLE ELEMENTS (dropdown)
// dropdown.on('change', optionChanged);


// LOAD DATA
// Read JSON dataset using D3 library (samples.json)
d3.json("data/samples.json").then((data) => {

    // Assign data to variables
    var names = data.names;
    // var names = data.names.map((row) => parseInt(row));
    var metadata = data.metadata;
    var samples = data.samples;

    // DEBUG
    console.log(data);
    console.log(names);
    console.log(metadata);
    console.log(samples);

    // Render dropdown (sample names)
    renderDrowpdown(names);

    // Default init()
    console.log(Math.min(names));   // Q3: What??
    var defaultName = 940;
    dropdown.property('value', defaultName);   // Default value for plot

    // 

    // HORIZONTAL BAR CHART

    var defaultSample = samples.find(sample => parseInt(sample.id) === defaultName);
    console.log("Default sample: ");
    console.log(defaultSample);

    function sortDesc(a, b) {
        return b - a;
    }

    var topValues = defaultSample.sample_values.sort(sortDesc).slice(0, 10);
    console.log("Top 10 values: ");
    console.log(topValues);

    topIds = [];
    topLabels = [];

    // defaultSample.find(row => row.sample_values === topValues[0]);

    // for (var i = 1; i < topValues.length; i++) {
    //     topIds.push(defaultSample.find(row.sample_values === topValues[i]));
    // }
    // var topIds = defaultSample.find(row => row.sample_values === topValue)
    // var topLabels = 

    // console.log(topIds);


    var defaultMetadata = metadata.find(metadata => metadata.id === defaultName);
    
    console.log("Metadata: ");
    console.log(defaultMetadata);
    

    for (const [key, value] of Object.entries(defaultMetadata)) {
        demographicInfo.append('div').text(`${key.toUpperCase()}: ${value}`);
      }



})


// RENDER DROPDOWN FUNCTION
function renderDrowpdown(names) {
    // Render dropdown options
    names.forEach(name => {
        dropdown.append('option').text(name);
        console.log(`Rendered dropdown`);   //DEBUG
    });
}


// CHANGE OPTION FUNCTION
function optionChanged() {

    // Q2: Default refresh is form-behaviour only??
    // Prevent the page from refreshing
    // d3.event.preventDefault();

    // Get input values (from elements)
    var name = dropdown.property('value');

    console.log(`Option changed: ${name}`);   //DEBUG
}