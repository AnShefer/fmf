/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/media-has-caption */
import moment from 'moment';
import { toast } from 'react-toastify';
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { PlayCircleOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  Stack,
  Avatar,
  Button,
  Popper,
  Divider,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
  CircularProgress,
} from '@mui/material';

import { GET_MEMBER_USER_MEDIAS } from 'src/constants/apiEndPoints';

import PhotosVideos from 'src/components/Membermedias';
// import SearchResults from 'src/components/searchResults';
import DescriptionModel from 'src/components/ViewDetails';

import httpRequest from '../../axios';

const MainContent = ({
  CurrentMedias = null,
  handleDownload = () => {},
  Downloading = false,
  OpenModel,
  setOpenModel,
  Showingloading,
  handleSingleItem = () => {},
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      // height: '60vh',
      overflowY: 'auto',
      // alignItems: 'center',
    }}
  >
    {Showingloading && (
      <Box
        sx={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography variant="h6" sx={{ fontWeight: 300, fontSize: '24px', color: 'blue' }}>
          <CircularProgress />
        </Typography>
      </Box>
    )}

    {Object.keys(CurrentMedias).length !== 0 && (
      <Box
        sx={{
          overflowy: 'auto',
          height: '400px',
          position: 'relative',
        }}
      >
        <Typography
          variant="h6"
          onClick={() => setOpenModel(true)}
          sx={{
            fontWeight: 300,
            fontSize: '24px',
            color: 'blue',
            position: {
              xs: 'relative',
              sm: 'absolute',
            },
            textAlign: 'right',
            right: {
              xs: '0',
              sm: '10px',
            },
            top: '0',
            cursor: 'pointer',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          View description
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            fontSize: '24px',
            color: '#000',
            width: { xs: '100%', sm: '70%' },
          }}
          gutterBottom
        >
          {CurrentMedias?.title}
        </Typography>
        <Typography
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
          }}
        >
          {CurrentMedias?.type === 'image' ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={CurrentMedias?.thumbnail}
              style={{ borderRadius: '10px', width: 'auto', height: '40vh' }}
              alt="image"
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : null}
          {CurrentMedias?.type === 'video' ? (
            <video
              // src={}
              style={{ borderRadius: '10px', width: '100%', height: '40vh' }}
              alt="video"
              controls
              muted
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              // disablePictureInPicture
              disableRemotePlayback
            >
              {/* <track src="captions_en.vtt" kind="captions" srcLang="en" label="English" />
               */}
              <source src={CurrentMedias?.thumbnail} type="video/mp4" />
            </video>
          ) : null}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt="4px">
          <Button
            disabled={Downloading}
            variant="text"
            sx={{
              color: '#024397',
              textDecoration: 'underline',
              ':hover': {
                backgroundColor: 'transparent',
              },
              fontWeight: 500,
              fontSize: '20px',
              textTransform: 'none',
            }}
            onClick={handleDownload}
          >
            {Downloading ? (
              <CircularProgress size="1.5rem" sx={{ color: '#137EF2' }} />
            ) : (
              'Download'
            )}
          </Button>
          <Typography variant="body2" sx={{ color: '#000', fontWeight: 300, fontSize: '20px' }}>
            {moment(CurrentMedias?.createdAt).format('DD-MM-YYYY')}
          </Typography>
        </Box>
      </Box>
    )}

    <DescriptionModel
      content={CurrentMedias?.desp}
      openDialog={OpenModel}
      setOpenModel={setOpenModel}
    />
  </Box>
);
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          color: 'green', // This sets the color of the options text to green
          fontWeight: '500',
        },
      },
    },
  },
});
const CustomPopper = (props) => <Popper {...props} placement="top-start" />;
const ChatInput = ({
  handleSearchMeias = () => {},
  handleSingleItem = () => {},
  filterSearchItems,
  searchItems,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    {/* <Stack
      spacing={2}
      sx={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={filterSearchItems?.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            placeholder="Emit"
            value={searchItems}
            onChange={(e) => handleSearchMeias(e.target.value)}
            {...params}
          />
        )}
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          />
        )}
      />
    </Stack> */}
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          value={searchItems} // Bind value to searchItems state
          onInputChange={(e, newInputValue) => {
            handleSearchMeias(newInputValue); // Update searchItems on input change
          }}
          options={filterSearchItems?.map((option) => option.title)}
          PopperComponent={CustomPopper} // Use the custom Popper to force the dropdown to open above
          renderInput={(params) => <TextField placeholder="Emit" {...params} />}
        />
      </Stack>
    </ThemeProvider>

    <IconButton
      onClick={handleSingleItem}
      color="primary"
      sx={{
        ml: 1,
        padding: '15px',
        borderRadius: '8px',
        background: 'linear-gradient(134deg, #034599 8.2%, #137CEE 80.23%)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.3725 0.0897566L2.21025 5.13031C-0.469516 5.80026 -0.804035 9.47332 1.71061 10.6164L7.9227 13.4401C9.1963 14.0189 10.575 14.228 11.9147 14.0853C11.772 15.4251 11.981 16.8037 12.56 18.0773L15.3837 24.2894C16.5268 26.8041 20.1998 26.4695 20.8697 23.7898L25.9102 3.62751C26.4445 1.49094 24.5091 -0.444382 22.3725 0.0897566ZM8.99848 11.0733C10.2166 11.627 11.5799 11.6693 12.8007 11.2363C13.2622 11.0726 13.7032 10.841 14.1084 10.5435C14.1648 10.502 14.2206 10.4592 14.2755 10.4153L17.2507 8.03518C17.7242 7.65636 18.3437 8.27587 17.9648 8.7494L15.5848 11.7245C15.5407 11.7795 15.4981 11.8353 15.4566 11.8917C15.1591 12.2968 14.9274 12.7379 14.7638 13.1993C14.3307 14.4202 14.373 15.7835 14.9266 17.0016L17.7503 23.2136C17.8749 23.4873 18.2747 23.4509 18.3476 23.1593L23.3882 2.99698C23.4463 2.76439 23.2356 2.55371 23.0031 2.61186L2.84079 7.65242C2.54905 7.72534 2.51264 8.12521 2.78639 8.24964L8.99848 11.0733Z"
          fill="white"
        />
      </svg>
    </IconButton>
  </Box>
);

const MainLayout = ({
  showAll,
  user,
  CurrentMedias,
  handleDownload,
  Downloading,
  handleSearchMeias,
  handleSearch,
  filterSearchItems,
  searchItems,
  setOpenModel,
  OpenModel,
  handleSingleItem = () => {},
  Showingloading,
  setCurrentMedias = () => {},
}) => (
  <Box disableGutters>
    <Box
      sx={{
        backgroundColor: '#FFF',
        borderRadius: '20px',
        boxShadow: '0px 4px 4.8px 0px rgba(0, 0, 0, 0.09)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          boxShadow: '0px 4px 4.8px 0px rgba(0, 0, 0, 0.09)',
        }}
      >
        <Avatar src={user?.profilePic} alt="Harry Madison" />
        <Typography variant="h6" sx={{ ml: 2, fontWeight: 500, fontSize: '13px', color: '#000' }}>
          {user?.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: { xs: 'column', md: 'row', height: 'calc(100vh - 35vh)' },
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '30%', sm: '100%' }, p: 2, overflowY: 'auto' }}>
          <Box
            sx={{
              // backgroundColor: '#E0F2FF',
              borderRadius: '10px',
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '12px', fontWeight: 600, color: '#000' }}>
              Tutorial:
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 400, color: '#6DAB24' }}>
              How to access messages
            </Typography>
            <Box
              sx={{
                backgroundColor: '#EBF3FF',
                borderRadius: '20px',
                mt: 1,
                width: { xs: '250px', md: '250px', sm: '250px' },
                height: { xs: '150px', md: '150px', sm: '150px' },
              }}
            >
              <video
                width="100%"
                height="100%"
                controls
                controlsList="nodownload"
                disablePictureInPicture
                style={{ borderRadius: '20px' }}
              >
                <source
                  src="https://forever-messages-dev-01.syd1.cdn.digitaloceanspaces.com/Videob.mp4"
                  type="video/mp4"
                />
              </video>
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, fontSize: '16px', pl: '30px', color: '#000' }}
          >
            {/* Search Results... */}
          </Typography>
          <Box
            sx={{
              height: 'calc(100vh - 35vh)',
              overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 8 },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#024397',
                borderRadius: '4px',
              },
            }}
          >
            {/* <SearchResults
              setCurrentMedias={setCurrentMedias}
              results={filterSearchItems}
              showAll={showAll}
            /> */}
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
        <Box sx={{ flex: 1, p: 2 }}>
          <MainContent
            handleDownload={handleDownload}
            CurrentMedias={CurrentMedias}
            Downloading={Downloading}
            OpenModel={OpenModel}
            setOpenModel={setOpenModel}
            handleSingleItem={handleSingleItem}
            Showingloading={Showingloading}
          />
        </Box>
      </Box>
      <Box sx={{ p: 2, boxShadow: '0px -4px 4.8px 0px rgba(0, 0, 0, 0.09)' }}>
        <ChatInput
          searchItems={searchItems}
          handleSearch={handleSearch}
          handleSearchMeias={handleSearchMeias}
          handleSingleItem={handleSingleItem}
          filterSearchItems={filterSearchItems}
        />
      </Box>
    </Box>
  </Box>
);

