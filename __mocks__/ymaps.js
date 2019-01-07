const ymaps = jest.genMockFromModule('ymaps');
let mapInstance = {
  Map: function(map, properties) {
    return {
      map: map,
      properties: properties,
      geoObjects: {
        add: () => { }
      },      
    }
  },
  GeoObjectCollection: function() {
    return {
      removeAll: () => { },
      add: () => { },
    }
  },
  Placemark:  function(coords, props, opts) { 
    return {
      coords, 
      props, 
      opts,
      events: {
        add: (eventName, callback) => {}
      } 
    }
  },
  Polyline: function(coords, props, opts) { 
    return {
      coords, props, opts 
    }
  },
};

module.exports = {
  load: function () {
    return Promise.resolve(mapInstance)
  }
};