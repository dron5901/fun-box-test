/**
 * Компонент создания новой точки
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class PointInput extends PureComponent {
  static propTypes = {
    createPoint: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      pointName: ''
    };

    this.createPoint = this.createPoint.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Создание новой точки.
   * 
   * @param {Event} event. Событие отправки формы. 
   */
  createPoint(event) {
    event.preventDefault();
    let pointName = this.state.pointName.trim();
    if (pointName) {
      this.props.createPoint(pointName);
      this.setState({
        pointName: ''
      });
    }
  }

  /**
   * Установить значение в поле ввода
   * 
   * @param {Event} event. Событие изменение значения поля ввода
   */
  handleChange(event) {
    let pointName = event.target.value;
    this.setState({
      pointName: pointName
    });
  }

  render() {
    let value = this.state.pointName;
    return (
      <form onSubmit={this.createPoint}>
        <input
          onChange={this.handleChange}
          type="text"
          className="point-input"
          value={value}
          placeholder="Введите наименование точки"
        />
      </form>
    )
  }
} 
