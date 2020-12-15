/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */
const secrets = require('./secrets');

var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "sv",
	timeFormat: 24,
	units: "metric",
	// serverOnly:  true/false/"local" ,
			     // local for armv6l processors, default
			     //   starts serveronly and then starts chrome browser
			     // false, default for all  NON-armv6l devices
			     // true, force serveronly mode, because you want to.. no UI on this device

	modules: [
		{
			module: 'MMM-PIR-Sensor',
			config: {
				sensorPin: 4,
				powerSavingDelay: 20
			}
		},
		{
		module: "MMM-DarkSkyForecast",
		header: "Vädret i Helsingborg",
		position: "top_right",
		config: {
			apikey: secrets.DarkSky.api,
			latitude: secrets.DarkSky.lat,
			longitude: secrets.DarkSky.long,
			updateInterval: "30",
			language: "sv",
			units: "si",
			iconset: "4c",
			concise: "false",
			maxHourliesToShow: "0",
			forecastLayout: "tiled"
			}
	},
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
		module: "MMM-ResRobot",
		position: "left",
		header: "Avgångar",
		config: {
			routes: [
				{from: "740017304", to: "740017294"},	// ResRobot Station IDs of starting and destination station(s). At least one route must be defined.
				{from: "740000120", to: "740000003"},	// "from" is required but "to" is optional (set "to" to empty string to indicate all destinations)
			],
			skipMinutes: 0,		// Skip departures that happens within the next <value> minutes.
			maximumEntries: 6,	// Number of departures to show on screen
			truncateAfter: 5,	// A value > 0 will truncate direction name at first space after <value> characters. 0 = no truncation
			apiKey: secrets.ResBot	// Your ResRobot apiKey
		}
		},
		{
			module: "compliments",
			position: "lower_third",
			config: {
				remoteFile: secrets.compliments,
				updateInterval: 30000,
				fadeSpeed: 4000,
				morningStartTime: 3,
				morningEndTime: 12,
				afternoonStartTime: 12,
				afternoonEndTime: 17,
				}
		},
		{
			module: "MMM-CalendarWeek",
			position: "bottom_bar",	// This can be any of the regions. Best results in bottom region.
			config: {
				maximumNumberOfDays: 5,
				colored: true,
				coloredSymbolOnly: true,
				calendars: [
				{
					url: secrets.calendar,
					symbol: "frog",
					color: "#D48AAA"
				}

				]


	// The config property is optional.
	// If no config is set, an example calendar is shown.
	// See 'Configuration options' for more information.
}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
