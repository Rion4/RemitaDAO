// src/App.jsx

import './App.css';
import React, { useState, useEffect } from 'react';
import { ArrowRight, Wallet, LogOut, RefreshCw, BarChart, Lock, GitBranch, Twitter, Send } from 'lucide-react';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { StargateClient } from '@cosmjs/stargate';
import World from './components/Globe.jsx';

// --- FINAL, VERIFIED SMART CONTRACT ADDRESSES (STARGAZE TESTNET) ---
const SPLITTER_CONTRACT_ADDRESS = "stars1ahn7smatk0h9hulfys2nn8gqnv0ppksg5ram7uw45mqhx9e62r6qmm7960";
const VESTING_CONTRACT_ADDRESS = "stars1qn73rezv2uhkl2u0vrf9zwnmf65ehxqq62eym27a99aedrm0pnzsp8n5s3";
const TOKEN_CONTRACT_ADDRESS = "stars1ht55vh6t04l073yjyyumf03yqzek8jj4c40k5a8xdwanznn0069qyxucwz";
const RECIPIENT_ADDRESS = "stars1wmfht39848mrnyz7xpx33tadmz4n3py6pj3h05";

// --- Helper Components & Landing Page (Full Code) ---
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = { primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500', secondary: 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' };
  return <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};
