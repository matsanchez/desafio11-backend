import { deleteProduct, updateProduct, setProduct, setMessage, sendUpdateProduct } from "./socket.js";

const DOMlistProducts = document.getElementById("listProducts");
const DOMroomChat = document.getElementById("roomChat");
const DOMinputName = document.getElementById("name");
const DOMinputPrice = document.getElementById("price");
const DOMinputThumbnail = document.getElementById("thumbnail");
const DOMform = document.getElementById("formAdd");
const DOMchat = document.getElementById("formChat");
DOMform.addEventListener("submit", (e) => productHandleSubmit(e, e.target));
DOMchat.addEventListener("submit", (e) => chatHandleSubmit(e, e.target));

let idUpdate = "";
export const productHandleSubmit = (e, form) => {
  e.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  if (idUpdate) {
    formData.append("id", idUpdate);
    formData.forEach((value, key) => (obj[key] = value));
    sendUpdateProduct(obj);
    DOMform.reset();
  } else {
    formData.forEach((value, key) => (obj[key] = value));
    setProduct(obj);
    DOMform.reset();
  }
};
export const chatHandleSubmit = (e, form) => {
  e.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  let message = { ...obj, date: new Date().toLocaleString() };
  setMessage(message);
  document.getElementById("textarea").value = "";
};

const productUI = (product) => {
  const tr = document.createElement("tr");
  tr.classList.add("align-middle");
  tr.innerHTML = `
                  <td colspan="3">${product.name}</td>
                  <td colspan="3">${product.price}</td>
                  <td colspan="2"><img src=${product.thumbnail} class="img-thumbnail shadow-sm" width="80" height="80" alt=${product.name}></td>
                  <td colspan="1"><div class="d-flex flex-column"><button class="delete m-1 btn btn-sm btn-danger" data-id=${product.id}>Borrar</button>
                  <button class="update m-1 btn btn-sm btn-success" data-id=${product.id}>Actualizar</button></div></td>
                `;
  const btnDelete = tr.querySelector(".delete");
  const btnUpdate = tr.querySelector(".update");
  btnDelete.addEventListener("click", (e) => deleteProduct(e.target.dataset.id));
  btnUpdate.addEventListener("click", (e) => updateProduct(e.target.dataset.id));
  return tr;
};

export const renderProducts = (products) => {
  DOMlistProducts.innerHTML = "";
  if (products.length === 0) {
    const empty = document.createElement("tr");
    empty.classList.add("empty");
    empty.innerHTML = `
                        <th colspan="12">
                            <h5 class="p-3 text-center">No hay productos en la lista</h5>
                        </th>
                      `;
    DOMlistProducts.appendChild(empty);
  }
  products.forEach((product) => {
    DOMlistProducts.append(productUI(product));
  });
};

export const appendProduct = (product) => {
  if (!!document.querySelector(".empty")) {
    document.querySelector(".empty").remove();
  }
  DOMlistProducts.append(productUI(product));
};

export const fillFormUpdate = (prodId) => {
  DOMinputName.value = prodId.name;
  DOMinputPrice.value = prodId.price;
  DOMinputThumbnail.value = prodId.thumbnail;
  idUpdate = prodId.id;
};

const messageUI = (message) => {
  const li = document.createElement("li");
  li.classList.add("bg-light", "p-1", "list-unstyled");
  li.innerHTML = `
                  <strong class="text-primary">${message.email}</strong>:
                  <strong class="text-danger">[${message.date}]</strong>
                  <em class="text-success">:${message.text}</em>
                  `;
  return li;
};

export const renderMessages = (messages) => {
  messages.forEach((message) => {
    DOMroomChat.append(messageUI(message));
  });
};

export const appendMessage = (message) => {
  DOMroomChat.append(messageUI(message));
};
