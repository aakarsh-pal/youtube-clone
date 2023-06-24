import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import SideBar from './Sidebar';
import Videos from './Videos';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
      <Box
        sx={{
          height: { xs: 'auto', md: '92vh' },
          borderRight: '1px solid #3d3d3d',
          px: { xs: 0, md: 2 },
          backgroundColor: '#000', // Set the background color of the sidebar
        }}
      >
        <SideBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography variant="body2" sx={{ mt: 1.5, color: '#fff' }}>
          Copyright 2022 AP MEDIA
        </Typography>
      </Box>
      <Box
        p={2}
        sx={{
          overflow: 'auto',
          height: '90vh',
          flex: 2,
          backgroundColor: '#000', // Set the background color of the videos section
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: '#fff' }}>
          {selectedCategory} <span style={{ color: '#FC1503' }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
