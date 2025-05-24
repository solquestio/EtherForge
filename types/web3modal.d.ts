declare module 'web3modal' {
  interface IProviderOptions {
    [key: string]: {
      package: any;
      options?: any;
      connector?: (...args: any[]) => Promise<any>;
      display?: {
        logo?: string;
        name?: string;
        description?: string;
      };
    };
  }

  interface IWeb3ModalOptions {
    cacheProvider?: boolean;
    disableInjectedProvider?: boolean;
    providerOptions?: IProviderOptions;
    network?: string;
    theme?: string | {
      background?: string;
      main?: string;
      secondary?: string;
      border?: string;
      hover?: string;
    };
  }

  class Web3Modal {
    constructor(options?: IWeb3ModalOptions);
    connect(): Promise<any>;
    connectTo(id: string): Promise<any>;
    toggleModal(): void;
    clearCachedProvider(): void;
    setCachedProvider(id: string): void;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback?: (...args: any[]) => void): void;
  }

  export default Web3Modal;
}

declare module '@walletconnect/web3-provider' {
  interface IWalletConnectProviderOptions {
    infuraId?: string;
    rpc?: {
      [chainId: number]: string;
    };
    bridge?: string;
    qrcode?: boolean;
    qrcodeModalOptions?: {
      mobileLinks?: string[];
    };
  }

  class WalletConnectProvider {
    constructor(opts: IWalletConnectProviderOptions);
    enable(): Promise<string[]>;
    disconnect(): Promise<void>;
    on(event: string, callback: (...args: any[]) => void): void;
    removeListener(event: string, callback: (...args: any[]) => void): void;
  }

  export default WalletConnectProvider;
}
