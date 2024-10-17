import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import VideoPlayer from "src/components/video-player/video-player";
import {  GET_PUBLIC_TAG_URL } from "src/constants/apiEndPoints";
import httpRequest from '../axios';

export default function TagVideoRecordsPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams?.get('token');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const payload = {
        videoToken: token,
      };
      try {
        const response = await httpRequest.post(`${GET_PUBLIC_TAG_URL}`, payload, {
          headers: {
            Authorization: token,
          },
        });
        if (response?.status === 200 || response?.status === 201) {
          const videoUrl = response.data[0].file;
          setVideoData(videoUrl);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        toast.error(error?.response?.data?.message || 'An error occurred while fetching video data');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }

    return () => {};
  }, [token]);

  useEffect(() => {
    if (videoData) {
      toast.success('Video data loaded successfully');
    }
  }, [videoData]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : videoData ? (
        <VideoPlayer src={videoData} />
      ) : (
        <p>No video data available</p>
      )}
    </div>
  );
}