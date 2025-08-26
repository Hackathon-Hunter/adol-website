# ADOL - AI-Powered Marketplace Platform

ADOL is an innovative marketplace platform built on the Internet Computer (ICP) blockchain that leverages AI to help users create and manage product listings effortlessly.

## 🚀 Features

### 🤖 AI-Powered Product Analysis
- **Smart Image Analysis**: Upload product photos and get instant AI-generated listings
- **Automatic Price Estimation**: AI suggests realistic prices based on product condition and market data
- **Intelligent Descriptions**: Generate compelling product descriptions automatically
- **Chat Assistant**: Interactive AI helper for listing optimization and management

### 🔗 Blockchain Integration
- **Internet Computer Backend**: Decentralized data storage and management
- **Principal-based Authentication**: Secure user authentication via Internet Identity
- **Immutable Product Records**: Transparent and tamper-proof listing history

### 💼 Product Management
- **Multi-status Tracking**: Active, Draft, and Sold product states
- **Rich Product Details**: Comprehensive listing information including condition, pricing, and delivery
- **Image Management**: Upload and display product images with fallback support
- **Inventory Tracking**: Stock management and availability status

### 🎨 Modern User Experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Indonesian Rupiah Formatting**: Localized currency display
- **Professional UI**: Clean, intuitive interface with Tailwind CSS
- **Real-time Updates**: Live product status and information synchronization

## 🛠 Tech Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons and UI elements

### Backend
- **Internet Computer (ICP)** - Decentralized blockchain platform
- **Candid Interface** - Type-safe inter-canister communication
- **Motoko** - Smart contract development language

### AI Integration
- **OpenAI GPT-4** - Advanced image analysis and text generation
- **OpenRouter API** - AI model access and management
- **Custom Prompts** - Specialized marketplace listing optimization

### Development Tools
- **ESLint** - Code linting and quality assurance
- **DFX** - Internet Computer development toolkit
- **Git** - Version control and collaboration

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- DFX (Internet Computer SDK)
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/Hackathon-Hunter/adol-website.git
cd adol-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_DFX_NETWORK=local
NEXT_PUBLIC_CANISTER_ID_ADOL_BACKEND=your_backend_canister_id
```

4. **Start the Internet Computer local network**
```bash
dfx start --background
```

5. **Deploy canisters locally**
```bash
dfx deploy
```

6. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏃‍♂️ Running Locally

### Quick Start (Development)

1. **Start Internet Computer Network**
```bash
# Start the local IC replica
dfx start --background

# Verify it's running (optional)
dfx ping
```

2. **Deploy Backend Canisters**
```bash
# Deploy all canisters to local network
dfx deploy

# Note the canister IDs that are displayed
# Example output:
# Deployed canisters.
# URLs:
#   Backend canister via Candid interface:
#     adol-backend: http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
#   Frontend canister via browser:
#     adol-frontend: http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai&id=rno2w-sqaaa-aaaaa-aaacq-cai
```

3. **Configure Environment Variables**
Create or update `.env.local`:
```env
NEXT_PUBLIC_OPENAI_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_DFX_NETWORK=local
NEXT_PUBLIC_CANISTER_ID_ADOL_BACKEND=rrkah-fqaaa-aaaaa-aaaaq-cai
```
*Replace `rrkah-fqaaa-aaaaa-aaaaq-cai` with your actual backend canister ID from step 2*

4. **Install Dependencies & Start Development Server**
```bash
# Install all npm packages
npm install

# Start the Next.js development server
npm run dev
```

5. **Access the Application**
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend Candid UI**: Check the URL from step 2 deployment output

### Detailed Local Setup

#### Prerequisites Check
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check DFX installation
dfx --version

# If DFX is not installed:
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

#### Network Management
```bash
# Start IC network in foreground (see logs)
dfx start

# Start IC network in background
dfx start --background

# Stop IC network
dfx stop

# Check network status
dfx ping

# Reset local state (if needed)
dfx start --clean
```

#### Canister Management
```bash
# Deploy specific canister
dfx deploy adol-backend
dfx deploy adol-frontend

# Check canister status
dfx canister status --all

# Get canister IDs
dfx canister id adol-backend
dfx canister id adol-frontend

# View canister logs
dfx canister logs adol-backend
```

#### Development Workflow
```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production testing
npm run build

# Start production server locally
npm run start

# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

#### Troubleshooting Local Setup

