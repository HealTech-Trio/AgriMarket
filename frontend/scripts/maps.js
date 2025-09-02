  let map, userMarker, autocomplete, placesService;

  // Emoji sets by category
  const emojiMap = {
    farm: ["🌾", "🐄", "🐓", "🍇"],
    market: ["🥕", "🌱", "🛒"],
    grocery: ["🛒", "🥕"],
    default: ["🛒", "🌾", "🥕", "🐄"]
  };

  function getEmojiForPlace(place) {
    const name = place.name.toLowerCase();

    if (name.includes("farm")) return randomEmoji(emojiMap.farm);
    if (name.includes("market")) return randomEmoji(emojiMap.market);
    if (name.includes("grocery") || name.includes("shop") || name.includes("store"))
      return randomEmoji(emojiMap.grocery);

    return randomEmoji(emojiMap.default);
  }

  function randomEmoji(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // Custom SVG Circle Icon with Emoji
  function getFarmIcon(place) {
    const emoji = getEmojiForPlace(place);

    return {
      url:
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="red" stroke="white" stroke-width="3"/>
            <text x="50%" y="55%" text-anchor="middle" font-size="18" font-family="Arial" fill="white">${emoji}</text>
          </svg>
        `),
      scaledSize: new google.maps.Size(40, 40),
      anchor: new google.maps.Point(20, 20) // center the circle
    };
  }

  function initMap() {
    const jhb = { lat: -26.2041, lng: 28.0473 };
    map = new google.maps.Map(document.getElementById("map"), {
      center: jhb,
      zoom: 10,
    });

    placesService = new google.maps.places.PlacesService(map);

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          map.setCenter(pos);
          map.setZoom(12);

          // User blue circle marker
          userMarker = new google.maps.Marker({
            position: pos,
            map: map,
            title: "Your Location",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            },
          });

          findNearbyFarms(pos);
        },
        () => {
          alert("Geolocation failed. Showing farms around Johannesburg.");
          findNearbyFarms(jhb);
        }
      );
    } else {
      alert("Your browser doesn't support geolocation. Showing farms around Johannesburg.");
      findNearbyFarms(jhb);
    }

    // Autocomplete search
    const input = document.getElementById("searchInput");
    autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(12);
      }

      findNearbyFarms(place.geometry.location);
    });
  }

  function findNearbyFarms(location) {
    const request = {
      location: location,
      radius: 20000, // 20km
      keyword: "farm OR farmers market OR fresh produce OR grocery",
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place) => {
          if (place.place_id) {
            const detailsRequest = {
              placeId: place.place_id,
              fields: [
                "name",
                "rating",
                "vicinity",
                "opening_hours",
                "geometry",
                "url",
              ],
            };

            placesService.getDetails(
              detailsRequest,
              (detailedPlace, detailStatus) => {
                if (
                  detailStatus === google.maps.places.PlacesServiceStatus.OK &&
                  detailedPlace
                ) {
                  createFarmMarker(detailedPlace);
                }
              }
            );
          }
        });
      }
    });
  }

  function createFarmMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      title: place.name,
      icon: getFarmIcon(place), // ⭕ with emoji inside
    });

    let hoursInfo = "Opening hours not available";
    if (place.opening_hours) {
      hoursInfo = place.opening_hours.isOpen()
        ? '<span style="color: green;">Open now</span>'
        : '<span style="color: red;">Closed</span>';
    }

    const contentString = `
      <div style="font-family: Arial, sans-serif; max-width: 250px;">
          <h3 style="margin: 0 0 5px 0;">${place.name}</h3>
          <p style="margin: 0;">${place.rating || "No rating"} ★ | ${
      place.vicinity
    }</p>
          <p style="margin: 5px 0;">${hoursInfo}</p>
          <a href="${
            place.url
          }" target="_blank">View on Google Maps & Get Directions</a>
      </div>`;

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  }