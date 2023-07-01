import {
  ClassNameGenerator_default,
  createBox,
  createTheme_default,
  identifier_default
} from "./chunk-PYV2IS5X.js";
import {
  require_prop_types
} from "./chunk-ZBRVLQEX.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/@mui/material/Box/Box.js
var import_prop_types = __toESM(require_prop_types());
var defaultTheme = createTheme_default();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme,
  defaultClassName: "MuiBox-root",
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;

export {
  Box_default
};
//# sourceMappingURL=chunk-XLPBUJRX.js.map
