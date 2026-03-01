Apna POS - Point of Sale System

I started this project because I wanted to build a modern POS system that actually works for retail businesses. After working with several retail clients, I noticed most POS systems are either too complicated or too expensive for small businesses.

So I built Apna POS from scratch using React 19, Vite, and modern web technologies. The goal was simple - create something that a small retail shop could install and use immediately, but also scale to handle multiple locations.

What this system does:
- Handles multiple user roles (Admin, Manager, Cashier, etc.)
- Processes payments in real-time
- Tracks inventory across stores
- Generates reports that actually help business owners
- Works on mobile and desktop
- Can run entirely in the browser (no desktop app needed)

I built this step by step:
1. First got the authentication working with JWT tokens
2. Then built the role-based routing system
3. Created the POS terminal with cart and checkout
4. Added inventory and product management
5. Built reporting and analytics
6. Made it responsive for tablets and phones
7. Added dark/light theme support
8. Optimized for performance

The tech stack I chose:
- React 19 for the UI (latest with hooks)
- Vite for fast development and building
- Redux Toolkit for state management (much cleaner than plain Redux)
- TailwindCSS for styling (faster than CSS modules)
- Shadcn/ui for components (saved me months of work)
- React Router v6 for navigation

Why I built it this way:
- Wanted something that could be deployed easily
- Needed it to work offline when internet is spotty
- Had to support multiple stores from day one
- Mobile users needed full functionality, not watered-down versions

Current status:
- All core features working
- Authentication and authorization complete
- Payment processing functional
- Reporting and analytics operational
- Responsive design implemented
- Production deployment ready

This is not a template or a demo - it's a real system that I'm actively developing and improving. Every feature was added because it was actually needed by real retail users.

If you're looking at this because you want a POS system that actually works and can be extended, you're in the right place.

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
