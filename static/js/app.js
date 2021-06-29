// UNPACK FUNCTION
function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}


// SELECT ELEMENTS (dropdown)
var dropdown = d3.select("#selDataset");

// Q1: HTML inline handling??
// HANDLE ELEMENTS (dropdown)
// dropdown.on('change', optionChanged);


// LOAD DATA
// Read JSON dataset using D3 library (samples.json)
d3.json("data/samples.json").then((data) => {

    // Assign data to variables
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    // DEBUG
    console.log(data);
    console.log(names);
    console.log(metadata);
    console.log(samples);

    // Render dropdown (sample names)
    renderDrowpdown(names);

})


// RENDER DROPDOWN FUNCTION
function renderDrowpdown(names) {
    // Render dropdown options
    names.forEach(name => {
        dropdown.append('option').text(name);
        console.log(`Rendered dropdown`);   //DEBUG
    });
}


