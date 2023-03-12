import "../style/main.scss";
import { getData } from "./comments";
const comments = document.querySelector(".comments");
const form = document.querySelector("form");

let itens;
let id;

itens = getData();

const getItens = () => JSON.parse(localStorage.getItem("comments"));
const setItens = async () =>
  localStorage.setItem("comments", JSON.stringify(await itens));

const loadItens = async () => {
 
  comments.innerHTML = "";
 
  itens =  getItens();
  console.log(await itens)
  console.log(getItens())

  itens.comments.forEach((comment) => {
    if (comment.replies.length === 0) {
      if (comment.user.username === itens.currentUser.username) {
        comments.innerHTML += `
        <li id="${comment.id}" class="autorComment">
        <div class="comment">
              <div class="vote">
                <button class="downVote">-</button>
                <p>${comment.score}</p>
                <button class="upVote">+</button>
              </div>
              
              
              <div class="commentContainer">
                  <div class="commentHeader"><div><img width="32" src="${comment.user.image.webp}" alt="avatar user"> <b>${comment.user.username}<b>you</b> </b> <p>${comment.createdAt}</p></div>
                  </div>

                  <div class="reply">
                        <img src="./src/images/icon-edit.svg" alt="edit icon">
                        <p class="edit">edit</p>
                        <img src="./src/images/icon-delete.svg" alt="reply icon">
                        <p class="delete">delete</p></div>
                   </div>
                   <p>${comment.content}</p>
              </div>
              </div>
            </li>

        `;
      } else {
        comments.innerHTML += `
                        <li id="${comment.id}">
                        <div class="comment"> 
                            <div class="vote">
                            <button class="downVote">-</button>
                            <p>${comment.score}</p>
                            <button class="upVote">+</button>
                            </div>
                        
                        
                            <div class="commentContainer">
                            <div class="commentHeader">
                                <div><img width="32" src="${comment.user.image.webp}" alt="avatar user"> <b>${comment.user.username}</b> <p>${comment.createdAt}</p></div>
                                <div class="reply"><img src="./src/images/icon-reply.svg" alt="reply ivon"> <p>reply</p></div>
                            </div>
                        
                            <p>${comment.content}</p>
                            </div>
                        </div>
                        </li>
                        `;
      }
    }

    if (comment.replies.length > 0) {
      comments.innerHTML += `
                    <li id="${comment.id}">
                        <div class="comment"> 
                            <div class="vote">
                            <button class="downVote">-</button>
                            <p>${comment.score}</p>
                            <button class="upVote">+</button>
                            </div>
                    
                            <div class="commentContainer">
                            <div class="commentHeader">
                                <div><img width="32" src="${comment.user.image.webp}" alt="avatar user"> <b>${comment.user.username}</b> <p>${comment.createdAt}</p></div>
                                <div class="reply"><img src="./src/images/icon-reply.svg" alt="reply ivon"> <p>reply</p></div>
                            </div>
                        
                            <p>${comment.content}</p>
                            </div>
                        </div>
                        </li>
                        `;

      comment.replies.forEach((replie) => {
        if (replie.user.username === itens.currentUser.username) {
          const li = document.getElementById("2");

          if (li.id == comment.id) {
            li.innerHTML += `
            <div class="replies">
            <ol class="repliedComments">
            <li class="autorComment">
              <div class="vote">
                <button class="downVote">-</button>
                <p>${replie.score}</p>
                <button class="upVote">+</button>
              </div>
              
              
              <div class="commentContainer">
                  <div class="commentHeader"><div><img width="32" src="${replie.user.image.webp}" alt="avatar user"> <b>${replie.user.username}<b>you</b> </b> <p>${replie.createdAt}</p></div>
                  </div>

                  <div class="reply">
                        <img src="./src/images/icon-edit.svg" alt="edit icon">
                        <p class="edit">edit</p>
                        <img src="./src/images/icon-delete.svg" alt="reply icon">
                        <p class="delete">delete</p></div>
                   </div>
                   <p>${replie.content}</p>
              </div>
            </li>

          </ol>
        </div>
            `;
          }
        } else {
          const li = document.getElementById("2");

          if (li.id == comment.id) {
            li.innerHTML += `
                
                <div class="replies">
                    <ol class="repliedComments">
                    <li>
                        <div class="vote">
                            <button class="downVote">-</button>
                            <p>${replie.score}</p>
                            <button class="upVote">+</button>
                        </div>

                        <div class="commentContainer">
                            <div class="commentHeader">
                            <div><img width="32" src="${replie.user.image.webp}" alt="avatar user"> <b>${replie.user.username}</b> <p>1m ago</p></div>
                            <div class="reply"><img src="./src/images/icon-reply.svg" alt="reply ivon"> <p>reply</p></div>
                            </div>
                            <p>${replie.content}</p>
                        </div>
                        </li>
                </ol>
             </div>
         `;
          }
        }
      });
    }
  });
};

const insertComment = async () => {
  window.addEventListener("load", (e) => {
    const input = document.querySelector("input");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      id = (await itens).comments.length;
      let comment = {
        id: id + 1,
        content: `${input.value}`,
        createdAt: "1 month ago",
        score: 0,
        user: {
          image: {
            png: `${(await itens).currentUser.image.png}`,
            webp: `${(await itens).currentUser.image.webp}`,
          },
          username: `${(await itens).currentUser.username}`,
        },
        replies: [],
      };
      itens = getItens();
      itens.comments.push(comment);
      console.log(itens.comments);
      setItens();
      loadItens();
    });
  });
};

const showForm = async () => {
  form.innerHTML = `
  <input type="text" placeholder="Add comment" name="" id="" cols="30" rows="10"></input>
  <fieldset>
  <img width="32" src="${(await itens).currentUser.image.webp}" alt="">
  <button type="submit">send</button>
  </fieldset>
`;
};
const init = async () => {
  if (!getItens()) {
    setItens();
  }
  showForm();
  insertComment();
  loadItens();
};
init();
