import {Driver} from '@backend/types';
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography,} from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import {EntityList} from '../../../../features/entity-list/EntityList';
import {useGetEntities} from '../../../../hooks/entities-api/use-get-entities';
import {useNavigateToChild} from '../../../../hooks/router/use-navigate-to-child';

export const Drivers = () => {
    const {data: drivers, isFetching, isLoading, isError} = useGetEntities();

    const goToDriver = useNavigateToChild();

    return (
        <EntityList
            isLoading={isFetching || isLoading}
            isError={isError}
            items={drivers}
            renderItem={(driver: Driver) => (
                <>
                    <ListItem
                        key={driver._id}
                        disablePadding
                        alignItems='center'
                    >
                        <ListItemButton onClick={() => goToDriver(driver._id)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DriveEtaIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`ID: ${driver._id}`}
                                secondary={
                                    <>
                                        <Typography sx={{display: 'inline'}} component='span' variant='body2'
                                                    color='text.primary'>
                                            {`Name: ${driver.name}`}
                                        </Typography>
                                        <br/>
                                        <Typography component='span' variant='caption' color='text.muted'>
                                            {`Capacity: ${driver.maxCapacity}`}
                                            <br/>
                                            {`Distance: ${driver.maxDistance}`}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider key={`divider_${driver._id}`} variant='middle' component='li'/>
                </>
            )}
        />
    );
};
