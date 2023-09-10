export interface Tab extends chrome.tabs.Tab {
  isMetanit: boolean;
  setInjected(value: boolean): Promise<void>;
  getInjected(): Promise<boolean>;
  doInjection(revert?: boolean): Promise<void>;
}
