'use strict';
const { Model } = require('sequelize');

// todoモデルをモジュール化している
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
      static getAllTodo() {
          this.findAll().then((todoList) => todoList);
      };

      static getTodo(id) {

      };

      static addTodo(params) {

      };

      static updateTodo(params) {

      };

      static deleteTodo(id) {

      };
  };
  
  Todo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    modelName: 'Todo',
  });
  return Todo;
};



