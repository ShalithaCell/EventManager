import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

// utils
import { useState } from 'react';
import { Alert } from '@mui/lab';
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgIconStyle from '../../SvgIconStyle';
import communicationService from '../../../utils/communication/communication.service';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

EventCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
  token: PropTypes.string
};

export default function EventCard({ post, index, token }) {
  const { id, author, Summary, location, Description, imageURL, Start, end, attendees, Category } =
    post;
  const latestPostLarge = false;
  const latestPost = false;

  const POST_INFO = [
    { number: 20, icon: messageCircleFill },
    { number: 20, icon: eyeFill },
    { number: 20, icon: shareFill }
  ];

  const [open, setOpen] = useState(false);

  const login = () => {
    window.location.href = 'http://localhost:5000/api/v1/auth';
  };

  const sharePost = () => {
    console.log(post.id);
    communicationService.sharePost(
      {
        code: token,
        post
      },
      (res) => {
        console.log(res);
        setOpen(true);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && { display: 'none' })
            }}
          />
          <AvatarStyle
            alt=""
            src=""
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          <CoverImgStyle alt={Summary} src={imageURL} />
        </CardMediaStyle>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            {fDate(Start)}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {Summary}
          </TitleStyle>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {Category}
          </TitleStyle>

          <TitleStyle
            to="#"
            color="inherit"
            variant="body1"
            underline="hover"
            component={RouterLink}
            sx={{
              ...(latestPostLarge && { typography: 'h5', height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: 'common.white'
              })
            }}
          >
            {Description}
          </TitleStyle>

          <InfoStyle>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Box component={Icon} icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </InfoStyle>
          <Box sx={{ mt: '2rem' }}>
            <Divider variant="middle" />
            {token ? (
              <Button
                fullWidth
                target="_blank"
                variant="contained"
                className="mt-6"
                color="secondary"
                onClick={sharePost}
                startIcon={<ShareIcon />}
              >
                Share to LinkedIn
              </Button>
            ) : (
              <Button
                fullWidth
                target="_blank"
                variant="contained"
                className="mt-6"
                color="warning"
                onClick={login}
                startIcon={<ShareIcon />}
              >
                Login to LinkedIn For Share
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Successful</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Event shared successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
