# Flipbook layout corrections

## Goal

Refine the Couture flipbook so the book and its controls feel visually balanced on desktop and mobile, while preserving the existing Turn.js page geometry and interactions.

## Design

- Center the complete book stage in the viewport in both closed and open states.
- Keep the navigation controls immediately below the book with a small, consistent gap.
- Prevent horizontal browser overflow while pages are turning on mobile devices.
- Use `#ab8944` for text-link hover states throughout the flipbook.
- Keep the initial closed-book presentation and force its first cover to turn as a rigid Turn.js page rather than bend like paper.

## Implementation approach

Retain the fixed 926-by-650 Turn.js geometry. Scale and center its containing stage responsively, constrain overflow at the viewport and stage boundaries, adjust the controls' spacing in the existing responsive layout, and explicitly set the first Turn.js page to hard-cover behavior during initialization.

## Verification

Test the initial closed cover, first page turn, intermediate spreads, and navigation placement at desktop, mobile portrait, and mobile landscape viewport sizes. Confirm that page-turn animations do not create a horizontal scrollbar and that hover colors are consistent.
