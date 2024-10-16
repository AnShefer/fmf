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
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.debug(`Fetching data for video ${token}`);
      setLoading(true);
      try {
        const response = await httpRequest.get(`${GET_PUBLIC_TAG_URL}`, {
          headers: {
            Authorization: token,
          },
        });
        if (response?.status === 200 || response?.status === 201) {
          setVideoData(response.data[0]);
          toast.success(response?.data?.message);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
        toast.error(error?.response?.data?.message || 'An error occurred while fetching video data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {};
  }, [token]);
  return (
     <VideoPlayer src={videoData?.file}/>
  );
}