const ProfileSection = ({
  showAll,
  setShowAll,
  user,
  AllMedias,
  setDownloading = false,
  setCurrentMedias = () => {},
}) => {
  const totalItems = AllMedias?.length;

  return (
    <Box
      sx={{
        p: 2,
        pt: '20px',
        backgroundColor: '#FFF',
        borderRadius: '20px',
        boxShadow: '0px 4px 4.8px 0px rgba(0, 0, 0, 0.09)',
        width: { xs: '100%', md: '340px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
          boxShadow: '0px 4.8px 0px rgba(0, 0, 0, 0.09)',
        }}
      >
        <Avatar
          src={user?.profilePic}
          alt="Harry Madison"
          sx={{ width: 100, height: 100, mb: 1, pt: '0px' }}
        />
        <Typography variant="h6" sx={{ fontWeight: 500, pb: '10px', color: '#000' }}>
          {user?.name}
        </Typography>
        <Typography sx={{ color: '#6DAB24', fontSize: '13px', textAlign: 'center' }}>
          HERE ARE ALL YOUR LOVED ONES MESSAGES, PHOTOS AND VIDEO MESSAGES
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography sx={{ color: '#000', fontWeight: 500, fontSize: '14px' }}>
          Photos & Videos ({totalItems})
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#024397',
            textDecoration: 'underline',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '10px',
          }}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Hide All' : 'Show All'}
        </Typography>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 45vh)',
        }}
      >
        <PhotosVideos
          setDownloading={setDownloading}
          setCurrentMedias={setCurrentMedias}
          items={AllMedias}
          showAll={showAll}
        />
      </Box>
    </Box>
  );
};

