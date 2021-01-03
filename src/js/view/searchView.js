import { elements } from "./base";

/*
image_url: "http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg"
publisher: "Two Peas and Their Pod"
publisher_url: "http://www.twopeasandtheirpod.com"
recipe_id: "54388"
social_rank: 99.99999665701256
source_url: "http://www.twopeasandtheirpod.com/avocado-pita-pizza-with-cilantro-sauce/"
title: "Avocado Pita Pizza with Cilantro Sauce"
*/

//Private functionshuu
const renderRecipe = (recipe) => {
  //   console.log(recipe);
  const markup = `
  <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${recipe.title}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
  `;
  //ul ruu nemelt
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};

export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};

export const getInput = () => elements.searchInput.value;

export const renderRecipes = (recipes, page = 1, resPerPage = 10) => {
  // Hailtiin ur dung huudaslaj uzuullee.

  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  // Huudaslaltiin tovchuudig gargaj ireh
  const totalPages = Math.ceil(recipes.length / resPerPage);
  renderButtons(page, totalPages);
};

const createBtn = (
  page,
  type,
  direction
) => `<button class="btn-inline results__btn--${type}" data-goto = ${page}>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direction}"></use>
  </svg>
  <span>Хуудас ${page}</span>
  </button>`;

const renderButtons = (page, totalPages) => {
  let button;
  if (page === 1 && totalPages > 1) {
    // 1-r huudsan deer baina 2r huudas gdg tovchiig gargah
    button = createBtn(2, "next", "right");
  } else if (page < totalPages) {
    // Dund bgaa huudsnuudin neg bn. Umnuh bolon daraachin huudasruu shiljeh tovchuudig uzuul.
    button = createBtn(page - 1, "prev", "left");
    button += createBtn(page + 1, "next", "right");
  } else if (page === totalPages) {
    // Hamgiin suuliin huudas deer baina. Umnuh huudasruu shiljuuleh tovch uzuuleh
    button = createBtn(page - 1, "prev", "left");
  }

  elements.pageButtons.insertAdjacentHTML("afterbegin", button);
};
