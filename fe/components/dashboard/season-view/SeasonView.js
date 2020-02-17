import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import ParticipantsList from '../participants-list';
import WallsList from '../walls-list';

const styles = theme => ({
  wrapper: {
    flexGrow: '1',
    margin: '0 auto',
  }
});

const SeasonView = (props) => {
  const {
    classes,
    season,
    client,
  } = props;
  const startsAt = DateTime.fromISO(season.startsAt);
  const endsAt = DateTime.fromISO(season.endsAt);
  startsAt.setLocale('pt-BR');
  endsAt.setLocale('pt-BR');

  return (
    <Fragment>
      <Container className={classes.wrapper}>
        <Grid
          container
          direction="row"
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography variant="h6">BBB {season.title} - de {startsAt.toFormat('dd/MM/yyyy')} até {endsAt.toFormat('dd/MM/yyyy')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ParticipantsList client={client} season={season} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WallsList client={client} season={season} />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

SeasonView.propTypes = {
  season: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SeasonView);