const TwoColumnLayout = () => {
  const [showAll, setShowAll] = useState(false);
  const { user = {} } = useSelector((state) => state.user);
  const [CurrentMedias, setCurrentMedias] = useState({});
  const [Downloading, setDownloading] = useState(false);
  const [AllMedias, setAllMedias] = useState([]);
  const [searchItems, setSearchItems] = useState('');
  const [filterSearchItems, setFilterSearchItems] = useState([]);
  const [OpenModel, setOpenModel] = useState(false);
  const [Showingloading, setShowingloading] = useState(false);
  const [fetchingMedia, setFetchingMedia] = useState(false);

  const handleDownload = async () => {
    const fileUrl = CurrentMedias?.download_url;
    const fileName = CurrentMedias?.title || 'file';

    if (!fileUrl) {
      toast.error('Please search for a file to download');
      return;
    }
    setDownloading(true);

    try {
      // console.log(fileUrl);

      // First, get the signed URL from your server
      const response = await httpRequest.get(fileUrl);
      const { signedURL } = response.data;

      // Then, use the signed URL to fetch the file data

      // // Create a download link
      const link = document.createElement('a');
      const objectURL = signedURL;
      // link.href = objectURL;
      // link.download = fileName;

      // document.body.appendChild(link);
      // link.click();
      const loadimage = await fetch(objectURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      const data = await loadimage.blob();

      const url = URL.createObjectURL(data);

      link.href = url;
      link.download = fileName;
      link.click();

      // Clean up the object URL

      setDownloading(false);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const getAllMedias = async () => {
      setFetchingMedia(true);
      const response = await httpRequest.get(GET_MEMBER_USER_MEDIAS);
      const files = response.data;
      if (response.status === 200) {
        setAllMedias(files);
        setFetchingMedia(false);
      }
    };

    getAllMedias();
  }, []);

  const handleSearchMeias = async (val) => {
    setSearchItems(val);
  };

  const handleSearch = () => {
    const trimmedSearch = searchItems?.toLowerCase();
    const filteredMedias = AllMedias?.filter((media) => {
      const trimmedTitle = media?.title?.toLowerCase();
      return trimmedTitle?.includes(trimmedSearch);
    });
    setFilterSearchItems(filteredMedias);

    if (searchItems === '') {
      setFilterSearchItems([]);
    }
  };

  const handleSingleItem = () => {
    setShowingloading(true);
    setCurrentMedias({});
    const trimmedSearch = searchItems?.toLowerCase();

    const filteredMedias = AllMedias?.filter((media) => {
      const trimmedTitle = media?.title?.toLowerCase();

      return trimmedTitle === trimmedSearch;
    });

    setSearchItems('');
    setTimeout(() => {
      if (filteredMedias.length > 0) {
        setShowingloading(false);
        setCurrentMedias(filteredMedias[0]);
      } else {
        toast.error('No result found');
        setShowingloading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchItems]);

  return (
    <Box disableGutters sx={{ pl: { xs: '10px', md: '50px' }, pr: { xs: '10px', md: '50px' } }}>
      {fetchingMedia && (
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              zIndex: 9999,
              backdropFilter: 'blur(14px)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 300,
                  fontSize: '24px',
                  color: 'white',
                  textAlign: 'center',
                  my: '20px',
                }}
              >
                Please hold tight—we&apos;are securely loading your data with end-to-end encryption
                to keep you safe.
              </Typography>
              <CircularProgress size={80} />
            </Box>
          </Box>
        </Box>
      )}
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} lg={9}>
          <Grid>
            <MainLayout
              handleDownload={handleDownload}
              CurrentMedias={CurrentMedias}
              user={user}
              showAll={showAll}
              Downloading={Downloading}
              handleSearchMeias={handleSearchMeias}
              handleSearch={handleSearch}
              filterSearchItems={filterSearchItems}
              searchItems={searchItems}
              setCurrentMedias={setCurrentMedias}
              setOpenModel={setOpenModel}
              OpenModel={OpenModel}
              handleSingleItem={handleSingleItem}
              Showingloading={Showingloading}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <ProfileSection
            AllMedias={AllMedias}
            setCurrentMedias={setCurrentMedias}
            user={user}
            showAll={showAll}
            setShowAll={setShowAll}
            setDownloading={setShowingloading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const SecondaryDashboard = () => <TwoColumnLayout />;

export default SecondaryDashboard;
