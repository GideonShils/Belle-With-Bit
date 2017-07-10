
/**
 * # RatingConfig
 * In the Rating component the focus style is not applied in case the component is focused on by a touch or click event. This default behaviour can be deactivated by setting `preventFocusStyleForTouchAndClick` to false
 * 
 * ```js
 * import RatingConfig from 'bit/config/rating-config';
 * 
 * RatingConfig.preventFocusStyleForTouchAndClick = false;
 * ```
 * For extended information see the Belle [documentation](http://nikgraf.github.io/belle/#/configuration?_k=pbr5zm)
 * @bit
 */

const ratingConfig = {
  preventFocusStyleForTouchAndClick: true,
};

export default ratingConfig;