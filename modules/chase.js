const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const config = {
  delay: 1000,
  initialWait: 5000
};

async function claimRewards() {
  await sleep(config.initialWait);
  // Prompt To Run
  if (!confirm('Are you sure you want to start claiming Chase rewards?')) {
    return;
  }

  // Click not added 
  const innerCheckbox = document.querySelector('mds-checkbox[label="Not added"][data-testid="Not added"]')?.shadowRoot.querySelector('input[type="checkbox"]');
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
    await sleep(config.delay * 1);

    // Go back
    const backButton = document.getElementById('mds-secondary-back-navbar')
      ?.shadowRoot
      .querySelector('button#back-button');
    backButton.click();

    await sleep(config.delay * 3);
  }
}

claimRewards();