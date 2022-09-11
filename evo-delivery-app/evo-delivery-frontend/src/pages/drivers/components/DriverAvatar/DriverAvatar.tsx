import { Avatar } from '@mui/material';

export type DriverAvatarProps = {
  name: string;
  color?: string;
};
export const DriverAvatar = ({ name, color }: DriverAvatarProps) => {
  const acronyms = name.split(' ').map((word) => word[0]);

  return (
    <Avatar sx={color ? { bgcolor: color } : {}}>
      {acronyms.at(0)}
      {acronyms.at(-1)}
    </Avatar>
  );
};
