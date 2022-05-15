from geopy.geocoders import Nominatim

def geocode(address):
    geolocator = Nominatim(user_agent="specify_your_app_name_here")
    location = geolocator.geocode(address)
    if location==None:
        splitted_address = address.split('-')
        for i in reversed(range(len(splitted_address))):
            location = geolocator.geocode(str(splitted_address[i]))
            if location is not None:
                return location.latitude, location.longitude
        location="neznano"
    else:
        return location.latitude, location.longitude

print(geocode('MARIBOR (MELJSKA CESTA)'))