const Card = ({ children, className = '' }) => (<div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-6 ${className}`}>{children}</div>);
const NavigationBar = ({ onLaunchApp }) => (<header className="absolute top-0 left-0 right-0 z-10 p-4"> <div className="container mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/10"> <div className="text-2xl font-bold text-white">RemitaDAO</div> <nav className="hidden md:flex items-center gap-6 text-gray-300"><a href="#how-it-works" className="hover:text-white">How It Works</a><a href="#features" className="hover:text-white">Features</a></nav> <Button onClick={onLaunchApp}> Launch App <ArrowRight className="inline ml-2 h-4 w-4" /> </Button> </div> </header>);
const HeroSection = ({ onLaunchApp }) => (<section className="relative text-center py-32 md:py-48 px-4 overflow-hidden bg-gradient-to-b from-gray-900 to-black"> <div className="absolute top-0 left-0 w-full h-full z-0 opacity-60"> <World /> </div> <div className="relative z-10 container mx-auto"> <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight"> Send Money Home, Smarter. </h1> <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-3xl mx-auto"> Automate your family's financial future. Split, save, and invest your cross-border payments with zero fees and complete control. </p> <div className="mt-8"> <Button onClick={onLaunchApp} variant="primary" className="px-8 py-4 text-lg"> Launch App </Button> </div> </div> </section>);
const HowItWorksSection = () => (<section id="how-it-works" className="py-20 bg-black px-4"> <div className="container mx-auto text-center"> <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2> <div className="grid md:grid-cols-3 gap-8"> <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-white/10"><Wallet size={32} className="mx-auto text-blue-400 mb-4" /> <h3 className="text-xl font-semibold text-white">1. Connect Wallet</h3></div> <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-white/10"><GitBranch size={32} className="mx-auto text-blue-400 mb-4" /> <h3 className="text-xl font-semibold text-white">2. Set Rules</h3></div> <div className="text-center p-6 bg-gray-900/50 rounded-xl border border-white/10"><Send size={32} className="mx-auto text-blue-400 mb-4" /> <h3 className="text-xl font-semibold text-white">3. Fund & Forget</h3></div> </div> </div> </section>);
const FeaturesSection = () => { const features = [{ icon: GitBranch, title: "Automated Splitting" }, { icon: Lock, title: "Scheduled Savings" }, { icon: BarChart, title: "Earn Yield" }, { icon: Wallet, title: "Total Control" },]; return (<section id="features" className="py-20 bg-black px-4"> <div className="container mx-auto"> <h2 className="text-3xl font-bold text-white text-center mb-12">Features</h2> <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"> {features.map(feature => (<Card key={feature.title} className="text-center"> <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600/20 text-blue-400 mx-auto mb-4"> <feature.icon size={24} /> </div> <h3 className="text-lg font-semibold text-white">{feature.title}</h3> </Card>))} </div> </div> </section>); };
const Footer = () => (<footer className="bg-gray-900 text-gray-400 py-8 px-4"> <div className="container mx-auto text-center"> <p>Built for the aOS Global Buildathon</p> </div> </footer>);
const LandingPage = ({ onLaunchApp }) => (<div className="bg-black text-white"> <NavigationBar onLaunchApp={onLaunchApp} /> <main> <HeroSection onLaunchApp={onLaunchApp} /> <HowItWorksSection /> <FeaturesSection /> </main> <Footer /> </div>);
const DashboardNav = ({ onDisconnect, address }) => (<header className="p-4 bg-gray-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-20"> <div className="container mx-auto flex justify-between items-center"> <div className="text-2xl font-bold text-white">RemitaDAO</div> <div className="flex items-center gap-4 bg-black/30 p-2 rounded-lg"> <Wallet className="text-blue-400" /> <span className="text-sm text-gray-300 font-mono"> {address ? `${address.substring(0, 10)}...${address.substring(address.length - 6)}` : "Not Connected"} </span> <button onClick={onDisconnect} className="text-gray-400 hover:text-white"><LogOut size={20} /></button> </div> </div> </header>);

// --- THE BRAIN: Transaction Logic ---
const createSplitMessages = (senderAddress, recipientAddress, starsForSplitter, investmentTokenAmount) => {
  const messages = [];
  if (starsForSplitter > 0) {
    const splitterMsg = { send: {} };
    messages.push({
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: {
        sender: senderAddress,
        contract: SPLITTER_CONTRACT_ADDRESS,
        msg: new TextEncoder().encode(JSON.stringify(splitterMsg)),
        funds: [{ denom: "ustars", amount: starsForSplitter.toString() }],
      },
    });
  }
  if (investmentTokenAmount > 0) {
    const tokenTransferMsg = { transfer: { recipient: recipientAddress, amount: investmentTokenAmount.toString() } };
    messages.push({
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: {
        sender: senderAddress,
        contract: TOKEN_CONTRACT_ADDRESS,
        msg: new TextEncoder().encode(JSON.stringify(tokenTransferMsg)),
        funds: [],
      },
    });
  }
  return messages;
};

// --- Dashboard Component ---
const Dashboard = ({ onDisconnect, address, signingClient, client }) => {
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const [walletBalance, setWalletBalance] = useState('0.00');
  const [cashBalance, setCashBalance] = useState('0.00');
  const [savingsBalance, setSavingsBalance] = useState('0.00');
  const [investmentBalance, setInvestmentBalance] = useState('0.00');

  const fetchBalances = async () => {
    if (!client || !address || !signingClient) return;
    try {
      const user = await client.getBalance(address, "ustars");
      setWalletBalance((parseInt(user.amount) / 10 ** 6).toFixed(2));
      const cash = await client.getBalance(RECIPIENT_ADDRESS, "ustars");
      setCashBalance((parseInt(cash.amount) / 10 ** 6).toFixed(2));
      const savings = await client.getBalance(VESTING_CONTRACT_ADDRESS, "ustars");
      setSavingsBalance((parseInt(savings.amount) / 10 ** 6).toFixed(2));
      const investmentQuery = { balance: { address: RECIPIENT_ADDRESS } };
      const investment = await signingClient.queryContractSmart(TOKEN_CONTRACT_ADDRESS, investmentQuery);
      setInvestmentBalance((parseInt(investment.balance) / 10 ** 6).toFixed(2));
    } catch (error) { console.error("Failed to fetch balances:", error); }
  };

  useEffect(() => {
    fetchBalances();
  }, [client, address]);

  const handleFund = async () => {
    if (!signingClient || !address || !amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setIsBroadcasting(true);
    setTxHash('');

    const totalStarsAmount = parseFloat(amount) * 10 ** 6;
    const cashAndSavingsAmount = Math.floor(totalStarsAmount); // 100% of STARS go to splitter
    const investmentTokenAmount = Math.floor(totalStarsAmount * 0.1); // 10% equivalent in tokens

    const messages = createSplitMessages(address, RECIPIENT_ADDRESS, cashAndSavingsAmount, investmentTokenAmount);
    if (messages.length === 0) { alert("No funds to send."); return; }

    const fee = { amount: [{ denom: "ustars", amount: "7500" }], gas: "500000" };

    try {
      const result = await signingClient.signAndBroadcast(address, messages, fee, `Funding RemitaDAO`);
      setTxHash(result.transactionHash);
      alert("Transaction successful! Please wait a few seconds for balances to update.");

      // ACTION: Optimistic UI Update for instant feedback
      const cashSplit = 0.70; // 70%
      const savingsSplit = 0.30; // 30%
      const sentAmount = parseFloat(amount);
      setCashBalance(prev => (parseFloat(prev) + sentAmount * cashSplit).toFixed(2));
      setSavingsBalance(prev => (parseFloat(prev) + sentAmount * savingsSplit).toFixed(2));
      setInvestmentBalance(prev => (parseFloat(prev) + sentAmount * 0.1).toFixed(2)); // 10% equivalent
      setWalletBalance(prev => (parseFloat(prev) - sentAmount).toFixed(2));

      setTimeout(fetchBalances, 8000); // Fetch real balances after 8 seconds to confirm
    } catch (error) {
      alert("Transaction failed: " + error.message);
    } finally {
      setIsBroadcasting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardNav onDisconnect={onDisconnect} address={address} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm">Your Wallet Balance</h3>
            <p className="text-4xl font-bold text-white">{walletBalance} STARS</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm">On-Chain Savings Vault</h3>
            <p className="text-4xl font-bold text-yellow-400">{savingsBalance} STARS</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm">Recipient's Investment Tokens</h3>
            <p className="text-4xl font-bold text-purple-400">{investmentBalance} RDSHARE</p>
          </div>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Fund Your Vaults</h2>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Total Amount in STARS" className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white" />
            <Button onClick={handleFund} disabled={isBroadcasting} className="w-full sm:w-auto shrink-0">
              {isBroadcasting ? "Sending..." : "Send Funds"}
            </Button>
            <Button onClick={fetchBalances} variant="secondary" className="p-3"><RefreshCw size={18} /></Button>
          </div>
          {txHash && (
            <div className="mt-4">
              <a href={`https://testnet.stargaze.zone/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Success! View Transaction</a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// --- The Main App Component ---
export default function App() {
  const [address, setAddress] = useState("");
  const [signingClient, setSigningClient] = useState(null);
  const [client, setClient] = useState(null);

  const chainId = "elgafar-1";
  const rpcEndpoint = "https://rpc.elgafar-1.stargaze-apis.com";

  const connectWallet = async () => {
    if (!window.keplr) { alert("Please install the Keplr wallet extension."); return; }
    try {
      await window.keplr.enable(chainId);
      const offlineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      setAddress(accounts[0].address);

      const signingClient = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, offlineSigner);
      const client = await StargateClient.connect(rpcEndpoint);
      setSigningClient(signingClient);
      setClient(client);
    } catch (error) {
      alert(`Failed to connect wallet: ${error.message}`);
    }
  };

  const handleDisconnect = () => {
    if (signingClient) { signingClient.disconnect(); }
    setSigningClient(null);
    setClient(null);
    setAddress("");
  };

  if (signingClient && address) {
    return <Dashboard onDisconnect={handleDisconnect} address={address} signingClient={signingClient} client={client} />;
  }
  return <LandingPage onLaunchApp={connectWallet} />;
}