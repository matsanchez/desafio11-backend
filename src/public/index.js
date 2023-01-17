import { loadProducts, addProduct, addMessage, loadMessages, onUpdateProduct } from "./socket.js";
import { renderProducts, appendProduct, appendMessage, renderMessages, fillFormUpdate } from "./ui.js";

loadProducts(renderProducts);
addProduct(appendProduct);
addMessage(appendMessage);
onUpdateProduct(fillFormUpdate);
loadMessages(renderMessages);
