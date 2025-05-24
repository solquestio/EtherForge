'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  stage: 'thinking' | 'generating' | 'compiling' | 'deploying' | 'verifying';
  progress?: number;
}

const stageInfo = {
  thinking: {
    icon: '🧠',
    text: 'AI is analyzing your request...',
    color: 'text-blue-400'
  },
  generating: {
    icon: '⚡',
    text: 'Generating smart contracts...',
    color: 'text-solana-green'
  },
  compiling: {
    icon: '🔨',
    text: 'Compiling contracts...',
    color: 'text-yellow-400'
  },
  deploying: {
    icon: '🚀',
    text: 'Deploying to blockchain...',
    color: 'text-purple-400'
  },
  verifying: {
    icon: '✅',
    text: 'Verifying contracts...',
    color: 'text-green-400'
  }
};

export default function LoadingSpinner({ stage, progress }: LoadingSpinnerProps) {
  const info = stageInfo[stage];

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      {/* Animated Icon */}
      <motion.div
        className="text-4xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: stage === 'thinking' ? [0, 10, -10, 0] : 0
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {info.icon}
      </motion.div>

      {/* Status Text */}
      <motion.p 
        className={`text-sm font-medium ${info.color}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {info.text}
      </motion.p>

      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="w-full max-w-xs">
          <div className="w-full bg-solana-surface rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-solana-green to-solana-blue h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-1 text-center">{progress}%</p>
        </div>
      )}

      {/* Spinning Dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-solana-green rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  );
} 