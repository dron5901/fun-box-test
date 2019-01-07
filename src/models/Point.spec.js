import Point from './Point';

it('Точка должна быть создана', () => {
  let point = new Point('test-point', 1, 2, 0);
  expect(point.hasOwnProperty('id')).toEqual(true);
  expect(point.x).toEqual(1);
  expect(point.y).toEqual(2);
  expect(point.position).toEqual(0);
});