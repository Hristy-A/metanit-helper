document.applyStyles = function (htmlElement, styles) {
  Object.entries(styles).forEach(([key, value]) => {
    htmlElement.style[key] = value;
  });
};

const codeBlocks = Array.from(document.querySelectorAll('.code'));

codeBlocks.forEach((codeBlock) => {
  const codeContainer = codeBlock.children[0];

  document.applyStyles(codeContainer, {
    position: 'relative',
  });

  const copyButton = document.createElement('button');
  copyButton.addEventListener('click', () => {
    const lines = Array.from(codeBlock.querySelectorAll('.line'));

    const result = lines
      .map((line) =>
        Array.from(line.children)
          .map((linePart) => linePart.textContent)
          .map((codePart) => codePart.replace(/ /gu, ' '))
          .join(' ')
      )
      .join('\n');

    navigator.clipboard.writeText(result);
  });

  document.applyStyles(copyButton, {
    position: 'absolute',
    top: '0px',
    left: '-30px',
    opacity: '0px',
  });
  copyButton.textContent = 'c';

  codeContainer.appendChild(copyButton);
});
