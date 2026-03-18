import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Gift, Coins, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'initial' | 'opened' | 'processing' | 'done'>('initial');
  const [depositAddress, setDepositAddress] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [progress, setProgress] = useState(0);
  const [confirmations, setConfirmations] = useState(0);
  const [txHash, setTxHash] = useState('');
  const [isFullyConfirmed, setIsFullyConfirmed] = useState(false);

  useEffect(() => {
    if (step === 'done') {
      // Generate fake transaction hash
      const chars = '0123456789abcdef';
      let hash = '0x';
      for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * chars.length)];
      setTxHash(hash);
      setConfirmations(0);
      setIsFullyConfirmed(false);

      // Simulate block confirmations
      const interval = setInterval(() => {
        setConfirmations(prev => {
          if (prev >= 12) {
            clearInterval(interval);
            setIsFullyConfirmed(true);
            return 12;
          }
          return prev + 1;
        });
      }, 1500); // 1.5s per confirmation for better UX

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleOpen = () => {
    setStep('opened');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositAddress || !walletAddress) return;
    setStep('processing');
    setProgress(0);
    
    // Simulate processing with progress bar
    const duration = 3000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setStep('done');
      }
    }, intervalTime);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full">
        {step === 'initial' && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-amber-400">Mystery Reward</h1>
              <p className="text-zinc-400">Click the treasure box to reveal your prize!</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl group-hover:bg-amber-500/30 transition-colors" />
              <div className="relative bg-zinc-900 border border-zinc-800 p-12 rounded-3xl shadow-2xl">
                <Gift className="w-32 h-32 text-amber-400" strokeWidth={1.5} />
              </div>
            </motion.button>
          </motion.div>
        )}

        {step === 'opened' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto"
              >
                <Coins className="w-10 h-10 text-amber-400" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-amber-400">JACKPOT!</h2>
                <p className="text-xl mt-2">You won <span className="font-bold text-emerald-400">1,000 USDT</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">USDT Deposit Address (TRC20/ERC20)</label>
                <input 
                  type="text" 
                  required
                  value={depositAddress}
                  onChange={(e) => setDepositAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="Enter deposit address..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Wallet Address</label>
                <input 
                  type="text" 
                  required
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="Enter wallet address..."
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-xl px-4 py-4 flex items-center justify-center space-x-2 transition-colors mt-4 cursor-pointer"
              >
                <span>Claim Reward</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 shadow-2xl flex flex-col items-center text-center space-y-8 w-full"
          >
            <Loader2 className="w-16 h-16 text-amber-400 animate-spin" />
            <div className="space-y-4 w-full">
              <div>
                <h3 className="text-2xl font-bold">Transfer in Process</h3>
                <p className="text-zinc-400 mt-2">Connecting to blockchain network...</p>
              </div>
              
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm font-medium text-zinc-400">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-zinc-950 rounded-full h-3 border border-zinc-800 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full relative transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center w-full space-y-6"
          >
            {isFullyConfirmed ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <CheckCircle2 className="w-16 h-16 text-emerald-400" />
              </motion.div>
            ) : (
              <Loader2 className="w-16 h-16 text-amber-400 animate-spin" />
            )}
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">
                {isFullyConfirmed ? 'Transfer Complete' : 'Transfer in Progress'}
              </h3>
              <p className="text-zinc-400 text-sm">
                {isFullyConfirmed 
                  ? 'Your 1,000 USDT has been successfully deposited.' 
                  : 'Waiting for network confirmations...'}
              </p>
            </div>

            <div className="w-full bg-zinc-950 rounded-xl p-4 space-y-3 border border-zinc-800 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Amount</span>
                <span className="font-mono font-medium text-emerald-400">+1,000.00 USDT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Tx Hash</span>
                <span className="font-mono text-zinc-300">
                  {txHash ? `${txHash.substring(0, 8)}...${txHash.substring(txHash.length - 6)}` : 'Generating...'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Network</span>
                <span className="text-zinc-300">TRC20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">Confirmations</span>
                <span className={`font-mono ${isFullyConfirmed ? 'text-emerald-400' : 'text-amber-400 animate-pulse'}`}>
                  {confirmations} / 12
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="fixed bottom-4 text-center text-xs text-zinc-600">
        FYP Project - Not a real financial application
      </div>
    </div>
  );
}
