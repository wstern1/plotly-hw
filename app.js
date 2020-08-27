
function getPlot(id) {

    d3.json("static/samples.json").then((data) => {
        
        var wfreq = data.metadata.map(d => d.wfreq)
    
        var samples = data.samples.filter(s => s.id.toString() === id)[0];

        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

        var OTU_id = OTU_top.map(d => "OTU " + d)

        var labels = samples.otu_labels.slice(0, 10);

        var bartrace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'rgb(142,124,195)'
            },
            type: "bar",
            orientation: "h",
        };

        var data = [bartrace];

        var layout = {
            title: "Top 10 OTU",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bar", data, layout);

        var bubbletrace = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        var layout_b = {
            xaxis: { title: "OTU ID" },
            height: 600,
            width: 1000
        };

        var data1 = [bubbletrace];

        Plotly.newPlot("bubble", data1, layout_b);


    });
}

function getInfo(id) {

    d3.json("static/samples.json").then((data) => {

        var metadata = data.metadata;

        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        
        var demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("static/samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();