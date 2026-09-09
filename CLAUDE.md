# Kohinoor Enterprise — Project Memory

## Product
Vite + React digital showroom for Kohinoor Enterprise, Bhiwandi. Discovery-led retail only; conversion is WhatsApp, call and visit—not checkout.

## Visual decisions
- Canvas `#f8f6f1`, ink `#181715`, orange `#de702c`, night `#171717`.
- Editorial serif headings; clean sans UI.
- `ExploreRef`: keep desktop filters sticky alongside a tall, masonry-like product field. Use scrolling chips on mobile.
- Motion is restrained (250–700ms opacity/transforms); stacked category imagery crossfade; marquee loops; reduced motion has a static final state.

## Architecture
- Vite + React client routes: `/`, `/products`, `/products/:id`, `/admin`.
- Catalogue data is isolated in `src/data/catalog.js`; UI must stay data-driven.
- Password comes only from `ADMIN_PASSWORD` in `.env.local`.
- This front-end demo persists admin edits in localStorage. Replace only the storage adapter when introducing a backend.
