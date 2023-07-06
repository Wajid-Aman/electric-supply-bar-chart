# Chart of Power Sources Connected to Electric Power Supply at every 5-minute interval.

## Build Instructions
1- 'npm i' ---> to install Dependencies

2- 'npm start' ---> Runs the app in the development mode

3- Open 'http =//localhost =3000' to view it in your browser

## View Instruction

### Color Scheme for each Power Source is given below

    Name = Main, Color Code = "#B798F5"
    Name = "Solar", Color Code = "#02E10C"  
    Name = "DG", Color Code = "#403F3D"  
    Name = "Battery", Color Code = "#FDE602"  
    Name = "Solar+Battery", Color Code = "#86B0FF"  
    Name = "Battery+Solar", Color Code = "#86B0FF"  
    Name = "Main+Solar", Color Code = "#7243D0"  
    Name = "Main+Battery", Color Code = "#32864B"  
    Name = "Main+Solar+Battery", Color Code = "#8BC486"  
    Name = "DG+Battery", Color Code = "#FF00FF"  
    Name = "DG+Solar+Battery", Color Code = "#00FFFF"  
    Name = "DG+Battery+Solar", Color Code = "#00FFFF"  
    Name = "Undetermined", Color Code = "#BBE3FD" 

Empty white spaces in the chart show the unavailability of data at that interval due to network unavailability, site outage, etc.

### Axis
  x-axis: time intervals in hh:mm:ss
  y-axis: date in yyyy-mm-dd

### Refreshing data 
  In order to check that the data is refreshing after some time interval click on the flower icon at the bottom left side of the screen to open query dev tools.
  Currently, the Refresh Time is 10 sec to reduce the testing time. In order to change that navigate to src/pages/supplyBarChart/index.js line:10 refetchInterval: 10000, and Enter 300000 for 5 minutes.

