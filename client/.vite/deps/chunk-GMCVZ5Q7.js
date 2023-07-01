import {
  createStyled,
  defaultTheme_default,
  identifier_default,
  shouldForwardProp,
  useThemeProps
} from "./chunk-PYV2IS5X.js";

// node_modules/@mui/material/styles/styled.js
var rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
var slotShouldForwardProp = shouldForwardProp;
var styled = createStyled({
  themeId: identifier_default,
  defaultTheme: defaultTheme_default,
  rootShouldForwardProp
});
var styled_default = styled;

// node_modules/@mui/material/styles/useThemeProps.js
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme: defaultTheme_default,
    themeId: identifier_default
  });
}

export {
  rootShouldForwardProp,
  slotShouldForwardProp,
  styled_default,
  useThemeProps2 as useThemeProps
};
//# sourceMappingURL=chunk-GMCVZ5Q7.js.map
