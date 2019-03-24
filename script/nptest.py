import urllib.request
import json

# get user input
zip_code = str(input("Enter a ZIP code to search for parks: "))
print("")
parks_response = str(input("Do you want only national parks? (y/n): "))

if 'y' in parks_response:
	flag = True
else:
	flag = False

# initialize the park dictionary... {"park name":dict{"lat": num, "long" : num}}
parkDict = {}

# list all the parks
park = ""
limit = "600" 

# complete the url
endpoint = "https://developer.nps.gov/api/v1/parks?parkCode="
apiKey = "nL3ttK1D6ACPakfdXuHtFVwqZoUqBUNakkT4mqZ6"
fullUrl = endpoint + park + "&limit=" + limit + "&api_key=" + apiKey

# GET request for park info
response = urllib.request.urlopen(fullUrl).read()
data = json.loads(response.decode('utf-8'))

# construct parkDict dictionary
for park in data["data"]:
	name = park["fullName"]
	loc = park["latLong"]
	
	# make sure there is location information
	if len(loc) > 1:
		if not flag:
		
			# parse out location information	
			tok = loc.split(", ")
			latSplit = tok[0].split(":")
			longSplit = tok[1].split(":")
			locDict = {"lat":float(latSplit[1]), "long":float(longSplit[1])}

			# store the entry
			parkDict[name] = locDict
		
		else:
			if "National Park" in name:
				# parse out location information	
				tok = loc.split(", ")
				latSplit = tok[0].split(":")
				longSplit = tok[1].split(":")
				locDict = {"lat":float(latSplit[1]), "long":float(longSplit[1])}

				# store the entry
				parkDict[name] = locDict
	
# get zip code lat/long
# example: https://www.zipcodeapi.com/rest/6DNN4DrgvSpLQ1yNH9t9f2RnTEmN7TVpifx0DEXdlaC7zfS6rwJP3qD2RW6s6n6s/info.json/78741/degrees

# build url for ZIP code GET request
zip_key = "XNDqLjQw3AbhkpGy0jTrdB0k1OQivNGF7EodriuhM4FBFLBpgovlvPTH6vp9Cked/"
zip_endpoint = "https://www.zipcodeapi.com/rest/"
zip_type = "json"
zip_units = "degrees"
zip_url = zip_endpoint + zip_key + "info." + zip_type + "/" + zip_code + "/" + zip_units

# GET request for ZIP code lat/long
zip_response = urllib.request.urlopen(zip_url).read()
zip_data = json.loads(zip_response.decode('utf-8'))

# store lat/long
zip_lat = zip_data["lat"]
zip_long = zip_data["lng"]

# do distance calculations
from geopy.distance import geodesic
distDict = {}

for key, value in parkDict.items():
	name = key
	park_lat = value.get("lat")
	park_long = value.get("long")
	
	park_loc = (park_lat, park_long)
	zip_loc = (zip_lat, zip_long)
	
	distDict[name] = geodesic(zip_loc, park_loc).miles

# get top 10 closest parks
# make a copy of the dictionary so we can delete min entries to find 10 mins (closest parks)
dictCpy = dict(distDict)
print("")
if not flag:
	print("Your 10 closest national landmarks:")
else :
	print("Your 10 closest national parks:")
print("")
for i in range(10):
	# find min key
	min_key = min(dictCpy, key=dictCpy.get)
	# print park
	print(str(i+1) + ". " + min_key + " -- Distance: " + str(int(distDict.get(min_key))) + " miles")
	# remove from dictionary so we can find another min
	del dictCpy[min_key]

