import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen')

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

export {
 width,
 height,
 OVERFLOW_HEIGHT,
 SPACING,
 ITEM_WIDTH,
 ITEM_HEIGHT,
 VISIBLE_ITEMS
}