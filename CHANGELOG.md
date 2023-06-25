# Changelog

## 1.0.1

- Fix: Changes to interval, refresh limit, or key indicate a reset of the
  interval.

## 1.0.0

- **BREAKING CHANGE** - Parameters outside of `interval` have moved to
  keyword-only parameters.
- Added `debounce` parameter that delays refresh when user interaction occurs.
  Defaults to `True` to mimic original behavior
