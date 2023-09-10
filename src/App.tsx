import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ControlPanel } from './ui/ControlPanel';
import { styled } from '@mui/material';
import { InjectedStateProvider } from './providers/injected-state-provider';

export const App: FC<{ injected: boolean; metanit: boolean }> = ({
  injected,
  metanit,
}) => (
  <InjectedStateProvider injected={injected} metanit={metanit}>
    <GlobalContainer>
      <CssBaseline />
      <ControlPanel />
    </GlobalContainer>
  </InjectedStateProvider>
);

const GlobalContainer = styled('div')({
  width: '220px',
});
