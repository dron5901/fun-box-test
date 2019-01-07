import React from 'react';
import { shallow } from 'enzyme';
import MapProvider from './MapProvider';

it('Начальное состояние MapProvider должны быть points = [], mapInstance = null', () => {
  let provider = shallow(<MapProvider />);
  expect(provider.state('points')).toEqual([]);
  expect(provider.state('mapInstance')).toEqual(null);
});

it('Инстанс карты не должен быть равен нулю', () => {
  let provider = shallow(<MapProvider />);
  provider.instance().setMapRef({
    map: 'map1',
    properties: {},
    options: {}
  });

  expect(provider.state('mapInstance')).not.toEqual(null);
  expect(provider.state('mapInstance').map).toEqual('map1');
});

it('Должна добавиться одна точка с наименованием point1', () => {
  let provider = shallow(<MapProvider />);
  provider.setState({
    mapInstance: {
      getCenter: () => [1, 1]
    }
  });

  provider.instance().createPoint('point1');
  expect(provider.state('points').length).toEqual(1);
  expect(provider.state('points')[0].name).toEqual('point1');
});

it('Должна удалиться точка с id="1"', () => {
  let provider = shallow(<MapProvider />);
  provider.setState({
    points: [
      { id: '0', name: 'point1', x: 1, y: 1, position: 0 },
      { id: '1', name: 'point2', x: 2, y: 2, position: 1 },
      { id: '2', name: 'point3', x: 3, y: 3, position: 2 },
    ]
  });

  let points = provider.state('points');
  expect(points.length).toEqual(3);
  provider.instance().removePoint("1");
  points = provider.state('points');
  expect(points.length).toEqual(2);
  let point = points.find(p => p.id === '1');
  expect(point).toEqual(undefined)
});

it('Точка должна переместится в координаты 5, 6', () => {
  let provider = shallow(<MapProvider />);
  provider.setState({
    points: [
      { id: '0', name: 'point1', x: 1, y: 1, position: 0 }
    ]
  });

  provider.instance().setPointCoords("0", 5, 6);
  expect(provider.state("points")[0].x).toEqual(5);
  expect(provider.state("points")[0].y).toEqual(6);
});

it('Точка должна переместится из позиции 2 в 0', () => {
  let provider = shallow(<MapProvider />);
  provider.setState({
    points: [
      { id: '0', name: 'point1', x: 1, y: 1, position: 0 },
      { id: '1', name: 'point2', x: 2, y: 2, position: 1 },
      { id: '2', name: 'point3', x: 3, y: 3, position: 2 },
    ]
  });

  let points = provider.state('points');
  expect(points[0].id).toEqual('0');
  provider.instance().updatePointsPosition(points, 2, 0);
  points = provider.state('points');
  expect(points[0].id).toEqual('2');
});
