import Search from "./model/search";

/**
 * Web app tulu
 * Hailtiin query, ur dun
 * Tuhain uzuulj bui jor
 * Likelsan joruud
 * Zahialj baigaa joriin nairlaguud
 */

const state = {};

const controllSearch = async () => {
  //1. Webees hailtiin tulhuur ugiig avna
  const query = "pizza";

  if (query) {
    //2.Shineer hailtiin object uusgej ogno
    state.search = new Search(query);
    //3.Hailt hiihed zoriuljdelgetsiin ui beldene
    //4.Hailtiig guitsetgene
    await state.search.doSearch();
    //5.Hailtiin ur dung delgetsend uzuulne
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controllSearch();
});
