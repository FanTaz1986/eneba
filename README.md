# ENEBA Store - Digital Software Marketplace

A modern e-commerce store built with React.js for selling digital software products.

## Project Structure

```
eneba/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Header.js     # Navigation header
│   │   ├── Footer.js     # Footer component
│   │   └── ProductCard.js # Product display card
│   ├── pages/            # Page components
│   │   ├── Home.js       # Homepage
│   │   ├── Shop.js       # Products listing page
│   │   └── Cart.js       # Shopping cart
│   ├── services/         # API services
│   │   └── api.js        # Axios API configuration
│   ├── store/            # State management (Zustand)
│   │   └── cartStore.js  # Shopping cart state
│   ├── hooks/            # Custom React hooks
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
├── public/
│   └── index.html        # HTML template
├── package.json          # Dependencies & scripts
├── tailwind.config.js    # Tailwind CSS config
├── postcss.config.js     # PostCSS config
├── .env                  # Environment variables
└── README.md
```

## Tech Stack

- **Frontend**: React 19
- **Routing**: React Router v7
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Framework**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Create React App

## Installation

1. Install all dependencies (already done):
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Available Scripts

```bash
npm start       # Start development server
npm run build   # Create production build
npm test        # Run tests
npm run eject   # Eject from Create React App (irreversible)
```

## Features

### Current Features
- ✅ Product listing with search and filtering
- ✅ Shopping cart with add/remove/update quantity
- ✅ Product cards with ratings
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications
- ✅ Local state management

### To Implement
- 🔲 Product detail pages
- 🔲 User authentication (login/register)
- 🔲 Payment integration (Stripe/PayPal)
- 🔲 Order management
- 🔲 User wishlist
- 🔲 Product reviews
- 🔲 Admin dashboard

## API Integration

The app is configured to connect to a backend API. Update the API base URL in `.env`:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### API Endpoints Configured

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/category/:category` - Filter by category
- `POST /api/orders` - Create order
- `POST /api/payment/create-intent` - Create payment
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Styling

The project uses **Tailwind CSS** for styling. Customize the theme in `tailwind.config.js`.

### Adding Custom Styles
Edit `src/index.css` for global styles.

## State Management (Zustand)

The cart state is managed using Zustand. Access it like:

```javascript
import { useCartStore } from './store/cartStore';

const cart = useCartStore((state) => state.cart);
const addToCart = useCartStore((state) => state.addToCart);
```

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## Next Steps

1. **Set up backend**: Create a Node.js/Express backend API
2. **Connect products**: Modify `Shop.js` to fetch from API
3. **Add authentication**: Implement user login/register
4. **Payment integration**: Add Stripe or PayPal
5. **Database**: Connect MongoDB or PostgreSQL

## Troubleshooting

### Port 3000 already in use?
```bash
npx kill-port 3000
npm start
```

### Clear npm cache
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

## Development Tips

- Use React DevTools browser extension for debugging
- Check the Network tab in DevTools for API calls
- Use Tailwind CSS IntelliSense extension in VS Code

## License

MIT

## Support

For issues or questions, create a GitHub issue or contact support@eneba.com
