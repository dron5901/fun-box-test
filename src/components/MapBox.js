/**
 * Компонент Карта.
 * 
 * Отвечате за отрисовку карты, точек на карте и соединительных линей между точками
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ymaps from 'ymaps';
let ymapsLibrary = null;

export default class MapBox extends PureComponent {
  static propTypes = {
    setMapRef: PropTypes.func.isRequired,
    setPointCoords: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      mapInstance: null
    }

    this.geoObjects = null;
  }

  componentDidMount() {
    this.mapLoadPromise = ymaps.load("https://api-maps.yandex.ru/2.1?apikey=08a305f9-ac0f-404b-aad1-e079ec120958&lang=ru_RU")
      .then(maps => {
        ymapsLibrary = maps;
        const mapInstance = new ymapsLibrary.Map(this.mapRef.current, {
          center: [55.76, 37.64],
          zoom: 12,
          controls: []
        });

        this.setState({
          mapInstance
        });

        this.props.setMapRef(mapInstance);
      })
  }

  componentDidUpdate() {
    let points = this.props.points;
    if (this.state.mapInstance) {
      this.geoObjects = this.geoObjects || new ymapsLibrary.GeoObjectCollection();
      this.geoObjects.removeAll();
      for (let point of points) {
        let placemark = this.createPlaceMark(point);
        this.geoObjects.add(placemark);
      }

      if (points.length > 1) {
        let pointsCoords = points.map(point => [point.x, point.y]);
        let polyline = this.createPolyline(pointsCoords);
        this.geoObjects.add(polyline);
      }

      this.state.mapInstance.geoObjects.add(this.geoObjects);
    }
  }

  createPlaceMark(point) {
    let geoObject = new ymapsLibrary.Placemark([point.x, point.y], {
      id: point.id,
      balloonContent: point.name
    }, {
        draggable: true
      });

    geoObject.events.add('dragend', (event) => {
      let geoObject = event.originalEvent.target;
      let geoObjectId = geoObject.properties.get('id');
      let [x, y] = geoObject.geometry.getCoordinates();
      this.props.setPointCoords(geoObjectId, x, y);
    });

    return geoObject;
  }

  createPolyline(coords) {
    let geoObject = new ymapsLibrary.Polyline(coords);
    return geoObject;
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: '100%'
    };

    return <div style={mapStyle} ref={this.mapRef}></div>
  }

}