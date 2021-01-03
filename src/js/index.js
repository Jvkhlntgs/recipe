require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";

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
  const query = searchView.getInput();

  if (query) {
    //2.Shineer hailtiin object uusgej ogno
    state.search = new Search(query);
    //3.Hailt hiihed zoriuljdelgetsiin ui beldene
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //4.Hailtiig guitsetgene
    await state.search.doSearch();
    //5.Hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Ийм хоол олдсонгүй");
    else searchView.renderRecipes(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controllSearch();
});
