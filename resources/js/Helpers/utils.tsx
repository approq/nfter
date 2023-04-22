export const convertAddress = (address: string): string =>
    `${address.slice(0, 5)}...${address.slice(Math.max(0, address.length - 5))}`;
