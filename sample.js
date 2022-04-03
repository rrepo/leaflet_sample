var map = L.map('map', {
    center: [35.6, 139.7],
    zoom: 14,
});

var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
});
tileLayer.addTo(map);

var memos = []
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

function init(){
    const local = localStorage.getItem('memos');
    const memosJson = JSON.parse(local);
    
    if (memosJson == null){
        
    }else{
        for (let index = 0; index < memosJson.length; index++) {
            console.log(memosJson[index])
            memos.push(memosJson[index])
        }
        console.log(memos)
        putmuker()
    }
    
}init()

map.on('click',function(e){
    var memo_id = memos.length + 1
    var addplace = {id:memo_id,lat:e.latlng.lat,lng:e.latlng.lng,memo:""}
    memos.push(addplace)
    remove()
    putmuker()
});


function putmuker(){
    marker_list.length = 0;
    for (var index = 0; index < memos.length; index++) {
        var v = memos[index].memo
        var content =`
        <textarea onkeyup = edit(${index},this.value)
        id = ${index}
        value=${v}>${v}</textarea>
        `
        var marker = L.marker([memos[index].lat,memos[index].lng]).addTo(map).bindPopup(content,({maxWidth:1000})).openPopup();
        marker_list.push(marker)
    }
}

function remove() {
    for (let index = 0; index < marker_list.length; index++) {
        console.log(marker_list[index])
        map.removeLayer(marker_list[index]);
    }
}

function edit(i,ele) {
    console.log(memos[i].memo = ele)
    console.log(memos)

    const memos_String = JSON.stringify(memos);
    localStorage.setItem('memos',memos_String);
}

map.on('popupopen', function(e) {
    var result = memos.filter(memos => memos.lat === e.popup._latlng.lat,memos.lng ===e.popup._latlng.lng)
    document.getElementById(result[0].id - 1).value = memos[result[0].id - 1].memo
});

document.getElementById("delete").onclick = function() {
    remove()
    memos.length = 0;
    localStorage.setItem('memos',null);
};


L.easyButton('fas fa-comment-alt', function(){
    remove()
    memos.length = 0;
    localStorage.setItem('memos',null);
}).addTo(map);
