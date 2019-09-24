
// Using jQuery, read our data and call visualize(...) only once the page is ready:
$(function() {
    d3.csv("allDatav3.csv").then(function(data) {
      // Write the data to the console for debugging:
      console.log(data);
      // Call our visualize function:
      visualize(data);
    });
  });
  
var visualize = function(data) {
  //Boilerplate:
  var margin = { top: 100, right: 100, bottom: 100, left: 100 },
      width = 1600 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;
  

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);


  var chart1 = svg
    .append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart1")
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + (margin.left+400) + "," + (margin.top+100) + ")");

  var chart2 = svg
    .append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart2")
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + (margin.left+1000) + "," + (margin.top+100) + ")");


  // slider
  var slider = d3.select("#slider").select('#year');
  slider.on('input', function() { 
    d3.select("body").select("svg").select("#chart1").remove();
    chart1 = d3.select("body").select("svg")
    .append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart1")
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + (margin.left+400) + "," + (margin.top+100) + ")");

    d3.select("body").select("svg").select("#chart2").remove();
    chart2 = d3.select("body").select("svg")
    .append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("id", "chart2")
    .style("width", width + margin.left + margin.right)
    .style("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + (margin.left+1000) + "," + (margin.top+100) + ")");

    draw(year, this.value);
  });

  draw(2018, 2018);
  
  function percentage(p) {
    return (Math.round((p) / (Math.PI * 2) * 100) / 100) + "%";
  }
  
  // draw the pie graphs
  function draw(prevYear, year) { 
    
    // Compute the position of each group on the pie:
    var pieUndergrad = d3.pie()
      .value(function(d) {return d["Total Undergraduate"]; })

    var pieGraduate= d3.pie()
      .value(function(d) {return d["Total Graduate"]; })

    var pieTotal = d3.pie()
      .value(function(d) {return d.Total; })

    var enrollment1 = data.filter((d) => d.Year === "Fall " + year)
      .reduce((t,d) => t + parseFloat(d["Total Graduate"]), 0)
    var radius1 = Math.sqrt(enrollment1) * 2;

    var enrollment2 = data.filter((d) => d.Year === "Fall " + year)
      .reduce((t,d) => t + parseFloat(d["Total Undergraduate"]), 0)
    var radius2 = Math.sqrt(enrollment2) * 2;
    // var data_ready = pie(data)

    // Div styling:
    var div = d3.select("body").append("div")
    .style("background-color", "#42ebf4")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .attr("class", "tooltip")
    .style("opacity", 0);

    // Tooltip:
    var mouseover1 = function(d, i) { 
        div.transition()		
          .duration(200)
          .style("opacity", 1) // also how to change the position of the info 
        div.html("Country: " + d.data["Country"] + "</br>"
          + "Enrollment: "  + d.data["Total Graduate"] + "</br>" // I'm using ratio
          + "Percentage: " + percentage(100 * (d.endAngle - d.startAngle)) + "</br>"
          + "Male : Female = " + Math.round(d.data["Percent_M_Graduate"]) + " : " + Math.round(d.data["Percent_F_Graduate"]))
          .style("left", (margin.left + 300) + "px")
          .style("top", "500px");	
    } 
    var mouseover2 = function(d, i) { 
      div.transition()		
        .duration(200)
        .style("opacity", 1)
      div.html("Country: " + d.data["Country"] + "</br>"
        + "Enrollment: "  + d.data["Total Undergraduate"] + "</br>"
        + "Percentage: " + percentage(100 * (d.endAngle - d.startAngle)) + "</br>"
        + "Male : Female = " + Math.round(d.data["Percent_M_Undergraduate"]) + " : " + Math.round(d.data["Percent_F_Undergraduate"]))
        .style("left", (margin.left + 900) + "px")		 //<---- just increased he margin on this one, should have moved over now
        .style("top", "500px");	// the position match now
  }
    var mouseout = function(d, i) { 
        div.transition()		
          .duration(200)		
          .style("opacity", 0);
    }

    var tooltip = d3.select("#chart1")
		.append('div')
		.attr('class', 'tooltip');

    // Visualization Code:

    // var color = d3.scaleOrdinal()
    // .domain(["China", "India", "South Korea", "Korea, South", "Taiwan", "Other"])
    // .range(["#de425b", "#e59550", "#d6d988", "#d6d988", "#78b58c", "#448888"])

    var maleColor = d3.scaleLinear()
    .domain([20,80])
    .range(["#42f4e2", "#1a0fe2"])

    var femaleColor = d3.scaleLinear()
    .domain([20,80])
    .range(["#e0baba", "#f70202"])
    
    // Graduate
    chart1
    .selectAll("Country")
    .data(pieGraduate(data.filter(function(d) {
      return (d.Year === "Fall " + year);
    })))
    .remove()
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius1))
    .attr('fill', function(d){
  
       if (d.data.Percent_F_Graduate >= 50)
          return(femaleColor(d.data.Percent_F_Graduate))
        else 
          return(maleColor(d.data.Percent_M_Graduate))
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 1)
    .on("mouseover", mouseover1)
    .on("mouseout", mouseout)


    // Undergraduate
    chart2
    .selectAll("Country")
    .data(pieUndergrad(data.filter(function(d) {
      return (d.Year === "Fall " + year);
    })))
    .remove()
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius2))
    .attr('fill', function(d){
       // return(color(d.data.Country)) })
       if (d.data.Percent_F_Undergraduate >= 50)
          return(femaleColor(d.data.Percent_F_Undergraduate))
        else 
          return(maleColor(d.data.Percent_M_Undergraduate))
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 1)
    .on("mouseover", mouseover2)
    .on("mouseout", mouseout)
    
    
  }
};