const { request, response } = require("express");

const todoGet = async (req = request, res = response) => {
  res.json({ test: "GET OK" });
};

const todoPost = async (req = request, res = response) => {
  res.json({ test: "POST OK" });
};

const todoPut = async (req = request, res = response) => {
  res.json({ test: "PUT OK" });
};

const todoDelete = async (req = request, res = response) => {
  res.json({ test: "DEL OK" });
};

module.exports = {
  todoGet,
  todoPost,
  todoPut,
  todoDelete
};
