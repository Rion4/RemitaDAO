
import './App.css'
import React, { useState, useMemo } from 'react';
import { ArrowRight, Wallet, LogOut, Plus, ChevronRight, Copy, Lightbulb, BarChart, Lock, GitBranch, Twitter, Send } from 'lucide-react';

// Mock Data
const MOCK_VAULTS = [
  { id: 'vault-1', name: 'Monthly to Mom', recipient: 'andr1...xyz', totalSent: 1250.00, split: { cash: 50, savings: 30, investment: 20 } },
  { id: 'vault-2', name: 'Project Bonus Savings', recipient: 'andr1...abc', totalSent: 5000.00, split: { cash: 10, savings: 70, investment: 20 } },
  { id: 'vault-3', name: 'University Fund', recipient: 'andr1...def', totalSent: 200.00, split: { cash: 0, savings: 100, investment: 0 } },
];

// Helper Components (Styled with TailwindCSS)
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };
  return <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 ${className}`}>
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 border border-blue-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Slider = ({ label, value, onChange, ...props }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}: {value}%</label>
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            {...props}
        />
    </div>
);


// Page Sections & Components

const NavigationBar = ({ onLaunchApp }) => (
  <header className="absolute top-0 left-0 right-0 z-10 p-4">
    <div className="container mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/10">
      <div className="text-2xl font-bold text-white">RemitaDAO</div>
      <nav className="hidden md:flex items-center gap-6 text-gray-300">
        <a href="#how-it-works" className="hover:text-white">How It Works</a>
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#faq" className="hover:text-white">FAQs</a>
      </nav>
      <Button onClick={onLaunchApp}>
        Launch App <ArrowRight className="inline ml-2 h-4 w-4" />
      </Button>
    </div>
  </header>
);

const HeroSection = ({ onLaunchApp }) => (
  <section className="relative text-center py-32 md:py-48 px-4 overflow-hidden">
     <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
     <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black"></div>
     <div className="relative z-10 container mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Send Money Home, Smarter.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Automate your family's financial future. Split, save, and invest your cross-border payments with zero fees and complete control. Powered by Andromeda aOS.
        </p>
        <div className="mt-8">
            <Button onClick={onLaunchApp} className="px-8 py-4 text-lg">
                Create Your First Vault
            </Button>
        </div>
     </div>
  </section>
);

const HowItWorksSection = () => (
    <section id="how-it-works" className="py-20 bg-black px-4">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-gray-400 mb-12">A simple 3-step visual guide.</p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 text-blue-400 mx-auto mb-4">
                        <Wallet size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">1. Connect Wallet</h3>
                    <p className="text-gray-400 mt-2">No sign-up needed. Securely connect your existing crypto wallet.</p>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 text-blue-400 mx-auto mb-4">
                        <GitBranch size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">2. Set Your Rules</h3>
                    <p className="text-gray-400 mt-2">Decide your split: how much for cash, savings, and investments.</p>
                </div>
                <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-white/10">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 text-blue-400 mx-auto mb-4">
                        <Send size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">3. Fund & Forget</h3>
                    <p className="text-gray-400 mt-2">Send funds once, and RemitaDAO handles the rest automatically.</p>
                </div>
            </div>
        </div>
    </section>
);

const FeaturesSection = () => {
    const features = [
        { icon: GitBranch, title: "Automated Splitting", description: "Divide every payment instantly based on your preset rules." },
        { icon: Lock, title: "Scheduled Savings", description: "Lock funds for future goals like education or healthcare with vesting." },
        { icon: BarChart, title: "Earn Yield", description: "Put your money to work by staking idle funds in secure pools." },
        { icon: Wallet, title: "Total Control & Transparency", description: "Trustless and on-chain. You are the only one in control of your funds." },
    ];
    return (
        <section id="features" className="py-20 bg-black px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-white text-center mb-12">Features for a Brighter Future</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(feature => (
                        <Card key={feature.title} className="text-center">
                            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600/20 text-blue-400 mx-auto mb-4">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};


const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="container mx-auto text-center">
            <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="hover:text-white"><Twitter size={24}/></a>
                <a href="#" className="hover:text-white"><Send size={24}/></a>
            </div>
            <p>Powered by <a href="#" className="font-semibold text-blue-400 hover:underline">Andromeda Protocol</a></p>
            <p className="mt-2 text-sm">Built for the aOS Global Buildathon</p>
        </div>
    </footer>
);


const LandingPage = ({ onLaunchApp }) => (
    <div className="bg-black">
        <NavigationBar onLaunchApp={onLaunchApp} />
        <main>
            <HeroSection onLaunchApp={onLaunchApp} />
            <HowItWorksSection />
            <FeaturesSection />
            {/* A simple FAQ section placeholder */}
            <section id="faq" className="py-20 bg-black px-4">
                 <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto text-left space-y-4">
                        <details className="p-4 bg-gray-900/50 rounded-lg cursor-pointer">
                            <summary className="font-semibold text-white">What is RemitaDAO?</summary>
                            <p className="mt-2 text-gray-400">RemitaDAO is a decentralized application that allows you to automate cross-border payments, splitting them into portions for immediate cash, savings, and investments.</p>
                        </details>
                        <details className="p-4 bg-gray-900/50 rounded-lg cursor-pointer">
                            <summary className="font-semibold text-white">Is it secure?</summary>
                            <p className="mt-2 text-gray-400">Yes. It's built on the Andromeda Operating System (aOS), and you always maintain full custody of your funds. The logic is handled by transparent smart contracts.</p>
                        </details>
                    </div>
                 </div>
            </section>
        </main>
        <Footer />
    </div>
);


// Dashboard Components
const DashboardNav = ({ onDisconnect }) => (
    <header className="p-4 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold text-white">RemitaDAO</div>
            <div className="flex items-center gap-4 bg-black/30 p-2 rounded-lg">
                <Wallet className="text-blue-400" />
                <span className="text-sm text-gray-300 font-mono">andr...1234</span>
                <button onClick={onDisconnect} className="text-gray-400 hover:text-white"><LogOut size={20}/></button>
            </div>
        </div>
    </header>
);

const CreateVaultModal = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [recipient, setRecipient] = useState('');
    const [split, setSplit] = useState({ cash: 50, savings: 30, investment: 20 });
    const [vestingDate, setVestingDate] = useState('');

    const handleSliderChange = (type, value) => {
        const remaining = 100 - value;
        let newSplit = { ...split, [type]: value };

        if (type === 'cash') {
            const savingsRatio = newSplit.savings / (newSplit.savings + newSplit.investment) || 0.5;
            newSplit.savings = Math.round(remaining * savingsRatio);
            newSplit.investment = remaining - newSplit.savings;
        } else if (type === 'savings') {
            const investmentRatio = newSplit.investment / (newSplit.investment + newSplit.cash) || 0.5;
            newSplit.investment = Math.round(remaining * investmentRatio);
            newSplit.cash = remaining - newSplit.investment;
        } else { // investment
            const cashRatio = newSplit.cash / (newSplit.cash + newSplit.savings) || 0.5;
            newSplit.cash = Math.round(remaining * cashRatio);
            newSplit.savings = remaining - newSplit.cash;
        }
        
        // Final adjustment to ensure total is 100
        const total = newSplit.cash + newSplit.savings + newSplit.investment;
        if (total !== 100) {
            newSplit.cash += (100 - total);
        }

        setSplit(newSplit);
    };
    
    const handleSave = () => {
        onSave({ name, recipient, split, vestingDate });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create a New Remittance Vault">
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Vault Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Family Support" className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Recipient's Wallet Address</label>
                    <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="andr..." className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white font-mono focus:ring-blue-500 focus:border-blue-500" />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white">Configure Your Split</h3>
                    <Slider label="Immediate Cash" value={split.cash} onChange={e => handleSliderChange('cash', parseInt(e.target.value))} />
                    <Slider label="Long-Term Savings" value={split.savings} onChange={e => handleSliderChange('savings', parseInt(e.target.value))} />
                    <Slider label="Invest & Earn Yield" value={split.investment} onChange={e => handleSliderChange('investment', parseInt(e.target.value))} />
                </div>

                {split.savings > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Vesting End Date</label>
                        <input type="date" value={vestingDate} onChange={e => setVestingDate(e.target.value)} className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                )}
                {split.investment > 0 && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Staking Pool</label>
                        <select className="w-full bg-gray-800 border-gray-700 rounded-lg p-2 text-white focus:ring-blue-500 focus:border-blue-500">
                            <option>ANDR Staking Pool (APY: 12%)</option>
                        </select>
                    </div>
                )}
                
                <div className="bg-blue-900/30 p-4 rounded-lg flex items-start gap-3">
                    <Lightbulb className="text-blue-400 h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-semibold text-blue-300">AI Suggestion</p>
                        <p className="text-sm text-blue-400">Based on typical goals, we recommend a 50/30/20 split to balance immediate needs with long-term growth.</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>Save Vault</Button>
                </div>
            </div>
        </Modal>
    );
};

const VaultCard = ({ vault, onSelect }) => (
    <Card className="cursor-pointer hover:border-blue-500/50 transition-all duration-300" onClick={() => onSelect(vault)}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-white">{vault.name}</h3>
                <p className="text-sm text-gray-400 font-mono">{vault.recipient}</p>
            </div>
            <ChevronRight className="text-gray-500"/>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-300">Total Sent: <span className="font-semibold text-white">${vault.totalSent.toFixed(2)}</span></p>
            <div className="mt-2 flex gap-2 text-xs">
                <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">Cash: {vault.split.cash}%</span>
                <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded">Savings: {vault.split.savings}%</span>
                <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Invest: {vault.split.investment}%</span>
            </div>
        </div>
    </Card>
);

const VaultDetailView = ({ vault, onBack }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Add a toast notification here in a real app
    };

    return (
        <div className="container mx-auto p-4 md:p-8">
            <button onClick={onBack} className="text-gray-400 hover:text-white mb-6">&larr; Back to all vaults</button>
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white">{vault.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <p className="text-sm text-gray-500 font-mono">Vault Address: {vault.id}-contract-address</p>
                        <button onClick={() => copyToClipboard(`${vault.id}-contract-address`)} className="text-gray-400 hover:text-white">
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
                <Button className="w-full md:w-auto">Fund This Vault</Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <h4 className="text-gray-400 text-sm">Available to Recipient</h4>
                    <p className="text-3xl font-bold text-white mt-2">$ {(vault.totalSent * vault.split.cash / 100).toFixed(2)}</p>
                </Card>
                <Card>
                    <h4 className="text-gray-400 text-sm">In Savings Vault</h4>
                    <p className="text-3xl font-bold text-white mt-2">$ {(vault.totalSent * vault.split.savings / 100).toFixed(2)}</p>
                    <p className="text-xs text-gray-500 mt-1">Releases on 2025-12-31</p>
                </Card>
                <Card>
                    <h4 className="text-gray-400 text-sm">Actively Invested</h4>
                    <p className="text-3xl font-bold text-white mt-2">$ {(vault.totalSent * vault.split.investment / 100).toFixed(2)}</p>
                    <p className="text-xs text-green-400 mt-1">Earning 12% APY</p>
                </Card>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
                <div className="bg-gray-900/50 rounded-lg overflow-hidden border border-white/10">
                    <table className="w-full text-left">
                        <thead className="bg-black/30">
                            <tr>
                                <th className="p-3 text-sm font-semibold text-gray-300">Date</th>
                                <th className="p-3 text-sm font-semibold text-gray-300">Amount</th>
                                <th className="p-3 text-sm font-semibold text-gray-300">Tx Hash</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-white/10">
                                <td className="p-3 text-gray-400">2024-07-20</td>
                                <td className="p-3 text-white">$500.00</td>
                                <td className="p-3 text-blue-400 font-mono hover:underline cursor-pointer">0xabc...def</td>
                            </tr>
                            <tr className="border-t border-white/10">
                                <td className="p-3 text-gray-400">2024-06-20</td>
                                <td className="p-3 text-white">$500.00</td>
                                <td className="p-3 text-blue-400 font-mono hover:underline cursor-pointer">0x123...456</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


const Dashboard = ({ onDisconnect }) => {
    const [vaults, setVaults] = useState(MOCK_VAULTS);
    const [selectedVault, setSelectedVault] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveVault = (newVault) => {
        setVaults([...vaults, { ...newVault, id: `vault-${vaults.length + 1}`, totalSent: 0 }]);
    };
    
    if (selectedVault) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                <DashboardNav onDisconnect={onDisconnect} />
                <main>
                    <VaultDetailView vault={selectedVault} onBack={() => setSelectedVault(null)} />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <DashboardNav onDisconnect={onDisconnect} />
            <main className="container mx-auto p-4 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Your Remittance Vaults</h1>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus className="inline mr-2 h-4 w-4" /> Create New Vault
                    </Button>
                </div>
                
                {vaults.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-gray-700 rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-300">Welcome to your dashboard!</h2>
                        <p className="text-gray-500 mt-2">You don't have any vaults yet. Create one to get started.</p>
                        <Button onClick={() => setIsModalOpen(true)} className="mt-6">
                            + Create Your First Remittance Vault
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vaults.map(vault => (
                            <VaultCard key={vault.id} vault={vault} onSelect={setSelectedVault} />
                        ))}
                    </div>
                )}
            </main>
            <CreateVaultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveVault} />
        </div>
    );
};


// Main App Component
export default function App() {
    const [isAppLaunched, setIsAppLaunched] = useState(false);

    // In a real app, this would be derived from a Web3 library like CosmJS
    const [isConnected, setIsConnected] = useState(false);

    const handleLaunchApp = () => {
        setIsAppLaunched(true);
        // This is where you would trigger the wallet connection logic
        setIsConnected(true);
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setIsAppLaunched(false); // Go back to landing page on disconnect
    };

    if (isAppLaunched && isConnected) {
        return <Dashboard onDisconnect={handleDisconnect} />;
    }

    return <LandingPage onLaunchApp={handleLaunchApp} />;
}

