var map = L.map('map', {
    center: [35.65057785972163, 139.74420090103902],
    zoom: 14,
});

var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
});
tileLayer.addTo(map);

var memos = [
    {
        "lat":35,
        "lng":140,
        "memo":"hhh",
    }
]
var marker_list =[]

var LeafIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

var greenIcon = new LeafIcon({iconUrl: 'leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: 'leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});

putmuker()

map.on('click',function(e){
    var addplace = {lat:e.latlng.lat,lng:e.latlng.lng,memo:"at"}
    memos.push(addplace)
    console.log(memos)
    remove()
    putmuker()
});

function putmuker(){
    marker_list.length = 0;
    for (var index = 0; index < memos.length; index++) {
        var h1 =`<p>${memos[index].memo}</p>`
        var marker = L.marker([memos[index].lat,memos[index].lng]).addTo(map).bindPopup(h1,({maxWidth:1000}))
        marker_list.push(marker)
    }
    console.log(marker_list)
}

function remove () {
    for (let index = 0; index < marker_list.length; index++) {
        map.removeLayer(marker_list[index]);
    }
}

