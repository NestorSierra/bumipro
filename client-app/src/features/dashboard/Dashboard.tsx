import Grid from "@mui/material/Grid";
import Banner from "./Banner";
import { Card, CardContent, Typography } from "@mui/material";
export default function Dashboard() {
  return (
    <div style={{ paddingBottom: "30px" }}>
      <Banner />
      <Grid container spacing={3} marginTop={1}>
        <Grid item xs={12} md={6} lg={6} xl={3} className="d-flex">
          <Card className="card">
            <CardContent>
              <Typography variant="h6">About Us</Typography>
              <Typography variant="body1">
                Bumipro is your go-to platform for finding the perfect
                properties and rooms for rent. Whether you're a tenant searching
                for your ideal living space or a landlord looking to list your
                properties, we've got you covered.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={3} className="d-flex">
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Find Your Ideal Place</Typography>
              <Typography variant="body1">
                Discover this stunning property with breathtaking views.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={3} className="d-flex">
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Featured Property</Typography>
              <Typography variant="body1">
                Discover this stunning property with breathtaking views.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={3} className="d-flex">
          <Card className="card">
            <CardContent>
              <Typography variant="h6">Manage Your Listings</Typography>
              <Typography variant="body1">
                If you're a property owner, Bumipro provides you with tools to
                efficiently manage your listings. Easily track and communicate
                with applicants who are interested in your properties or rooms.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
