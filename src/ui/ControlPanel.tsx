import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useInjectedState } from '../hooks/use-injected-state';
import { CAWrapper } from '../utils/chrome-actions-wrapper';

export const ControlPanel = () => {
  const injectedState = useInjectedState();
  const [copyActive, setCopyActive] = useState(injectedState.injected);

  console.log(injectedState.injected);

  const handleInjection = async () => {
    try {
      const tab = await CAWrapper.getActiveTab();

      if (!tab) return;

      const nextState = !copyActive;

      await tab.doInjection(copyActive);

      setCopyActive(nextState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={8}
        sx={{ display: 'flex', alignItems: 'center', paddingLeft: '5px' }}
      >
        Enable copy
      </Grid>
      <Grid item xs={4}>
        <Switch
          disableRipple
          checked={copyActive}
          disabled={!injectedState.metanit}
          onChange={handleInjection}
        />
      </Grid>
    </Grid>
  );
};
