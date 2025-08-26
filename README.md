# 🌟 ADOL

![ADOL AI Cover](docs/images/AdolAI_Cover.jpg)

## ADOL: The AI-Powered Marketplace for Web3 Commerce

**Transform your products into perfect listings. Stay ahead of the market.**

---

## 🔗 ADOL – The AI-Powered Marketplace for Web3 Commerce

ADOL is an innovative marketplace platform built fully on-chain and designed to work seamlessly across the Internet Computer blockchain network. ADOL enables real-time product analysis, intelligent pricing, and automated listing generation across different marketplaces.

The platform provides a complete set of tools including an AI-powered image analysis engine, blockchain-based product management, and community-driven marketplace insights. Users can analyze, create, and transact with greater confidence. Advanced AI models trained on high-quality market datasets provide instant product valuations, and results are continuously improved through community contributions and verified reports. With built-in incentives and transparent pricing, ADOL empowers users to actively participate in building the future of Web3 commerce.

---

## 🚀 Key Features

### 🤖 **AI-Powered Product Analysis**
- **Smart Image Recognition**: Upload product photos and get instant AI-generated listings with accurate descriptions
- **Intelligent Price Estimation**: Advanced AI algorithms suggest realistic prices based on product condition, brand, and market data
- **Automated Descriptions**: Generate compelling, SEO-optimized product descriptions automatically
- **Real-time Market Insights**: Live analysis of market trends and pricing recommendations

### 🔗 **Blockchain Integration**
- **Internet Computer Backend**: Fully decentralized data storage and immutable transaction records
- **Principal-based Authentication**: Secure user authentication via Internet Identity with zero-knowledge proofs
- **Cross-chain Compatibility**: Seamless integration with multiple blockchain networks
- **Smart Contract Automation**: Automated escrow, payments, and dispute resolution

### 💼 **Advanced Product Management**
- **Multi-status Tracking**: Comprehensive product lifecycle management (Active, Draft, Sold, Archived)
- **Rich Metadata Support**: Detailed product specifications, condition reports, and authenticity verification
- **Inventory Analytics**: Real-time stock tracking, sales performance, and demand forecasting
- **Bulk Operations**: Efficient management of large product catalogs

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile with progressive web app capabilities
- **Localized Experience**: Multi-language support with Indonesian Rupiah formatting and regional preferences
- **Real-time Collaboration**: Live chat, instant notifications, and collaborative listing management
- **Accessibility First**: WCAG 2.1 compliant design for inclusive user experience

---

## 🛠 Tech Stack

<table>
<tr>
<td width="50%">

### **Frontend**
- **Next.js 15.4.6** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library
- **PWA Support** - Progressive web application

</td>
<td width="50%">

### **Backend**
- **Internet Computer (ICP)** - Decentralized blockchain platform
- **Candid Interface** - Type-safe inter-canister communication
- **Motoko** - Smart contract development
- **HTTPS Outcalls** - External API integration
- **Stable Memory** - Persistent data storage

</td>
</tr>
<tr>
<td width="50%">

### **AI & Analytics**
- **OpenAI GPT-4** - Advanced language models
- **Computer Vision** - Image analysis and recognition
- **Fetch.ai Agents** - Autonomous AI agents
- **OpenRouter API** - Multi-model AI access
- **Custom ML Models** - Specialized marketplace algorithms

</td>
<td width="50%">

### **Development**
- **DFX** - Internet Computer development toolkit
- **ESLint** - Code quality assurance
- **Husky** - Git hooks automation
- **Jest** - Testing framework
- **GitHub Actions** - CI/CD pipeline

</td>
</tr>
</table>

---

## 🏃‍♂️ Quick Start

### Prerequisites
```bash
# Node.js 18+ and npm
node --version && npm --version

# Internet Computer SDK
dfx --version

# Git for version control
git --version
```

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Hackathon-Hunter/adol-website.git
cd adol-website

# 2. Install dependencies
npm install

# 3. Start Internet Computer network
dfx start --background

# 4. Deploy canisters
dfx deploy

