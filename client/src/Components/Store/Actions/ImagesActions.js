import Types from "./Types/Images";

/**
 * Return an action to add a new image post to the global context
 * @param {Object} payload The image information
 * @param {Number} payload._id The image id
 * @param {Array.<String>} payload.tags The image tags
 * @param {Array.<Object>} payload.comments The comments image
 * @param {String} payload.url_image The image url
 * @param {String} payload.name The author name
 * @param {String} payload.title The image title
 */
export function addImageAction(payload) {
  return {
    payload,
    type: Types.ADD_IMAGE,
  };
}

export function toggleFavoriteImageAction(payload) {
  return {
    payload,
    type: Types.TOGGLE_FAVORITE_IMAGE,
  };
}

export function setFavoriteImagesAction(payload) {
  return {
    payload,
    type: Types.SET_FAVORITE_IMAGES,
  };
}

/**
 * Return an action to delete an images post to the global context
 * @param {Number} payload The id image
 */
export function removeImageAction(payload) {
  return {
    payload,
    type: Types.REMOVE_IMAGE,
  };
}

/**
 * Return an action to update an images post to the global context
 * @param {Object} payload The object image
 * @param {Number} payload.imageId The image id for update
 * @param {String} payload.title The updated title
 * @param {Array} payload.tags The updated tags
 */
export function updateImageAction(payload) {
  return {
    payload,
    type: Types.UPDATE_IMAGE,
  };
}

/**
 * Return an action to find images post to the global context
 * @param {Number} payload The text for find
 */
export function searchImagesAction(payload) {
  return {
    payload,
    type: Types.SEARCH_IMAGES,
  };
}

/**
 * Return an action to set all images post to the global context
 * @param {Array.<Object>} payload The image array
 */
export function setImagesAction(payload) {
  return {
    payload,
    type: Types.SET_IMAGES,
  };
}

/**
 * Return an action to add a new comment into an image post to the global context
 * @param {Object} payload The image comment information
 * @param {Number} payload._id The comment id
 * @param {String} payload.content The comment content
 * @param {Object} payload.image_id The image id of the comment
 * @param {Number} payload.user The user id
 */
export function addCommentImagesAction(payload) {
  return {
    payload,
    type: Types.ADD_COMMENT_IMAGES,
  };
}

/**
 * Return an action to remove a comment into an image post to the global context
 * @param {Object} payload The image comment information
 * @param {Number} payload.imageId The image id to remove the comment
 * @param {String} payload.commentId The id comment to remove
 */
export function removeCommentImagesAction(payload) {
  return {
    payload,
    type: Types.REMOVE_COMMENT_IMAGES,
  };
}

/**
 * Return an action to edit a comment into an image post to the global context
 * @param {Object} payload The image comment information
 * @param {Number} payload.imageId The image id to remove the comment
 * @param {String} payload.commentId The id comment to remove
 * @param {String} payload.commentContent The new content to edit into comment
 */
export function editCommentImagesAction(payload) {
  return {
    payload,
    type: Types.EDIT_COMMENT_IMAGES,
  };
}
