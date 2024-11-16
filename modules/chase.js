import { sleep } from './helper.js';

const config = {
  delay: 1000,
  initialWait: 5000
};

async function claimRewards() {
  await sleep(config.initialWait);

  // Click not added 
  const checkbox = document.querySelector('mds-checkbox[label="Not added"][data-testid="Not added"]');
  const shadowRoot = checkbox.shadowRoot;
  const innerCheckbox = shadowRoot.querySelector('input[type="checkbox"]');
  innerCheckbox.click();
  await sleep(config.delay);
  
  while (true) {
    // Claim Reward
    const gridContainer = document.querySelector('[data-testid="offerTileGridContainer"]');
    const offerButtons = gridContainer.querySelectorAll('div[role="button"][data-cy="commerce-tile"]');
    if (offerButtons.length === 0) {
      break;
    }
    offerButtons[0].click();
    await sleep(config.delay * 2);

    // Go back
    const shadowHost = document.getElementById('mds-secondary-back-navbar');
    const shadowRoot = shadowHost.shadowRoot;
    const backButton = shadowRoot.querySelector('button#back-button');
    backButton.click();

    await sleep(config.delay * 5);
  }
}

claimRewards();