'use client';

import React, { useState } from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

interface CodeFile {
  name: string;
  content: string;
  language: string;
}

interface CodeEditorProps {
  files?: CodeFile[];
  activeFile?: CodeFile | null;
  setActiveFile?: (file: CodeFile) => void;
  projectName?: string;
  value?: string;
  language?: string;
  onChange?: (value: string) => void;
  className?: string;
  [key: string]: any; // Allow additional props
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  files = [], 
  activeFile: propActiveFile, 
  setActiveFile: propSetActiveFile, 
  projectName,
  value,
  language,
  onChange,
  className = ''
}) => {
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  
  // Handle direct value prop (single file mode)
  if (value !== undefined) {
    return (
      <div className={`h-full flex flex-col bg-solana-surface rounded-lg overflow-hidden ${className}`}>
        <div className="p-4 border-b border-solana-border/30 bg-solana-surface flex items-center">
          <CodeBracketIcon className="h-4 w-4 mr-2 text-solana-green" />
          <span className="text-sm font-medium text-slate-300">Code Editor</span>
        </div>
        <div className="flex-1 overflow-auto p-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap break-words">
            <code className={`language-${language || 'typescript'}`}>
              {value}
            </code>
          </pre>
        </div>
      </div>
    );
  }

  // Handle files array mode
  const currentActiveFile = propActiveFile || (files.length > 0 ? files[activeFileIndex] : null);
  const handleFileChange = (index: number) => {
    setActiveFileIndex(index);
    if (propSetActiveFile && files[index]) {
      propSetActiveFile(files[index]);
    }
  };

  if (files.length === 0) {
    return (
      <div className={`h-full flex flex-col bg-solana-surface rounded-lg overflow-hidden ${className}`}>
        <div className="p-4 border-b border-solana-border/30 bg-solana-surface flex items-center">
          <CodeBracketIcon className="h-4 w-4 mr-2 text-solana-green" />
          <span className="text-sm font-medium text-slate-300">Code Editor</span>
        </div>
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          <p>No code to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col bg-solana-surface rounded-lg overflow-hidden ${className}`}>
      {/* Editor header */}
      <div className="p-4 border-b border-solana-border/30 bg-solana-surface flex items-center justify-between">
        <div className="flex items-center">
          <CodeBracketIcon className="h-4 w-4 mr-2 text-solana-green" />
          <span className="text-sm font-medium text-slate-300">Code Editor</span>
        </div>
        <span className="text-xs text-slate-500">{files.length} file{files.length !== 1 ? 's' : ''}</span>
      </div>
      
      {/* Tabs */}
      <div className="flex bg-solana-surface border-b border-solana-border/30 overflow-x-auto">
        {files.map((file, index) => (
          <button
            key={index}
            onClick={() => handleFileChange(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeFileIndex === index 
                ? 'text-solana-green border-b-2 border-solana-green' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto bg-solana-surface p-4">
        {files.length > 0 && (
          <pre className="text-sm font-mono">
            <code className={`language-${files[activeFileIndex].language}`}>
              {files[activeFileIndex].content}
            </code>
          </pre>
        )}
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t border-solana-border/30 bg-solana-surface/80 backdrop-blur-sm flex justify-end">
        <button 
          className="px-4 py-1.5 bg-solana-green/90 hover:bg-solana-green text-solana-darker text-sm font-medium rounded-lg transition-colors"
          onClick={() => {
            // Handle download functionality
            if (files[activeFileIndex]) {
              const element = document.createElement('a');
              const file = new Blob([files[activeFileIndex].content], { type: 'text/plain' });
              element.href = URL.createObjectURL(file);
              element.download = files[activeFileIndex].name;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }
          }}
        >
          Download {files[activeFileIndex]?.name || 'File'}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
