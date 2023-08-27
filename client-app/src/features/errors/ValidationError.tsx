import { Alert, AlertTitle, List, ListItemText, ListItem } from "@mui/material";

interface Props {
  errors: any;
}

export default function ValidationError({ errors }: Props) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {errors && (
        <List>
          {errors.map((err: string, i: any) => (
            <ListItem key={i}>
              <ListItemText>{err}</ListItemText>
            </ListItem>
          ))}
        </List>
      )}
    </Alert>
  );
}
