export default {
  // The current combined in-render DRC pass does not terminate for this dense
  // eight-layer board. CI runs each required tsci check independently instead.
  platformConfig: {
    drcChecksDisabled: true,
  },
}
