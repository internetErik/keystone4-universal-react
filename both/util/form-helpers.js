
/**
 * Sets all fields to dirty
 *
 * @param  {Object} initialDirty All the dirty flags so we can set them all false
 * @return {Object}              An object containaining all dirty flags set to false
 */
export const getDirtyFields = initialDirty =>
  Object.keys(initialDirty).reduce((acc, key) => acc = { ...acc, [key]: true}, {})

/**
 * Checks to see if there are errors in a form
 *
 * @param  {Object} initialErrors All the errors, so we can look up what the current state is
 * @param  {Object} state         The state of the form
 * @return {Boolean}              True if there is an error, false if there is no error
 */
export const formHasErrors = (initialErrors, state) =>
  Object.keys(initialErrors).reduce((acc, key) => acc || state[key], false)
