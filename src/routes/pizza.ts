// require the express module
import express from "express";
import Pizza from "../models/Pizza";

// create a new Router object
const pizzaRouter = express.Router();

export default pizzaRouter;

pizzaRouter.get("/", (req, res) => {
  res.render("homepage");
});

const specialtyPizzas: Pizza[] = [
  {
    name: "Anchovy Lover's",
    price: 15.0,
  },
  {
    name: "Paleo Pizza",
    price: 12.0,
  },
  {
    name: "Dessert Pizza",
    price: 9.0,
  },
];

pizzaRouter.get("/specialty", (req, res) => {
  const { name, price } = req.query;
  res.render("specialty", { name, price });
});

// const reviewForm = document.querySelector(".review-form");

pizzaRouter.get("/review", (req, res) => {
  res.render("review");
});

pizzaRouter.get("/thanks", (req, res) => {
  const { name, comment, rating } = req.query;
  res.render("thanks", { name, comment, rating });
});

pizzaRouter.get("/custom", (req, res) => {
  res.render("custom");
});

pizzaRouter.get("/your-pizza", (req, res) => {
  let size: string = req.query.size as string;
  let toppings: number = parseInt(req.query.toppings as string);
  let glutenfree: boolean = (req.query.glutenfree as string) === "on";
  let instructions: string = req.query.instructions as string;
  let price: number = 0;
  let freeDelivery: string = "";
  if (size === "small") {
    price += 7 + toppings * 0.5;
  } else if (size === "medium") {
    price += 10 + toppings * 1;
  } else {
    price += 12 + toppings * 1.25;
  }
  if (glutenfree) {
    price += 2;
  }
  if (price >= 15) {
    freeDelivery =
      "Because your order meets the $15.00 minimum, you get FREE DELIVERY!";
  }
  res.render("your-pizza", {
    size,
    toppings,
    glutenfree,
    instructions,
    price,
    freeDelivery,
  });
});
