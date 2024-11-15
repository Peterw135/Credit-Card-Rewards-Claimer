const config = {
  selectors: {
    addButton: 'mds-icon[type="ico_add_circle"][data-testid="commerce-tile-button"]',
    backButton: '#back-button'
  },
  delay: 1000,
  initialWait: 15000
};

async function claimRewards() {
  console.log('Waiting for page to load...');
  await new Promise(resolve => setTimeout(resolve, config.initialWait));
  
  console.log('Checking for buttons...');
  const buttons = document.querySelectorAll(config.selectors.addButton);
  console.log('Found buttons:', buttons.length);
  
  for (const button of buttons) {
    button.click();
    await new Promise(resolve => setTimeout(resolve, config.delay * 5));
    
    console.log('Still Running');
    const backButton = await waitForElement(config.selectors.backButton);
    if (backButton) {
      console.log('Back button found');
      backButton.click();
      await new Promise(resolve => setTimeout(resolve, config.delay));
    }
  }
}

async function waitForElement(selector) {
  return new Promise(resolve => {
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

claimRewards();