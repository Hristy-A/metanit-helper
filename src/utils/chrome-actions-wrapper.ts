import { CSSProperties } from 'react';
import { Tab } from '../types';

const metanit = 'metanit.com';

export class CAWrapper {
  public static async getActiveTab(): Promise<Tab | null> {
    const tab = await (await chrome.tabs.query({ active: true }))[0];

    if (!tab) return null;

    return new Proxy(tab, {
      get(target, prop) {
        if (prop === 'isMetanit') return !!target.url?.includes(metanit);
        if (prop === 'getInjected') {
          return async () => {
            if (!(target as Tab).isMetanit) return false;

            return chrome.scripting.executeScript({
              target: { tabId: target.id! },
              func: () =>
                !!document.documentElement.hasAttribute('data-copy-injected'),
            });
          };
        }
        if (prop === 'doInjection') {
          return async (revert = false) => {
            await chrome.scripting.executeScript({
              target: { tabId: target.id! },
              func: inject,
              args: [revert],
            });

            chrome.scripting.executeScript({
              target: { tabId: target.id! },
              func: (injected) => {
                if (injected)
                  document.documentElement.setAttribute(
                    'data-copy-injected',
                    ''
                  );
                else
                  document.documentElement.removeAttribute(
                    'data-copy-injected'
                  );
              },
              args: [revert!],
            });
          };
        }
      },
    }) as Tab;
  }
}

function inject(revert: boolean) {
  const applyStyles = (htmlElement: Element, styles: CSSProperties) => {
    Object.entries(styles).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      htmlElement.style[key] = value;
    });
  };

  const codeBlocks = Array.from(document.querySelectorAll('.code'));

  codeBlocks.forEach((codeBlock) => {
    const codeContainer = codeBlock.children[0];

    applyStyles(codeContainer, {
      position: 'relative',
    });

    if (revert) {
      codeContainer.querySelector('.copy-button')?.remove();
      return;
    }

    if (codeContainer.querySelector('.copy-button')) return;

    const copyButton = document.createElement('button');
    copyButton.addEventListener('click', () => {
      const lines = Array.from(codeBlock.querySelectorAll('.line'));

      const result = lines
        .map((line) =>
          Array.from(line.children)
            .map((linePart) => linePart.textContent)
            // eslint-disable-next-line no-irregular-whitespace
            .map((codePart) => codePart!.replace(/ /gu, ' '))
            .join(' ')
        )
        .join('\n');

      navigator.clipboard.writeText(result);
    });

    applyStyles(copyButton, {
      position: 'absolute',
      top: '0px',
      left: '-30px',
      opacity: '0px',
    });
    copyButton.textContent = 'copy';
    copyButton.className = 'copy-button';

    codeContainer.appendChild(copyButton);
  });
}
