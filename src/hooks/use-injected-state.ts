import { useContext } from 'react';
import { InjectedStateContext } from '../providers/injected-state-provider';

export const useInjectedState = () => useContext(InjectedStateContext);
