require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import List from "./model/list";
import * as listView from "./view/listView";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectedRecipe,
} from "./view/recipeView";

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

elements.pageButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");

  if (btn) {
    const gotoPageNumber = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, gotoPageNumber);
  }
});

/**
 *  Joriin controller
 */
const controlRecipe = async () => {
  // 1. URL aas id salgaj avchirah
  const id = window.location.hash.replace("#", "");
  if (id) {
    // 2. Joriin model uusgeh
    state.recipe = new Recipe(id);
    // 3.UI buyu delgets beltgeh
    clearRecipe();
    renderLoader(elements.recipeDev);
    highlightSelectedRecipe(id);
    // 4. Joroo tataj avchrah
    await state.recipe.getRecipe();
    // 5. Joriig guitsetgeh hugatsaa bolon ortsiig tootsoolno
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6. Joriig delgetsend gargana
    renderRecipe(state.recipe);
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

/**
 * Nairlaga controller
 */

const controlList = () => {
  state.list = new List();
  listView.clearItems();
  state.recipe.ingredients.forEach((n) => {
    state.list.addItem(n);
    listView.renderItem(n);
  });
};

elements.recipeDev.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn * ")) {
    controlList();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  console.log("asd");
});
