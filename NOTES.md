# Design Notes

## Approach

I started by focusing on the core product flow: a simple Table view and Board view using fictional contact data. Once the basic views were working, I introduced a shared `ContactProvider` using React Context so both views could work from the same contact state.

The next major focus was the details panel and the editing flow for Stage and Notes. Once the core functionality and state synchronization were in place, I moved on to visual polish, accessibility, and the final handoff work.

The implementation was intentionally prioritized around functionality first, followed by UI refinement.

### Design Choices

- **shadcn/ui + Tailwind CSS:** I used shadcn/ui to get a consistent, well-structured component system while retaining control over the styling. It also works naturally with Tailwind CSS, which allowed me to move quickly without building every UI primitive from scratch.
- **Table + Board:** Both views use the same contact dataset and shared state. This keeps changes consistent when switching between views.
- **Shared details panel:** Editing is handled through a shared details panel rather than separate editing implementations for the Table and Board.
- **Stage and Notes editing:** These are the only editable fields, matching the assignment requirements. The remaining contact information is presented as read-only data.
- **Local draft state:** Changes to Stage and Notes are kept locally in the details form until Save is pressed. Cancel discards the unsaved changes.

## Architecture

I used React Context for application-level contact state rather than introducing Redux. For the scope of this assignment, Context provides enough structure to keep the contact data, selected contact, view state, and update actions shared across the application without adding unnecessary state-management complexity.

The project also uses ESLint and Prettier to keep the codebase consistent.

Some of the initial project tooling and configuration, including parts of the README, contribution setup, Husky configuration, and formatting configuration, were based on setups I have used successfully in previous projects. Reusing those established configurations allowed me to spend more time on the assignment itself while keeping the development setup consistent.

## Trade-offs

Given the suggested 3–4 hour scope, I prioritized the required interaction and synchronization flows over optional functionality and deeper visual refinement.

The following were intentionally left out:

- Drag-and-drop between Board stages
- Search and filtering
- Additional views or advanced table interactions
- More extensive mobile-specific UX
- Some additional visual details such as avatars and richer supporting states
- More extensive typography and content hierarchy
- Further component abstraction and reuse where it was not necessary for the core flow

The application is intentionally small in scope rather than trying to simulate a complete production flow.

## What I Would Improve Next

The biggest area I would continue improving is the overall design and UX. With more time, I would refine the visual hierarchy, typography, supporting states, and mobile behavior.

I would also review the component structure further and identify opportunities to extract repeated patterns into reusable components where it improves clarity rather than adding abstraction for its own sake.

If the product scope expanded, I would then consider features such as search, filtering, richer board interactions, drag-and-drop, and persistent data.
