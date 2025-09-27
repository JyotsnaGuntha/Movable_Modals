# Movable Modals - Bug Fixes

This project contains fixes for issues found in the Movable Modals implementation.


## Fixes Implemented

### 1. Drag Latency
- **Cause**  
  - Continuous `setState` re-renders during mouse move.  
  - Tailwind `transition-all` causing animation lag.  

- **Fix**  
  - Direct DOM updates with `style.left` / `style.top` instead of React state.  
  - Disable transitions on `mousedown`, re-enable on `mouseup`, then sync final position to state.  


### 2. Modal Tilt on Drag
- **Cause**  
  - Tailwind class `rotate-1` applied while dragging.  

- **Fix**  
  - Removed `rotate-1` to prevent unwanted rotation.  


### 3. Already-Open Modal Not Activated
- **Cause**  
  - Clicking button for an already-open modal didn’t re-render (`true → true`).  
  - No direct communication between `App.jsx` and `MovableModal.jsx`.  

- **Fix**  
  - Export/import shared `modalInstances`.  
  - Expose each modal’s `bringToFront()` function.  
  - Update `openModal` in `App.jsx` to call `bringToFront()` if modal already exists.  
  - Align `id` props between `App.jsx` and `MovableModal.jsx`.  


## Result
-  Smooth, responsive dragging.  
-  No unwanted tilt.  
-  Correct modal activation/stacking when re-opened.  
