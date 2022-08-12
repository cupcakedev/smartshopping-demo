import React, { useEffect, useState } from 'react';
import { requireShops } from 'src/utils/utils';
import { Container, Button } from './styled_components';

export const Popup = () => {
  const [isDevMod, setIsDevMod] = useState<boolean>(false);

  const storageChangeHandler = (changes: {
    [key: string]: chrome.storage.StorageChange;
  }) => {
    if ('env_isDevMod' in changes) setIsDevMod(changes.env_isDevMod.newValue);
  };

  useEffect(() => {
    chrome.storage.local.get(
      ['env_isDevMod'],
      (items) => {
        setIsDevMod(!!items?.env_isDevMod);
      }
    );
    chrome.storage.onChanged.addListener(storageChangeHandler);
    return () => {
      chrome.storage.onChanged.removeListener(storageChangeHandler);
    };
  }, []);

  return (
    <Container>
      <Button
        enabled={isDevMod}
        onClick={() => chrome.storage.local.set({ env_isDevMod: !isDevMod })}
      >
        Dev mode
      </Button>
    </Container>
  );
};
