require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/recipe";
import List from "./model/list";
import * as listView from "./view/listView";
import Like from "./model/like";
import * as LikeView from "./view/likeView";
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
    renderRecipe(state.recipe, state.likes.isLiked(id));
  }
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

window.addEventListener("load", (e) => {
  // Shineer like model app achaalagdahad uusgene
  if (!state.likes) state.likes = new Like();
  // Like tses gargah eseh shiideh
  LikeView.toggleLikeMenu(state.likes.getNumberOfLikes());
  // Likeuud baival tedgeeriig tsesen nemj haruulna
  state.likes.likes.forEach((like) => LikeView.renderLike(like));
});

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

const controlLike = () => {
  // 1. Like iin modeliig uusgene.
  if (!state.likes) state.likes = new Like();
  // 2. Odoo haragdaj baiga joriin ID olj avah
  const currentRecipeID = state.recipe.id;
  // 3. Ene joriig likelsan esehiig shalgah
  if (state.likes.isLiked(currentRecipeID)) {
    state.likes.deleteLike(currentRecipeID);
    //like iin tsesnees ustgana
    LikeView.deleteLike(currentRecipeID);
    // b
    LikeView.toggleLikeBtn(false);
  } else {
    // like nemeh

    const newLike = state.likes.addLike(
      currentRecipeID,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    LikeView.renderLike(newLike);
    LikeView.toggleLikeBtn(true);
  }

  LikeView.toggleLikeMenu(state.likes.getNumberOfLikes());
  // 4. Likelsan bol like tovch darah uyd like boliulna.
  // 5. likelagui bol likelna
};

elements.recipeDev.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__btn, .recipe__btn * ")) {
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

elements.shoppingList.addEventListener("click", (e) => {
  console.log("asd");
});
