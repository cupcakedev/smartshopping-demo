import React, { useEffect, useState } from 'react';
import { requireShops } from 'src/utils';
import { Container, Button } from './styled_components';

export const Popup = () => {
  const [isDevConfigs, setIsDevConfigs] = useState<boolean>(false);

  const storageChangeHandler = (changes: {
    [key: string]: chrome.storage.StorageChange;
  }) => {
    if ('env_isDevConfigs' in changes) setIsDevConfigs(changes.env_isDevConfigs.newValue);
  };

  useEffect(() => {
    chrome.storage.local.get(
      ['env_isDevConfigs'],
      (items) => {
        setIsDevConfigs(items.env_isDevConfigs);
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
        enabled={isDevConfigs}
        onClick={() => chrome.storage.local.set({ env_isDevConfigs: !isDevConfigs })}
      >
        Dev configs
      </Button>
    </Container>
  );
};
