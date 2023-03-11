import '../style/main.scss';



let itens;
let id;

const getItensLS = () => JSON.parse(localStorage.getItem("itens")) ?? [];
const setItensLS = () => localStorage.setItem("itens", JSON.stringify(itens));