**DFX Network Issues:**
```bash
# If dfx start fails, try cleaning
dfx stop
dfx start --clean

# Check if port 4943 is in use
lsof -i :4943

# Kill process on port 4943 if needed
kill -9 $(lsof -t -i :4943)
```

**Environment Variable Issues:**
```bash
# Verify environment variables are loaded
npm run dev
# Check browser console for any "undefined" canister ID errors
```

**Canister Deployment Issues:**
```bash
# Redeploy with fresh build
dfx deploy --mode reinstall

# Check available cycles (if needed)
dfx wallet balance

# View detailed deployment logs
dfx deploy --verbose
```

**Next.js Build Issues:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear node modules if needed
rm -rf node_modules package-lock.json
npm install
```

#### Local Testing Checklist

- [ ] DFX network is running (`dfx ping` returns success)
- [ ] Backend canister is deployed and accessible
- [ ] Environment variables are configured correctly
- [ ] Frontend development server is running on port 3000
- [ ] Can access Internet Identity for authentication
- [ ] AI features work (if OpenRouter API key is configured)
- [ ] Can create, edit, and view products
- [ ] Blockchain integration is functional

#### Performance Tips

- Use `dfx start --background` to run IC network without blocking terminal
- Enable hot reload with `npm run dev` for faster development
- Use browser dev tools to debug API calls and state management
- Monitor canister logs for backend debugging
- Use `dfx deploy --mode upgrade` for faster redeployments

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Internet Computer Deployment
```bash
# Build the frontend
npm run build

# Deploy to IC mainnet
dfx deploy --network ic --no-wallet
```

The application will be available at: `https://[canister-id].icp0.io/`

## 📱 Usage Guide

### Getting Started
1. **Connect Wallet**: Use Internet Identity to authenticate
2. **Upload Product Image**: Take or upload a photo of your item
3. **AI Analysis**: Let AI analyze and create your listing
4. **Review & Edit**: Modify details as needed
5. **Publish**: Make your product live on the marketplace

### AI Features
- **Image Upload**: Drag & drop or click to upload product photos
- **Smart Analysis**: AI examines condition, brand, model, and market value
- **Price Suggestions**: Automatic listing, target, and minimum price recommendations
- **Chat Assistance**: Ask AI to modify descriptions, prices, or other details

### Product Management
- **Dashboard**: View all your products in one place
- **Status Filtering**: Filter by Active, Draft, or Sold items
- **Edit Listings**: Update product information anytime
- **Analytics**: Track views, likes, and engagement (coming soon)

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OPENAI_API_KEY` | OpenRouter API key for AI features | Yes |
| `NEXT_PUBLIC_DFX_NETWORK` | IC network (local/ic) | Yes |
| `NEXT_PUBLIC_CANISTER_ID_ADOL_BACKEND` | Backend canister ID | Yes |

### Canister Configuration
The project uses two main canisters:
- **Frontend Canister**: Serves the Next.js application
- **Backend Canister**: Handles data storage and business logic

## 🧪 Development

### Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── home/              # AI product creation
│   ├── messages/          # AI agent communication
│   ├── products/          # Product management
│   └── layout/            # Shared layouts
├── components/            # Reusable UI components
│   ├── ui/                # Basic UI elements
│   └── providers/         # Context providers
├── hooks/                 # Custom React hooks
├── service/              # API and business logic
│   ├── api/              # Service layers
│   └── declarations/     # Generated canister types
└── utils/                # Utility functions
```

### Key Features Implementation

#### AI Image Analysis
- Upload handling with drag & drop
- Image optimization and compression
- Base64 encoding for AI processing
- Intelligent prompt engineering for marketplace listings

#### Blockchain Integration
- Internet Identity authentication
- Principal-based user management
- Candid interface for type safety
- Real-time canister communication

#### Currency Formatting
- Indonesian Rupiah localization
- Thousand separator formatting
- Consistent price display across all components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://a7ovc-zyaaa-aaaap-qqcdq-cai.icp0.io/](https://a7ovc-zyaaa-aaaap-qqcdq-cai.icp0.io/)
- **Repository**: [https://github.com/Hackathon-Hunter/adol-website](https://github.com/Hackathon-Hunter/adol-website)
- **Internet Computer**: [https://internetcomputer.org/](https://internetcomputer.org/)
- **Next.js**: [https://nextjs.org/](https://nextjs.org/)

## 📞 Support

For support, email support@adol.com or join our community discussions.

---

Built with ❤️ using Internet Computer, Next.js, and AI
