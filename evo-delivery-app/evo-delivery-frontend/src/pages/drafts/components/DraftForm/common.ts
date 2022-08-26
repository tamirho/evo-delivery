export const a11yProps = (level: number, index: number) => {
  return {
    id: `simple-tab-${level}-${index}`,
    'aria-controls': `simple-tabpanel-${level}-${index}`,
  };
};
