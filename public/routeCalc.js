function getJSON(){
	var json = 0;
	var data = processJSON(json);
	var totalRoute = [];
	var waypoint = 0;
	while (waypoint < data[0].length){
		var day = calculateRouteForDay(10, data[0], data[1], data[2], waypoint);
		totalRoute.push(day);
		waypoint++;
	}
}

function processJSON(json){
	var obj = JSON.parse(json);
	var maneuver = obj.route[0].leg.maneuver;
	var data = [[], [], []];
	for (var i = 0; i < maneuver.length; i++){
		data[0].push(maneuver[i].position.latitude);
		data[1].push(maneuver[i].position.longitude);
		data[2].push(maneuver[i].travelTime);
	}
	return data;
}

function calculateRouteForDay(timePerDay, latitudes, longitudes, timeLengths, waypoint){
	var data = [0, 0, 0, 0];
	var timePerDayInSeconds = timePerDay * 3600;
	var lunchPoint = timePerDayInSeconds / 3;
	var dinnerPoint = lunchPoint * 2;
	var lunchPointSet = false;
	var dinnerPointSet = false;
	var hotelPointSet = false;
	var waypoint = 0;
	var traveled = 0;
	while (traveled < timePerDayInSeconds){
		traveled += timeLengths[waypoint];
		waypoint++;
		if (traveled >= lunchPoint && !lunchPointSet){
			lunchPointSet = true;
			data[0] = [latitudes[waypoint], longitudes[waypoint]];
		}
		else if (traveled >= dinnerPoint && !dinnerPointSet){
			dinnerPointSet = true;
			data[1] = [latitudes[waypoint], longitudes[waypoint]];
		}
		else if (traveled >= timePerDayInSeconds && !hotelPointSet){
			hotelPointSet = true;
			data[2] = [latitudes[waypoint], longitudes[waypoint]];
		}
	}
	data[3] = waypoint;
	return data;
}