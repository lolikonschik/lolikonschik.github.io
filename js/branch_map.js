var geojson;            
var map = L.map('map', {
    'zoomControl':false,
    'dragging':false,
    'scrollWheelZoom':false,
    'doubleClickZoom':false
}).setView([48.350, 31.166], reZoom());
                    
var icon = new L.icon({
    'iconUrl':'./i/filial.png',
    'iconSize': [43, 18],
    'className' : 'filial'
});
var icon2 = new L.icon({
    'iconUrl':'./i/filial.png',
    'iconSize': [29, 12],
    'className' : 'representative'
});
var icon3 = new L.icon({
    'iconUrl':'./i/filial.png',
    'iconSize': [19, 8],
    'className' : 'diler'
});

var i=0;
while (citiesData[i])
{
    city = citiesData[i];
    
    var myIcon = L.divIcon({
        html: '<span>' + city.title + '</span>',
        className: 'my-div-icon', 'iconSize':L.point([10,10])})
    
    L.marker(city.coordinates, {'icon':myIcon}).addTo(map)
    
    if(city.filial) {
        // L.marker(city.filial, {'icon':icon}).addTo(map)
    }
    if(city.representative) {
        // L.marker(city.representative, {'icon':icon2}).addTo(map)
    }
    if(city.diler) {
        // L.marker(city.diler, {'icon':icon3}).addTo(map)
    }                
    i++;
}
             
window.onresize = function() {
    resizeIcons();
    map.setZoom(reZoom())
};
window.onload = function () {
    resizeIcons();
};


function getColor() {
    return '#ddd'
}

function style(feature) {
    return {
        fillColor: getColor(),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 1
    };
}

function reZoom() {
    return 6.05 + 1.1*(document.getElementById('map').offsetWidth - 850)/850;
}
            
function resizeIcons() {
    var filials = document.getElementsByClassName('filial');                
    var representatives = document.getElementsByClassName('representative');
    var dilers = document.getElementsByClassName('diler');
    
    var x = (document.getElementById('map').offsetWidth - 850)/850;
    
    for (var i=0; i<filials.length; i++) {
        filials[i].style.width = (43*(1+x)) + 'px';
        filials[i].style.height = (18*(1+x)) + 'px';
    }	        
    for (var i=0; i<representatives.length; i++) {
        representatives[i].style.width = (29*(1+x)) + 'px';
        representatives[i].style.height = (12*(1+x)) + 'px';
    }
    for (var i=0; i<dilers.length; i++) {
        dilers[i].style.width = (19*(1+x)) + 'px';
        dilers[i].style.height = (8*(1+x)) + 'px';
    }
    
}
            
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 1,
        fillColor: '#bbb'
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}                        

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}           

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Контактная информация:</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.Manager + 
        (props.Address ? '<br />Адрес.: ' + props.Address : '') +
        '<br />Тел.: ' + props.Phone +
        '<br />Email: ' + props.Email +
        // '<br />ICQ: ' + props.ICQ +
        '<br />Моб.Тел.: ' + props.Mobile
    : 'Выберите регион.');
};

info.addTo(map);