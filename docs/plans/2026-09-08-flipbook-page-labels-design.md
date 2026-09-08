# Flipbook page-label corrections

## Goal

Keep page numbers visible while ensuring that no page number or modal close label appears outside the book unintentionally.

## Design

- Position each page counter at the bottom center of its visible page, between the two decorative ornaments.
- Keep the existing JavaScript numbering offset and page-turn synchronization.
- Hide empty counters automatically on cover and non-numbered views.
- Correct malformed modal markup so every close button remains inside its modal and is invisible while that modal is closed.
- Verify closed, open, and turning states at desktop and mobile viewport sizes.
