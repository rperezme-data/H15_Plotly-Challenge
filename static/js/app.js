
// LOAD DATA
// Read JSON dataset using D3 library (samples.json)
d3.json("data/samples.json").then((data) => {

    // Assign data to variables
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

})

// DEBUG
console.log(names);
console.log(metadata);
console.log(samples);