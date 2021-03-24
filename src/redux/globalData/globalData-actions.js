import { createAction } from "@reduxjs/toolkit";

const createErrorText = createAction('globalData/createErrorText');
const deleteErrorText = createAction('globalData/deleteErrorText');

const globalDataActions = {
  createErrorText,
  deleteErrorText,
}

export default globalDataActions;