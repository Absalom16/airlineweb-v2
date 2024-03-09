
import { Card, CardContent} from '@mui/material';

const FlightCard = ({ children,}) => {
  return (
    <Card variant="outlined" style={{ marginBottom: '20px' }}>
      <CardContent>
        {children}
       
      </CardContent>
    </Card>
  );
};

export default FlightCard;
