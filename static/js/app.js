// SELECT HTML ELEMENTS
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

    console.log("Sample Range (min/max): ", Math.min(...names), Math.max(...names));   // DEBUG

    // Default value for initial dashboard metadata & plots
    var defaultName = 940;

    // Set dropdown default value
    // dropdown.property('value', defaultName);

    // Pending: GET DASHBOARD DATA FUNCTION

    // Get sample metadata
    var defaultMetadata = metadata.find((metadata) => metadata.id === defaultName);

    // Render sample metadata
    renderMetadata(defaultMetadata);

    // Get sample data
    var defaultSample = samples.find((sample) => parseInt(sample.id) === defaultName);

    console.log("Default sample: ", defaultSample);   // DEBUG

    // SORT SAMPLE DATA
    // Set initial values
    var sampleArr = [];
    var sampleDict = {};

    // Build data collection
    for (var i = 0; i < defaultSample.sample_values.length; i++) {
        sampleDict["id"] = defaultName;
        sampleDict["sample_value"] = defaultSample.sample_values[i];
        sampleDict["otu_id"] = String(defaultSample.otu_ids[i]);
        sampleDict["otu_label"] = defaultSample.otu_labels[i];
        sampleArr.push(sampleDict);
        sampleDict = {};
    }

    console.log("Sample Array: ", sampleArr.slice(0, 10));   // DEBUG

    // Sort data collection
    var sortedArr = sampleArr.sort(sortDesc);

    console.log("Sorted Array: ", sortedArr.slice(0, 10));   // DEBUG

    // Solved: plotData .sample_values .otu_ids .otu_labels
    sample_values = sortedArr.map((row) => row.sample_value);
    otu_ids = sortedArr.map((row) => row.otu_id);
    otu_labels = sortedArr.map((row) => row.otu_label);


    // HORIZONTAL BAR CHART
    var trace1 = {
        type: 'bar',
        orientation: 'h',
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map((row) => `OTU ${String(row)}`).reverse(),
        text: otu_labels.slice(0, 10)
    };

    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: { title: "Sample Values" },
        // yaxis: { title: "Operational Taxonomic Unit" }
    };

    Plotly.newPlot('bar', [trace1], layout);


    // DEBUG
    console.log("Marker Size: ", sample_values);
    console.log("Marker Color: ", otu_ids.map((item) => `#${item}`));


    // BUBBLE CHART
    var trace2 = {
        mode: 'markers',
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        marker: {
            size: sample_values,
            color: otu_ids.map((item) => `#${item}`),   // Pending: color
            
        }
    };

    var layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: { title: "Operational Taxonomic Unit (OTU) ID" },
        yaxis: { title: "Sample Values" },
        showlegend: false
    };

    Plotly.newPlot('bubble', [trace2], layout);


    // GAUGE CHART
    var trace3 = {

        type: "indicator",
        mode: "gauge+number",
        title: "Scrubs per Week",

        value: defaultMetadata.wfreq,

        gauge: {

            axis: {
                range: [0, 9],
                tickmode: 'array',
                tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            },

            threshold: {
                line: { color: "royalblue", width: 4 },
                thickness: 0.75,
                value: defaultMetadata.wfreq
            },

        },

    };

    var layout = { title: "Belly Button Washing Frequency" };

    Plotly.newPlot('gauge', [trace3], layout);



})


// RENDER DROPDOWN FUNCTION
// Pending: first.option
function renderDrowpdown(names) {
    // Render dropdown options
    names.forEach((name) => {
        dropdown.append('option').text(name);
    });

    console.log("Rendered dropdown", names);   //DEBUG

}


// RENDER METADATA FUNCTION
// Pending: d3.remove
function renderMetadata(sampleMetadata) {
    demographicInfo.html("");
    for (const [key, value] of Object.entries(sampleMetadata)) {
        demographicInfo.append('p').text(`${key.toUpperCase()}: ${value}`)
            .style('font-size', '11.5px')
            .style('font-weight', 'bold');
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
        var selectedMetadata = metadata.find((metadata) => metadata.id === name);
        // Render metadata
        renderMetadata(selectedMetadata);

        // Get sample data
        var selectedSample = samples.find((sample) => parseInt(sample.id) === name);

        // SORT SAMPLE DATA
        // Set initial values
        var sampleArr = [];
        var sampleDict = {};

        // Build data collection
        for (var i = 0; i < selectedSample.sample_values.length; i++) {
            sampleDict["id"] = name;
            sampleDict["sample_value"] = selectedSample.sample_values[i];
            sampleDict["otu_id"] = String(selectedSample.otu_ids[i]);
            sampleDict["otu_label"] = selectedSample.otu_labels[i];
            sampleArr.push(sampleDict);
            sampleDict = {};
        }

        // Sort data collection
        var sortedArr = sampleArr.sort(sortDesc);

        // Build data arrays
        sample_values = sortedArr.map((row) => row.sample_value);
        otu_ids = sortedArr.map((row) => row.otu_id);
        otu_labels = sortedArr.map((row) => row.otu_label);


        // RESTYLE BAR CHART
        var x = sample_values.slice(0, 10).reverse();
        var y = otu_ids.slice(0, 10).map((row) => `OTU ${String(row)}`).reverse();
        var text = otu_labels.slice(0, 10);

        Plotly.restyle('bar', 'x', [x]);
        Plotly.restyle('bar', 'y', [y]);
        Plotly.restyle('bar', 'text', [text]);


        // RESTYLE BUBBLE CHART
        x = otu_ids;
        y = sample_values;
        var markerSize = sample_values;
        var markerColor = otu_ids.map((item) => `#${item}`);   // Pending: color

        // DEBUG
        console.log("Marker Size: ", markerSize);
        console.log("Marker Color: ", markerColor);

        Plotly.restyle('bubble', 'x', [x]);
        Plotly.restyle('bubble', 'y', [y]);
        Plotly.restyle('bubble', 'marker.size', [markerSize]);
        Plotly.restyle('bubble', 'marker.color', [markerColor]);

        // RESTYLE GAUGE CHART
        var value = selectedMetadata.wfreq;
        Plotly.restyle('gauge', 'value', value);
        Plotly.restyle('gauge', 'gauge.threshold.value', value);
        console.log("Restyle value: ", value);



    });

}

console.log("Script successfully read");   // DEBUG
