import UrlParser from '../../routes/url-parser';
import RestaurantResource from '../../data/restaurant-resource';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const rest = await RestaurantResource.detailRestaurant(url.id);
    const movieContainer = document.querySelector('#restaurant');
    movieContainer.innerHTML = createRestaurantDetailTemplate(rest.restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: rest.restaurant.id,
        name: rest.restaurant.name,
        rating: rest.restaurant.rating,
        pictureId: rest.restaurant.pictureId,
        city: rest.restaurant.city,
        description: rest.restaurant.description,
      },
    });
  },
};

export default Detail;
