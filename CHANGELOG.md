# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-02-07

### Fixed
- **Issue #24**: Fixed incorrect spacing and zero-padding on last line when displaying data with incomplete byte groups (dangling bytes)
  - Hex and binary radixes now show correct width (e.g., `7d` instead of `007d`)
  - Octal and decimal radixes now properly calculate width based on actual byte count
  - ASCII column is now properly aligned on lines with dangling bytes
- Improved alignment for all radixes (hex, binary, octal, decimal) when handling incomplete groups

### Deprecation - possibly upcoming ... BREAKING CHANGES
- **API Parameter Renaming** - Parameters have been renamed for consistency:
  - `width` → `bytesPerLine` (numeric)
  - `format` → `bytesPerGroup` (numeric: 0, 1, 2, 4, 8)
  - `numbering` → `showAddress` (boolean)
  - `display_offset` → `displayOffset` (camelCase)
- **String-based format removed** - `format` parameter no longer accepts string values like "twos", "fours", etc. Use numeric `bytesPerGroup` instead
- **maxnumberlen export deprecated** - `maxnumberlen` is an internal helper and will be removed in a future release

### Added
- **ES Module Support** - Converted to native ES modules (ESM) for universal compatibility:
  - Works in Node.js 14+ (with `"type": "module"`)
  - Works natively in Deno  
  - Works in modern browsers with `<script type="module">`
  - No wrapper files needed - direct imports from hexy.js
- **Backward Compatibility Layer** - Old parameter names are still supported and automatically mapped to new ones:
  - `width` (deprecated, use `bytesPerLine`)
  - `format` (deprecated, use `bytesPerGroup`)
  - `numbering` (deprecated, use `showAddress`)
  - `display_offset` (deprecated, use `displayOffset`)
- TypeScript definitions include `@deprecated` annotations for old parameters
- Documentation clearly marks deprecated parameters
- 25 new test cases (92 total tests, up from 67)
- Test cases specifically for issue #24 with hex, octal, decimal, and binary radixes
- Better Uint8Array handling in buffer conversion

### Documentation
- Updated README with new API parameter names
- Added deprecated parameter documentation
- Synchronized README and hexy.js inline documentation
- Added rom-p to contributors for fixing issue #24

### Internal
- Improved code structure and consistency
- Enhanced view.html hex viewer
- Updated CLI tool (hexy_cmd.js)

## [0.3.5] - (Previous release)

See git history for changes in previous versions.