# 5. Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 6. Start development server
npm run dev
```

🎉 **Your ADOL marketplace is now running at [http://localhost:3000](http://localhost:3000)**

---

## 🌐 Live Application & Resources

### **🚀 Live Demo**
- **Application**: [https://a7ovc-zyaaa-aaaap-qqcdq-cai.icp0.io/](https://a7ovc-zyaaa-aaaap-qqcdq-cai.icp0.io/)
- **Backend Dashboard**: [https://dashboard.internetcomputer.org/canister/ujk5g-liaaa-aaaam-aeocq-cai](https://dashboard.internetcomputer.org/canister/ujk5g-liaaa-aaaam-aeocq-cai)

### **🤖 AI Framework**
- **Platform**: Agentverse by Fetch.ai
- **Agent**: [agent1qd2mu8zses2cxgd46wn9d79esn6u64juz00sg7w0qc5zsxa2v0fgs9c5a6w](https://agentverse.ai/agents/details/agent1qd2mu8zses2cxgd46wn9d79esn6u64juz00sg7w0qc5zsxa2v0fgs9c5a6w)
- **Capabilities**: Computer vision, NLP, autonomous negotiation

### **💻 Source Code**
- **Frontend**: [hunters-code/adol-website](https://github.com/hunters-code/adol-website)
- **Backend**: [hunters-code/adol-icp-backend](https://github.com/hunters-code/adol-icp-backend)
- **AI Agents**: [hunters-code/adol-agents](https://github.com/hunters-code/adol-agents)

---

## 📱 How It Works

### **1. 📸 Upload & Analyze**
Simply upload a product image, and our AI instantly analyzes the item, identifying brand, model, condition, and market value.

### **2. 🎯 Smart Pricing**
Get intelligent price recommendations based on real market data, condition assessment, and demand trends.

### **3. ✨ Auto-Generate Listings**
AI creates compelling product descriptions, highlights key selling points, and optimizes for marketplace algorithms.

### **4. 🔄 Manage & Track**
Monitor your listings across multiple platforms with real-time analytics and performance insights.

### **5. 💰 Secure Transactions**
Blockchain-powered escrow ensures safe, transparent transactions with automated dispute resolution.

---

## 🏗 Project Structure

```
adol-website/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router pages
│   │   ├── 📁 auth/              # Authentication & identity
│   │   ├── 📁 dashboard/         # User dashboard & analytics
│   │   ├── 📁 home/              # AI product creation
│   │   ├── 📁 messages/          # AI agent communication
│   │   ├── 📁 products/          # Product management
│   │   └── 📁 layout/            # Shared layouts & components
│   ├── 📁 components/            # Reusable UI components
│   │   ├── 📁 ui/                # Basic UI elements
│   │   ├── 📁 providers/         # Context providers
│   │   └── 📁 icons/             # Custom icon components
│   ├── 📁 hooks/                 # Custom React hooks
│   ├── 📁 service/              # API & business logic
│   │   ├── 📁 api/              # Service layers
│   │   └── 📁 declarations/     # Generated canister types
│   └── 📁 utils/                # Utility functions
├── 📁 public/                    # Static assets
├── 📁 docs/                     # Documentation & images
└── 📄 Configuration files...
```

---

## 🛡 Security & Trust

ADOL implements multiple layers of security to ensure safe and trustworthy transactions:

- **🔐 End-to-End Encryption**: All communications encrypted with industry-standard protocols
- **🎯 Smart Contract Audits**: Regular security audits by certified blockchain security firms
- **🔍 AI Model Verification**: Continuous monitoring and validation of AI decision-making processes
- **🛡️ Fraud Detection**: Advanced algorithms detect and prevent fraudulent activities
- **⚖️ Dispute Resolution**: Automated and human-mediated dispute resolution mechanisms

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Development Workflow**
```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# 4. Run tests
npm run test

# 5. Commit your changes
git commit -m 'Add amazing feature'

# 6. Push to the branch
git push origin feature/amazing-feature

# 7. Open a Pull Request
```

### **Areas for Contribution**
- 🎨 **UI/UX Design**: Improve user interface and experience
- 🤖 **AI Models**: Enhance image recognition and pricing algorithms
- 🔗 **Blockchain**: Optimize smart contracts and canister performance
- 📚 **Documentation**: Improve guides, tutorials, and API documentation
- 🧪 **Testing**: Add unit tests, integration tests, and E2E tests

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Community

<table>
<tr>
<td align="center">

### **💬 Get Help**
- **Email**: support@adol.com
- **Discord**: [Join our community](https://discord.gg/adol)
- **Telegram**: [@adol_official](https://t.me/adol_official)

</td>
<td align="center">

### **📈 Stay Updated**
- **Twitter**: [@adol_platform](https://twitter.com/adol_platform)
- **Medium**: [ADOL Blog](https://medium.com/@adol)
- **LinkedIn**: [ADOL Company](https://linkedin.com/company/adol)

</td>
</tr>
</table>

---

<div align="center">

**Built with ❤️ using Internet Computer, Next.js, and AI**

*Empowering the future of decentralized commerce*

[![Internet Computer](https://img.shields.io/badge/Internet_Computer-29ABE2?style=for-the-badge&logo=internet-computer&logoColor=white)](https://internetcomputer.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

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

### 🌐 Live Application
- **Live Demo**: [https://a7ovc-zyaaa-aaaap-qqcdq-cai.icp0.io/](https://a7ovc-zyaaa-aaaap-qqcdq-cai.icp0.io/)
- **Backend ICP Dashboard**: [https://dashboard.internetcomputer.org/canister/ujk5g-liaaa-aaaam-aeocq-cai](https://dashboard.internetcomputer.org/canister/ujk5g-liaaa-aaaam-aeocq-cai)

### 🤖 AI Framework
- **Core Engine**: Fetch.ai integration
- **Deployment Platform**: Agentverse
- **Agent Address**: `test-agent://agent1qd2mu8zses2cxgd46wn9d79esn6u64juz00sg7w0qc5zsxa2v0fgs9c5a6w`
- **Capabilities**: Computer vision, natural language processing, autonomous negotiation
- **Agentverse URL**: [https://agentverse.ai/agents/details/agent1qd2mu8zses2cxgd46wn9d79esn6u64juz00sg7w0qc5zsxa2v0fgs9c5a6w](https://agentverse.ai/agents/details/agent1qd2mu8zses2cxgd46wn9d79esn6u64juz00sg7w0qc5zsxa2v0fgs9c5a6w)

### 💻 Technical Stack
- **Frontend Repository**: [https://github.com/hunters-code/adol-website](https://github.com/hunters-code/adol-website)
- **Backend Repository**: [https://github.com/hunters-code/adol-icp-backend](https://github.com/hunters-code/adol-icp-backend)
- **Agents Repository**: [https://github.com/hunters-code/adol-agents](https://github.com/hunters-code/adol-agents)

### 📚 Documentation & Resources
- **Repository**: [https://github.com/Hackathon-Hunter/adol-website](https://github.com/Hackathon-Hunter/adol-website)
- **Internet Computer**: [https://internetcomputer.org/](https://internetcomputer.org/)
- **Next.js**: [https://nextjs.org/](https://nextjs.org/)
- **Fetch.ai**: [https://fetch.ai/](https://fetch.ai/)

## 📞 Support

For support, email support@adol.com or join our community discussions.

---

Built with ❤️ using Internet Computer, Next.js, and AI
