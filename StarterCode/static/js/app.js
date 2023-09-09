// read in the JSON from the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// create the data Promise retrieve data
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);
ids = []

//then used to creates data from Promise first
dataPromise.then((data) => {
    //iterrate through each index from metadata in metadata
    for(let x in data.metadata){
        //set equal to variable y
        let y = data.metadata[x]
        //append results to the the option html element attribute in our select handler
        d3.selectAll("#selDataset").append("option").text(y.id)
    };

    //select the Select handler and have event listener execute function 
    d3.selectAll("#selDataset").on("change", () => {
        //create chain variable to obtain value when the event listener is acivated 
        let dropdownMenu = d3.select("#selDataset");
        let dataset = dropdownMenu.property("value");
        //console.log(dataset)

        //create for loop to obtain index coinciding with sample data (property),
        // conditional then matches the id property within the sample dictionary with the value clicked in event listener property 
        let index = 0;
        for(let i = 0; i < data.samples.length; i++){
            if(data.samples[i].id == dataset){
            index = i
            break
        }};

        //create empty arrays to hold data        
        let x=[]
        let y=[] 
        let hover=[]

        //with sample array value index indicated, create for loop to extract data from the sample_value property in the correct
        //indexed sample dictionary info value just for the first 10 values
        for(let z = 0; z < 10; z++){
        x.push(data.samples[index].sample_values[z])
        y.push("OTU_ID "+ data.samples[index].otu_ids[z])
        hover.push(data.samples[index].otu_labels[z])
        }

        //initialize bar plot data, reversing array of x to show data in correct order
        var barData = [{
            x: x.reverse(),
            y: y,
            orientation: "h",
            type: 'bar'}];

        var layout = {
            margin: {
                l: 150
            }};        

        Plotly.newPlot('bar', barData, layout);

        //create bubble chart
        let a=[]
        let b=[] 
        let dover=[]

        for(let z = 0; z< data.samples[index].sample_values.length; z++){
            b.push(data.samples[index].sample_values[z])
            a.push(data.samples[index].otu_ids[z])
            dover.push(data.samples[index].otu_labels[z])
        };

        var bubbleData = [{
            x: a,
            y: b,
            mode: "markers",
            marker: {
                size: b,
                color: a
            }
        }];

        var layout = {
            xaxis: {
                title: 'OTU-ID'
            },
            showlegend: false,
            height: 600,
            width: 800
        };

        Plotly.newPlot("bubble", bubbleData, layout);

        //Demographic Info
        let info=[]
        for(let i = 0; i < data.metadata.length; i++){
            if(data.metadata[index].id == dataset){
            info=data.metadata[index]
            break
        }};
        
        const info_anchor = d3.select("#sample-metadata").append("ul")

        for(i in info) {
            if (i=="id") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`id: ${info[i]}`)
            } else if (i=="ethnicity") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`ethnicity: ${info[i]}`)
            } else if (i=="gender") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`gender: ${info[i]}`)
            } else if (i=="age") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`age: ${info[i]}`)
            } else if (i=="location") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`location: ${info[i]}`)
            } else if (i=="bbtype") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`bbtype: ${info[i]}`)
            } else if (i="wfreq") {
                let info_list = info_anchor.append("li").style("margin-left", "-20px").text(`wfreq: ${info[i]}`)
            }
        };

    });

});






    
