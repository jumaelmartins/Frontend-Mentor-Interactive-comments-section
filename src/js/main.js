import "../style/main.scss";
import { getData } from "./comments";
const comments = document.querySelector(".comments");
const form = document.querySelector("form");

let itens;
let id;

const getItens = () => JSON.parse(localStorage.getItem("comments"));
const setItens = () => localStorage.setItem("comments", JSON.stringify(itens));

itens = await getData();

console.log(itens);

setItens();

form.innerHTML = `
<input type="text" placeholder="Add comment" name="" id="" cols="30" rows="10"></input>
      <fieldset>
        <img width="32" src="${itens.currentUser.image.webp}" alt="">
        <button type="submit">send</button>
      </fieldset>
`;

const insertComment = () => {
  itens.comments;
};
