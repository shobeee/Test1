const fitnessData = [
    ["Pakistan", 45.7],
    ["United States", 65.4],
    ["Germany", 53.2],
    ["Japan", 71.8],
    ["Australia", 62.1],
    ["Canada", 58.6],
    ["France", 47.3],
    ["Italy", 50.9],
    ["China", 55.2],
    ["India", 43.5],
    ["United Kingdom", 59.8],
    ["Spain", 51.6],
    ["Brazil", 49.2],
    ["Mexico", 44.9],
    ["South Korea", 60.3],
    ["Netherlands", 56.7],
    ["Russia", 48.1],
    ["Turkey", 46.5],
    ["Saudi Arabia", 42.8],
    ["Sweden", 57.4]
    // Add more countries and percentages as needed
  ];

  const width = 700;
  const height = 500;

  const padding = {
    top:20,
    bottom:30,
    left:30,
    right:30
  }

  const svg = d3.select('body')
  .append('svg')
  .attr('width',width+padding.left+padding.right)
  .attr('height',height+padding.top+padding.bottom)
  .style('background-color','white')
  .style('margin','4rem')

  d3.select('body')
  .style('background-color','white')


  const xScale = d3.scaleBand()
  .domain(fitnessData.map(d=>d[0]))
  .range([padding.left,width-padding.right])

  const xAxis = d3.axisBottom(xScale)
  .tickValues(xScale.domain().map(d=>d))
  .tickFormat(d=>d.substring(0,3))

svg.append('g')
.call(xAxis)
.attr('transform',`translate(50,${height})`);
svg.append('text')
.text('Countries')
.attr('transform',`translate(${width/2},${height+padding.bottom+10})`)
.attr('text-anchor', 'middle');


svg.append('text')
.text("Here is the List of 20 countries with their fitness Levels")
.attr('id','top-heading')
.attr('transform',`translate(${width/2},${padding.top-5})`)
.attr('text-anchor','middle')
.style('fill','#8B0000')


const yScale = d3.scaleLinear()
.domain([40,d3.max(fitnessData.map(d=>d[1]))])
.range([height,padding.top])




const yAxis = d3.axisLeft(yScale)
.tickFormat(d=>{
    const tickFormat = d3.format('.0%')
    return tickFormat(d/100)
});


svg.append('g')
.call(yAxis)
.attr(`transform`,`translate(${padding.left+50},0)`)


svg.append('text')
.text('Fitness Values in Percentages')
.attr(`transform`,`translate(${20},${height/2})rotate(-90)`)
.attr('text-anchor','middle');




svg.selectAll('rect')
.data(fitnessData)
.enter()
.append('rect')
.attr('x',(d,i)=>{
    return xScale(d[0])+60
})
.attr('class','rect')
.attr('y',(d,i)=> {
    return yScale(d[1])
})
.attr('width',(d,i)=>{
    return width/40
})
.attr('height',(d,i)=> {
   return height-yScale(d[1])
})
.attr('data-color',(d,i)=>{
    return '#C0C0C0'
})
.attr('fill','#C0C0C0')
.on('mouseover',function(d,i){
    d3.select(this).style('fill','')
d3.select('country-label').style('fill','red')
})
    .on('mouseout',function(){
        const color = d3.select(this).attr('data-color')
        d3.select(this).style('fill',color);
        d3.select('country-label').style('fill','black')
    });


    

svg.selectAll('.country-label')
  .data(fitnessData)
  .enter()
  .append('text')
  .attr('class', 'country-label')
  .text((d, i) => d[0].substring(0, 3))
  .attr('x',(d,i)=>{
     return d[0]==='Japan'?xScale(d[0])+90:xScale(d[0])+65
   
    })
  .attr('y',(d,i)=>d[0]==='Japan'?yScale(d[1])+11:yScale(d[1])-3)
  .attr('text-anchor', 'middle')
  .attr('fill', 'black');







  console.log(yScale(fitnessData[5][1]))

  
  