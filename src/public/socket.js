const socket = io();

/* Mensajes Sockets cliente/servidor de Productos */
export const loadProducts = (callback) => {
  socket.on("server:loadProducts", callback);
};

export const setProduct = (obj) => {
  socket.emit("client:newProduct", obj);
};

export const addProduct = (callback) => {
  socket.on("server:newProduct", callback);
};

export const deleteProduct = (id) => {
  socket.emit("client:deleteProduct", id);
};

export const updateProduct = (id) => {
  socket.emit("client:updateProduct", id);
};

export const onUpdateProduct = (callback) => {
  socket.on("server:updateProduct", callback);
};

export const sendUpdateProduct = (prod) => {
  socket.emit("cliente:sendUpdateProduct", prod);
};
/* Mensajes Sockets cliente/servidor de Chat de Mensajes */
export const loadMessages = (callback) => {
  socket.on("server:loadMessages", callback);
};

export const setMessage = (obj) => {
  socket.emit("client:newMessage", obj);
};

export const addMessage = (callback) => {
  socket.on("server:newMessage", callback);
};
